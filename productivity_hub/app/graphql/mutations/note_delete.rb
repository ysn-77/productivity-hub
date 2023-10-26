# frozen_string_literal: true

module Mutations
  class NoteDelete < BaseMutation
    description "Deletes a note by ID"

    type Types::NoteType, null: false

    argument :id, ID

    def resolve(id:)
      authenticate!
      note = ::Note.find(id)
      unless current_user_id.to_i == note.user_id
        raise GraphQL::ExecutionError.new "Unauthorized"
      end
      unless note.destroy!
        raise GraphQL::ExecutionError.new "Error deleting note", extensions: note.errors.full_messages
      end
      note
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError.new 'Record not found'
    end
  end
end
