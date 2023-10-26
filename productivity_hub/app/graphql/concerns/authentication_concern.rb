module AuthenticationConcern
  extend ActiveSupport::Concern

  included do
    private

    def current_user_id
      context[:current_user_id]
    end

    def authenticate!
      if current_user_id.blank?
        raise GraphQL::ExecutionError, "Authentication failed"
      end
    end
  end
end
