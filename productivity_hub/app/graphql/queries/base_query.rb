module Queries
  class BaseQuery < GraphQL::Schema::Resolver
    include AuthenticationConcern
  end
end