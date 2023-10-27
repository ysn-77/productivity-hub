# frozen_string_literal: true

module Mutations
  class NoteCreate < BaseMutation
    description 'Creates a new note'

    type Types::NoteType, null: false

    argument :name, String
    argument :content, String, required: false

    def resolve(name:, content:)
      authenticate!
      note = ::Note.new(name:, content:, user_id: current_user_id)
      raise GraphQL::ExecutionError.new 'Error creating note', extensions: note.errors.full_messages unless note.save

      note
    end
  end
end
