module Queries
  class Tasks < Queries::BaseQuery
    description 'List all Tasks for user'

    type [Types::TaskType], null: false

    def resolve
      authenticate!
      ::Task.where(user_id: current_user_id)
    end
  end
end