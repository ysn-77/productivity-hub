# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Login do
  subject do
    ProductivityHubSchema.execute(query, variables: {
                                    username:,
                                    password:
                                  })
  end

  let :query do
    <<~GQL
      mutation Login($username: String!, $password: String!) {
        login(input: { username: $username, password: $password }) {
          id
          username
        }
      }
    GQL
  end

  let(:username) { 'one' }

  context 'when username and password are correct' do
    let(:password) { 'one' }
    it 'authenticates the user' do
      expect(subject.dig(*%w[data login username])).to eq 'one'
    end
  end

  context 'when username and password are incorrect' do
    let(:password) { 'wrong' }
    it 'returns an error' do
      expect(subject.dig(*%w[data login username])).to be_nil
      expect(subject.dig(*%w[errors])).to be_present
    end
  end
end
