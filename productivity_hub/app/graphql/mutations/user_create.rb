# frozen_string_literal: true

module Mutations
  class UserCreate < BaseMutation
    description 'Creates a new task'

    type Types::UserType, null: false

    argument :username, String, required: true
    argument :password, String, required: true

    def resolve(username:, password:)
      user = ::User.new(username:, password:)
      raise GraphQL::ExecutionError.new 'Error creating user', extensions: user.errors.full_messages unless user.save

      user
    end
  end
end
