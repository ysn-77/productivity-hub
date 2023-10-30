# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::NoteDelete do
  subject do
    ProductivityHubSchema.execute(
      query, context:, variables: {
        id: note_id
      }
    )
  end

  let(:query) do
    <<~GQL
      mutation noteDelete($id: ID!) {
        noteDelete(input: {
          id: $id
        }) {
          id
        }
      }
    GQL
  end

  let(:context) { { current_user_id: User.first.id } }
  let(:note_id) { Note.first.id }

  shared_examples 'returns an error' do
    it 'returns an error' do
      expect(subject.dig(*%w[data noteDelete id])).to be_nil
      expect(subject.dig(*%w[errors])).to be_present
    end
  end

  context 'when User is not logged in' do
    let(:context) { { current_user_id: nil } }

    include_examples 'returns an error'
  end

  context 'when note does not exist' do
    let(:note_id) { -1 }

    include_examples 'returns an error'
  end

  context 'when note is present but does not belong to user' do
    let(:note_id) { User.second.notes.first.id }

    include_examples 'returns an error'
  end

  context 'when note is present and belongs to user' do
    it 'deletes the Note' do
      expect { subject }.to change(Note, :count).by(-1)
      expect(subject.dig(*%w[data noteDelete id])).to eq note_id.to_s
      expect(subject.dig(*%w[errors])).to be_blank
    end
  end
end
