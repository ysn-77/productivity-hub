require 'rails_helper'

RSpec.describe Queries::Notes do

  subject do
    ProductivityHubSchema.execute(query, context: context)
  end

  let :query do
    <<~GQL
      query {
        notes {
          id
          name
        }
      }
    GQL
  end

  let(:user) { User.first }

  context 'when user is logged in' do
    let(:context) { { current_user_id: user.id } }

    it "lists their notes" do
      expect(subject.dig(*%w'data notes').count).to eq user.notes.count
    end
  end

  context 'when user is not logged in' do
    let(:context) { { current_user_id: nil } }

    it "returns an error" do
      expect(subject.dig(*%w'data')).to be_blank
      expect(subject.dig(*%w'errors')).to be_present
    end
  end

end
