# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::TaskDelete do
  subject do
    ProductivityHubSchema.execute(
      query, context:, variables: {
        id: task_id
      }
    )
  end

  let(:query) do
    <<~GQL
      mutation taskDelete($id: ID!) {
        taskDelete(input: {
          id: $id
        }) {
          id
        }
      }
    GQL
  end

  let(:context) { { current_user_id: User.first.id } }
  let(:task_id) { Task.first.id }

  shared_examples 'returns an error' do
    it 'returns an error' do
      expect(subject.dig(*%w[data taskDelete id])).to be_nil
      expect(subject.dig(*%w[errors])).to be_present
    end
  end

  context 'when User is not logged in' do
    let(:context) { { current_user_id: nil } }

    include_examples 'returns an error'
  end

  context 'when task does not exist' do
    let(:task_id) { -1 }

    include_examples 'returns an error'
  end

  context 'when task is present but does not belong to user' do
    let(:task_id) { User.second.tasks.first.id }

    include_examples 'returns an error'
  end

  context 'when task is present and belongs to user' do
    it 'deletes the Task' do
      expect { subject }.to change(Task, :count).by(-1)
      expect(subject.dig(*%w[data taskDelete id])).to eq task_id.to_s
      expect(subject.dig(*%w[errors])).to be_blank
    end
  end
end
