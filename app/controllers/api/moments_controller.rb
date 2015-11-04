require_relative '../../../lib/controller_base'
require_relative '../../models/moment'

class MomentsController < ControllerBase
  def index
    @moments = Moment.all
    render json: @moments
  end

  def create
    @moment.save
    render json: @moment
  end

  def show
    @moment = Moment.find(params['id'])
  end
end