class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true

  has_many :tasks
  has_many :notes
end
