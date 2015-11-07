require_relative '../db/db_connection'
require_relative './associatable'
require_relative './searchable'
require 'active_support/inflector'
require 'byebug'

DB = DBConnection.new

class ModelBase
  extend Associatable
  extend Searchable
  def self.columns
    return @columns if @columns
    data = DB.execute(<<-SQL)
      SELECT
        *
      FROM
        #{table_name}
      LIMIT
        0
    SQL

    @columns = data.fields.map(&:to_sym)
  end

  def self.finalize!
    columns.each do |column|
      define_method(column) do
        attributes[column]
      end

      define_method("#{column}=") do |val|
        attributes[column] = val
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name ||= self.to_s.tableize
  end

  def self.all
    results = DB.execute(<<-SQL)
      SELECT 
        *
      FROM
        #{table_name}
    SQL
    parse_all(results)
  end

  def self.parse_all(results)
    results.map { |result| self.new(result) }
  end

  def self.find(id)
    data = DB.execute(<<-SQL, id)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        id = :id
      LIMIT 1
    SQL

    data.empty? ? nil : self.new(data[0])
  end

  def initialize(params = {})
    params.each do |attr_name, value|
      unless self.class.columns.include?(attr_name.to_sym)
        raise ArgumentError.new "unknown attribute '#{attr_name}'"
      end
      self.send("#{attr_name}=", value)
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map { |col| attributes[col] }
  end

  def insert
    cols = self.class.columns
    raise "No columns to insert into" if cols.length < 2
    col_names = cols.drop(1).join(", ")
    val_string = (1...cols.length).map { |num| "$#{num}" }.join(", ")
    debugger
    data = DB.execute_params(<<-SQL, attribute_values.drop(1))
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{val_string})
      RETURNING id
    SQL

    self.id = data[0]['id'].to_i
  end

  def update
    set_str = self.class.columns.map do |col|
      "#{col} = ?"
    end.join(", ")
    
    DB.execute_params(<<-SQL, attribute_values)
      UPDATE
        #{self.class.table_name}
      SET
        #{set_str}
      WHERE
        id = #{self.id}
    SQL
  end

  def save
    id.nil? ? insert : update
  end
end
