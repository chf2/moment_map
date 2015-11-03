require 'json'
require 'webrick'

class Session
  # Find the cookie for this app's session and convert to Ruby hash
  def initialize(req)
    @data = {}
    req.cookies.each do |name, value|
      if name == '_chf-rack_app_session'
        @data.merge(JSON.parse(value))
      end
    end
    @data["authenticity_token"] = SecureRandom.urlsafe_base64
  end

  def [](key)
    @data[key]
  end

  def []=(key, val)
    @data[key] = val
  end

  def store_session(res)
    res.set_cookie('_chf-rack_app_session', @data.to_json)
  end
end