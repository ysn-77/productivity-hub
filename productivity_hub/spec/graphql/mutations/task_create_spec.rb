# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::TaskCreate do
  subject do
    ProductivityHubSchema.execute(
      query, context:, variables: {
        name:,
        description:,
        dueDate:
      }
    )
  end

  let :query do
    <<~GQL
      mutation taskCreate($name: String!, $description: String, $dueDate: ISO8601Date) {
        taskCreate(input: {
          name: $name
          description: $description
          dueDate: $dueDate
        }) {
          id
          name
          description
          dueDate
        }
      }
    GQL
  end

  let(:context) { { current_user_id: nil } }
  let(:name) { 'name' }
  let(:dueDate) { '2023-11-22' }
  let(:description) { 'description' }

  context 'when values provided are correct' do
    let(:context) { { current_user_id: User.first.id } }
    it 'creates the task' do
      expect { subject }.to change(Task, :count).by(1)
      expect(subject.dig(*%w[data taskCreate name])).to eq name
      expect(subject.dig(*%w[data taskCreate description])).to eq description
      expect(subject.dig(*%w[data taskCreate dueDate])).to eq dueDate
    end
  end

  shared_examples :returns_an_error do
    it 'returns an error' do
      expect(subject.dig(*%w[data taskCreate name])).to be_nil
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

  context 'when date format is invalid' do
    let(:dueDate) { '12-12-1999' }
    include_examples :returns_an_error
  end
end
