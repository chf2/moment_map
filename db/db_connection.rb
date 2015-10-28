require 'pg'
require 'byebug'

class DBConnection < PG::Connection
  def initialize
    debugger
    super(
      dbname: "mini_rails_demo",
      port: 5432
    )
  end

  def execute(*args)
    exec(*args)
  end

  def execute_params(*args)
    exec_params(*args)
  end
end
