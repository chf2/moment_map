require 'pg'

class DBConnection < PG::Connection
  def initialize
    super(
      dbname: "moment_map_development",
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
