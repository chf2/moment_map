require_relative '../db/db_connection'
require 'active_support/inflector'

module Searchable
  def where(query_params, *values)
    # Query params can either be passed as a hash or as a SQL string
    if query_params.is_a? Hash
      params = query_params
    else
      # If a SQL string, set as key and set passed values as value
      params = { query_params => values }
    end

    # Make `where` chainable by merging params if already a relation object
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

  def fire_query
    get_search_results
  end

  def get_search_results
    query_string = params.keys.map do |param|
      param.is_a?(Symbol) ? param.to_s + ' = ?' : param
    end.join(" AND ")
    query_values = params.values.flatten

    values_subbed = 0
    while values_subbed < query_values.length
      query_string.sub!("?", "$#{values_subbed + 1}")
      values_subbed += 1
    end

    results = DB.execute_params(<<-SQL, query_values)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        #{query_string}
    SQL

    klass.parse_all(results)
  end
end