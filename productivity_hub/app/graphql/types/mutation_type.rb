# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :note_create, mutation: Mutations::NoteCreate
    field :note_update, mutation: Mutations::NoteUpdate
    field :note_delete, mutation: Mutations::NoteDelete

    field :task_create, mutation: Mutations::TaskCreate
    field :task_update, mutation: Mutations::TaskUpdate
    field :task_delete, mutation: Mutations::TaskDelete

    field :user_create, mutation: Mutations::UserCreate
    field :login, mutation: Mutations::Login
  end
end
