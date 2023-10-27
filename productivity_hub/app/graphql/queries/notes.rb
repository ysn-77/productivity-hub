# frozen_string_literal: true

module Queries
  class Notes < Queries::BaseQuery
    description 'List all Notes for user'

    type [Types::NoteType], null: false

    def resolve
      authenticate!
      ::Note.where(user_id: current_user_id)
    end
  end
end
