require 'rack'
require_relative 'config/routes'

use Rack::Static, :urls => ["/public"]

class Application
  attr_reader :router

  def initialize
    @router = Router.new
    # Routes are drawn in config/routes.rb
    AllRoutes.run(router)
  end
  
  def call(env)
    req = Rack::Request.new(env)
    res = Rack::Response.new
    route = router.run(req, res)
    res.finish
  end
end

run Application.new