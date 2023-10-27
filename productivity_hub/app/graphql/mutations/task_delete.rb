# frozen_string_literal: true

module Mutations
  class TaskDelete < BaseMutation
    description 'Deletes a task by ID'

    type Types::TaskType, null: false

    argument :id, ID

    def resolve(id:)
      authenticate!
      task = ::Task.find(id)
      raise GraphQL::ExecutionError, 'Unauthorized' unless current_user_id.to_i == task.user_id
      unless task.destroy!
        raise GraphQL::ExecutionError.new 'Error deleting task', extensions: task.errors.full_messages
      end

      task
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, 'Record not found'
    end
  end
end
