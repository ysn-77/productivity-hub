# frozen_string_literal: true

class Note < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
end
