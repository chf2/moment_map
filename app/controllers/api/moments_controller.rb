require_relative '../../../lib/controller_base'
require_relative '../../models/moment'

class Api::MomentsController < ControllerBase
  def index
    @moments = Moment.all
    # render json: @moments
  end

  def create
    
    if @moment.save
      render json: @moment
    else
      
    end
  end

  def show
    @moment = Moment.find(params['id'])
  end

end