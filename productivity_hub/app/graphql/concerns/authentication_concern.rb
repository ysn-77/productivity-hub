# frozen_string_literal: true

module AuthenticationConcern
  extend ActiveSupport::Concern

  included do
    private

    def current_user_id
      context[:current_user_id]
    end

    def authenticate!
      return if current_user_id.present?

      raise GraphQL::ExecutionError, 'Authentication failed'
    end
  end
end
