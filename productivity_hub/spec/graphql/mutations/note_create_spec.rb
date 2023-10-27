# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::NoteCreate do
  subject do
    ProductivityHubSchema.execute(
      query, context:, variables: {
        name:,
        content:
      }
    )
  end

  let(:query) do
    <<~GQL
      mutation noteCreate($name: String!, $content: String) {
        noteCreate(input: {
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
  let(:name) { 'name' }
  let(:content) { 'content' }

  context 'when values provided are correct' do
    let(:context) { { current_user_id: User.first.id } }
    it 'creates the Note' do
      expect { subject }.to change(Note, :count).by(1)
      expect(subject.dig(*%w[data noteCreate name])).to eq name
      expect(subject.dig(*%w[data noteCreate content])).to eq content
    end
  end

  shared_examples :returns_an_error do
    it 'returns an error' do
      expect(subject.dig(*%w[data noteCreate name])).to be_nil
      expect(subject.dig(*%w[errors])).to be_present
    end
  end

  context 'when User is not logged in' do
    let(:context) { { current_user_id: nil } }
    include_examples :returns_an_error
  end

  context 'when name is not provided' do
    let(:name) { nil }
    include_examples :returns_an_error
  end
end
