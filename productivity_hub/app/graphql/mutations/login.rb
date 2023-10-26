# frozen_string_literal: true

module Mutations
  class Login < BaseMutation
    description "Logs the user in"

    type Types::UserType, null: false

    argument :username, String
    argument :password, String

    def resolve(username:, password:)
      user = User.find_by(username: username)
      unless user&.authenticate(password)
        raise GraphQL::ExecutionError.new("Invalid username or password")
      end
      user
    end
  end
end
