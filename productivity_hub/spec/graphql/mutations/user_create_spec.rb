# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UserCreate do
  subject do
    ProductivityHubSchema.execute(
      query, variables: {
        username:,
        password:
      }
    )
  end

  let :query do
    <<~GQL
      mutation UserCreate($username: String!, $password: String!) {
        userCreate(input: { username: $username, password: $password }) {
          id
          username
        }
      }
    GQL
  end

  let(:password) { 'password' }

  context 'when username and password are correct' do
    let(:username) { 'new_username' }
    it 'creates the user' do
      expect { subject }.to change(User, :count).by(1)
      expect(subject.dig(*%w[data userCreate username])).to eq username
    end
  end

  context 'when username is taken' do
    let(:username) { 'one' }
    it 'returns an error' do
      expect(subject.dig(*%w[data userCreate username])).to be_nil
      expect(subject.dig(*%w[errors])).to be_present
    end
  end
end
