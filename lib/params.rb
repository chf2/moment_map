require 'uri'

class Params
  def initialize(req, route_params = {})
    to_parse = req.query_string.to_s + req.body.to_s
    @params = route_params.merge(parse_www_encoded_form(to_parse))
  end

  def [](key)
    @params[key.to_s]    
  end

  def to_s
    @params.to_json.to_s
  end

  class AttributeNotFoundError < ArgumentError; end;

  private
  def parse_www_encoded_form(www_encoded_form)
    return {} if www_encoded_form.nil?

    params = {}
    kv_pairs = URI::decode_www_form(www_encoded_form)
    kv_pairs.map! { |key, val| [parse_key(key), val] }

    kv_pairs.each do |keys, val| 
      last_hash = params
      keys.each do |key|
        if key.equal?(keys.last)
          last_hash[key] = val
        else
          last_hash[key] ||= {}
          last_hash = last_hash[key]
        end
      end
    end

    params
  end

  def parse_key(key)
    key.split(/\]\[|\[|\]/)
  end
end