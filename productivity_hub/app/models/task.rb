# frozen_string_literal: true

class Task < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
end
