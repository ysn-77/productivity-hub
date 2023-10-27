# frozen_string_literal: true

module Mutations
  class Login < BaseMutation
    description 'Logs the user in'

    type Types::UserType, null: false

    argument :username, String
    argument :password, String

    def resolve(username:, password:)
      user = User.find_by(username:)
      raise GraphQL::ExecutionError, 'Invalid username or password' unless user&.authenticate(password)

      user
    end
  end
end
