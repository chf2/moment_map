require_relative '../../../lib/controller_base'
require_relative '../../models/moment'
require_relative '../../helpers/datetime_helper'

class MomentsController < ControllerBase
  def index
    @moments = Moment.all
    render json: @moments
  end

  def create
    @moment = Moment.new(req.params['moment'])
    @moment.created_at = Time.now.to_datetime
    @moment.save
    render json: @moment
  end

  def show
    @moment = Moment.find(req.params['id'])
    render json: @moment
  end
end