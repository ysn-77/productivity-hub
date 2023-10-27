# frozen_string_literal: true

module Mutations
  class TaskUpdate < BaseMutation
    description 'Updates a task by id'

    type Types::TaskType, null: false

    argument :id, ID
    argument :name, String, required: false
    argument :description, String, required: false
    argument :due_date, GraphQL::Types::ISO8601Date, required: false

    def resolve(id:, **args)
      authenticate!
      task = ::Task.find(id)
      raise GraphQL::ExecutionError, 'Unauthorized' unless current_user_id.to_i == task.user_id
      unless task.update(**args)
        raise GraphQL::ExecutionError.new 'Error updating task', extensions: task.errors.full_messages
      end

      task
    rescue ActiveRecord::RecordNotFound
      raise GraphQL::ExecutionError, 'Record not found'
    end
  end
end
