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

  # Use pattern to pull out route params, instantiate controller and call action
  def run(req, res)
    match_data = pattern.match(req.path)
    route_params = {}
    match_data.names.each do |name|
      route_params[name] = match_data[name]
    end
    @controller_class.new(req, res, route_params).invoke_action(action_name)
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

  # evaluate the proc in the context of the instance
  # for syntactic sugar :)
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
      # Create path helper method
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
