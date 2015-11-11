require_relative '../../lib/model/model_base'


class Moment < ModelBase
  EMOTIONS = ['Happy', 'Sad', 'Angry', 'Content', 'Excited', 'Afraid']

  def self.filtered(filters)
    bounds = filters['bounds']
    emotion = filters['emotion']
    west, south = bounds['southWest']['lng'], bounds['southWest']['lat']
    east, north = bounds['northEast']['lng'], bounds['northEast']['lat']

    moments = Moment
                .where("lng BETWEEN ? AND ?", west, east)
                .where("lat BETWEEN ? AND ?", south, north)
    if emotion == 'All'
      moments.fire_query
    else
      moments.where({ emotion: emotion }).fire_query
    end
  end

  self.finalize!
  # ModelBase::finalize! writes all attr_reader and attr_accessors
end