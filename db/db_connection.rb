require 'pg'

class DBConnection < PG::Connection
  def initialize
    super(
      host: ENV['HEROKU_DB_HOST'],
      dbname: ENV['HEROKU_DB_NAME'],
      port: 5432,
      user: ENV['HEROKU_DB_USER'],
      password: ENV['HEROKU_DB_PASSWORD']
    )
  end

  def execute(*args)
    exec(*args)
  end

  def execute_params(*args)
    exec_params(*args)
  end
end
