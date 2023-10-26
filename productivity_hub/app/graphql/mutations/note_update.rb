# frozen_string_literal: true

module Mutations
  class NoteUpdate < BaseMutation
    description "Updates a note by id"

    type Types::NoteType, null: false

    argument :id, ID
    argument :name, String, required: false
    argument :content, String, required: false

    def resolve(id:, **args)
      authenticate!
      note = ::Note.find(id)
      unless current_user_id.to_i == note.user_id
        raise GraphQL::ExecutionError.new "Unauthorized"
      end
      unless note.update(**args)
        raise GraphQL::ExecutionError.new "Error updating note", extensions: note.errors.full_messages
      end
      note
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError.new 'Record not found'
    end
  end
end
