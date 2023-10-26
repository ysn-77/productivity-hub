# frozen_string_literal: true

module Mutations
  class TaskDelete < BaseMutation
    description "Deletes a task by ID"

    type Types::TaskType, null: false

    argument :id, ID

    def resolve(id:)
      authenticate!
      task = ::Task.find(id)
      unless current_user_id.to_i == task.user_id
        raise GraphQL::ExecutionError.new "Unauthorized"
      end
      unless task.destroy!
        raise GraphQL::ExecutionError.new "Error deleting task", extensions: task.errors.full_messages
      end
      task
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError.new 'Record not found'
    end
  end
end
