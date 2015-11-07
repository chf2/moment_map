require_relative('./route_helper')

class Route
  attr_reader :pattern, :http_method, :controller_class, :action_name

  def initialize(pattern, http_method, controller_class, action_name)
    @pattern, @http_method = pattern, http_method
    @controller_class, @action_name = controller_class, action_name
  end

  # Checks if pattern matches path and method matches request method
  def matches?(req)
    pattern =~ req.path &&
      http_method == req.request_method.downcase.to_sym
  end

  # Instantiate controller and call action
  def run(req, res)
    @controller_class.new(req, res).invoke_action(action_name)
  end
end

class Router
  include RouteHelper
  attr_reader :routes

  def initialize
    @routes = []
  end

  # Adds a new route to the list of routes. Routes sourced from config/routes.rb
  def add_route(pattern, method, controller_class, action_name)
    @routes << Route.new(pattern, method, controller_class, action_name)
  end

  def get(pattern, controller_class, action_name)
    add_route(pattern, :get, controller_class, action_name)
  end

  # Evaluate the proc in the context of the instance. Used to draw routes
  def draw(&proc)
    instance_eval(&proc)
  end

  def gen_rgx(regexp)
    Regexp.new("^/#{regexp}$")
  end

  # Create methods for route creation -- also create route helper methods on call
  [:get, :post, :put, :delete].each do |http_method|
    define_method(http_method) do |pattern, controller_class, action_name|
      add_route(pattern, http_method, controller_class, action_name)
      # Create path helper method. Generally not used for API resources
      matcher = Regexp.new("^(?<class>.+)Controller$")
      class_name = matcher.match(controller_class.to_s)['class'].downcase
      RouteHelper.create_helper(action_name, class_name)
    end
  end

  def match(req)
    @routes.find { |route| route.matches?(req) }
  end

  def run(req, res)
    route = match(req)
    if route
      route.run(req, res)
    else
      res.status = 404
    end
  end
end
