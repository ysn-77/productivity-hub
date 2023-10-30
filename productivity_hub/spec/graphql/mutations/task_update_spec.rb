# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::TaskUpdate do
  subject do
    ProductivityHubSchema.execute(
      query,
      context:,
      variables: {
        id: task_id,
        name:,
        description:,
        dueDate:
      }
    )
  end

  let(:query) do
    <<~GQL
      mutation taskUpdate($id: ID!, $name: String!, $description: String, $dueDate: ISO8601Date) {
        taskUpdate(input: {
          id: $id
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

  let(:context) { { current_user_id: User.first.id } }
  let(:task_id) { Task.first.id }
  let(:name) { 'new name' }
  let(:description) { 'new description' }
  let(:dueDate) { '2023-12-22' }

  context 'when values provided are correct' do
    it 'updates the Task' do
      expect { subject }.to change(Task, :count).by(0)
      expect(subject.dig(*%w[data taskUpdate name])).to eq name
      expect(subject.dig(*%w[data taskUpdate description])).to eq description
      expect(subject.dig(*%w[data taskUpdate dueDate])).to eq dueDate
    end
  end

  shared_examples :returns_an_error do
    it 'returns an error' do
      expect(subject.dig(*%w[data taskUpdate name])).to be_nil
      expect(subject.dig(*%w[errors])).to be_present
    end
  end

  context 'when task is present but does not belong to user' do
    let(:task_id) { User.second.tasks.first.id }
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

  context 'when task does not exist' do
    let(:task_id) { -1 }
    include_examples :returns_an_error
  end
end
