# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::NoteUpdate do
  subject do
    ProductivityHubSchema.execute(
      query,
      context:,
      variables: {
        id: note_id,
        name:,
        content:
      }
    )
  end

  let(:query) do
    <<~GQL
      mutation noteUpdate($id: ID!, $name: String!, $content: String) {
        noteUpdate(input: {
          id: $id
          name: $name
          content: $content
        }) {
          id
          name
          content
        }
      }
    GQL
  end

  let(:context) { { current_user_id: User.first.id } }
  let(:note_id) { Note.first.id }
  let(:name) { 'new name' }
  let(:content) { 'new content' }

  context 'when values provided are correct' do
    it 'updates the Note' do
      expect { subject }.to change(Note, :count).by(0)
      expect(subject.dig(*%w[data noteUpdate name])).to eq name
      expect(subject.dig(*%w[data noteUpdate content])).to eq content
    end
  end

  shared_examples :returns_an_error do
    it 'returns an error' do
      expect(subject.dig(*%w[data noteUpdate name])).to be_nil
      expect(subject.dig(*%w[errors])).to be_present
    end
  end

  context 'when note is present but does not belong to user' do
    let(:note_id) { User.second.notes.first.id }
    include_examples :returns_an_error
  end

  context 'when User is not logged in' do
    let(:context) { { current_user_id: nil } }
    include_examples :returns_an_error
  end

  context 'when name is being removed' do
    let(:name) { nil }
    include_examples :returns_an_error
  end

  context 'when note does not exist' do
    let(:note_id) { -1 }
    include_examples :returns_an_error
  end
end
