# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::Tasks do
  subject do
    ProductivityHubSchema.execute(query, context:)
  end

  let :query do
    <<~GQL
      query {
        tasks {
          id
          name
        }
      }
    GQL
  end

  let(:user) { User.first }

  context 'when user is logged in' do
    let(:context) { { current_user_id: user.id } }

    it 'lists their tasks' do
      expect(subject.dig(*%w[data tasks]).count).to eq user.tasks.count
    end
  end

  context 'when user is not logged in' do
    let(:context) { { current_user_id: nil } }

    it 'returns an error' do
      expect(subject.dig(*%w[data])).to be_blank
      expect(subject.dig(*%w[errors])).to be_present
    end
  end
end
