require_relative '../../../lib/controller/controller_base'
require_relative '../../models/moment'

class MomentsController < ControllerBase
  def index
    @moments = Moment.filtered(params['filters'])
    render json: @moments
  end

  def create
    @moment = Moment.new(params['moment'])
    @moment.created_at = Time.now.to_date
    @moment.save
    render json: @moment
  end

  private

  def params
    # Params are fetched from the Rack::Request object
    req.params
  end
end