require 'json'
require 'webrick'

class Flash
  attr_reader :contents

  def initialize(req)
    @contents = {}
    req.cookies.each do |name, value|
      if name == '_chf-go_app_flash'
        @contents.merge(JSON.parse(value))
      end
    end
    @stored_contents = {}
  end

  def [](key)
    @contents[key]
  end

  def []=(key, value)
    @stored_contents[key] = value
  end

  def each(&prc)
    @contents.each(&prc)
  end

  def empty?
    @contents.empty?
  end

  def method_missing(method)
    if Hash.respond_to?(method)
      @contents.send(method)
    else
      raise NoMethodError
    end
  end

  def now
    @contents
  end

  def store_flash(res)
    res.set_cookie('_chf-go_app_flash', @stored_contents.to_json)
  end
end