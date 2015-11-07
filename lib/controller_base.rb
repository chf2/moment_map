require_relative 'require_all'
require 'json'

class ControllerBase
  include RouteHelper
  include ViewHelper
  attr_reader :res, :req

  def initialize(req, res)
    @req, @res = req, res
    @already_built_response = false
  end

  def already_built_response?
     @already_built_response
  end

  def button_to(text, url, options = {})
    html = "<form action='#{url}' method='POST'>"
    if options[:method]
      html += "<input type='hidden' name='_method' value='#{options[:method]}'>"
    end
    html += "<button type='submit'>#{text}</button>"
    html += "</form>"
    html
  end

  def invoke_action(name)
    send(name)
    unless already_built_response?
      render(name)
    end
  end

  def link_to(text, url)
    "<a href='#{url}'>#{text}</a>"
  end

  def redirect_to(url)
    raise "page already rendered" if already_built_response?
    res['location'] = url.to_s
    res['status'] = 302
    @already_built_response = true
    
    session.store_session(res)
    flash.store_flash(res)

    nil
  end

  def render(data)
    # Currently JSON is the only non-HTML datatype supported
    if data.is_a? Hash
      if data[:json].respond_to?(:map)
        render_content(data[:json].map(&:attributes).to_json, 'application/json')
      else
        render_content(data[:json].attributes.to_json, 'application/json')
      end
    else
      template_name = data
      view_directory = self.class.to_s.underscore[0..-12]
      erb_template = File.read(
        "app/views/#{view_directory}/#{template_name}.html.erb"
      )
      controller_binding = Kernel.binding
      rendered_html = ERB.new(erb_template).result(controller_binding)
      render_content(rendered_html, 'text/html')
    end
  end

  def render_content(content, content_type)
    raise "page already rendered" if already_built_response?
    res.body = [content]
    res['content_type'] = content_type
    @already_built_response = true
    session.store_session(res)
    flash.store_flash(res)
  end

  def session
    @session ||= Session.new(req)
  end

  def flash
    @flash ||= Flash.new(req)
  end
end