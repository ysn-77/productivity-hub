# frozen_string_literal: true

module Mutations
  class NoteCreate < BaseMutation
    description 'Creates a new note'

    type Types::NoteType, null: false

    argument :name, String
    argument :content, String, required: false

    def resolve(**args)
      authenticate!
      note = ::Note.new(user_id: current_user_id, **args)
      raise GraphQL::ExecutionError.new 'Error creating note', extensions: note.errors.full_messages unless note.save

      note
    end
  end
end
