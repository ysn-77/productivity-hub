# frozen_string_literal: true

module Mutations
  class TaskCreate < BaseMutation
    description "Creates a new task"

    type Types::TaskType, null: false

    argument :name, String
    argument :description, String, required: false
    argument :due_date, GraphQL::Types::ISO8601Date, required: false

    def resolve(**args)
      authenticate!
      task = ::Task.new(user_id: current_user_id, **args)
      unless task.save
        raise GraphQL::ExecutionError.new "Error creating task", extensions: task.errors.full_messages
      end
      task
    end
  end
end
