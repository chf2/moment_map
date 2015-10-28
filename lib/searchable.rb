require_relative '../db/db_connection'
require 'active_support/inflector'

module Searchable
  def where(params)
    if self.class == Relation
      Relation.new(@klass, table_name, @params.merge(params))
    else
      Relation.new(self, table_name, params)
    end
  end
end

class Relation
  include Searchable
  
  attr_reader :klass, :table_name, :params
  def initialize(klass, table_name, params = {})
    @klass, @table_name, @params = klass, table_name, params
  end

  def method_missing(name, *args)
    if Array.method_defined?(name)
      collection.concat(get_search_results) if @collection.nil?
      collection.send("#{name}", *args)
    else
      raise NoNameError "Method not found!"
    end
  end

  def ==(other)
    if other.is_a? Array
      @collection == other
    end
  end

  def collection
    @collection ||= []
  end

  def fire
    collection = get_search_results
    self
  end

  def get_search_results
    where_str = params.keys.map(&:to_s).join(" = ? AND ") + " = ?"
    where_str = "1 = 1" if params.empty?
    results = DB.execute(<<-SQL, *params.values)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        #{where_str}
    SQL
    klass.parse_all(results)
  end
end