require_relative '../../lib/model_base.rb'


class Moment < ModelBase
  EMOTIONS = ['Happy', 'Sad', 'Angry', 'Tired', 'Content', 'Hungry', 'Scared']

  def self.filtered(filters)
    bounds = filters['bounds']
    west, south = bounds['southWest']['lng'], bounds['southWest']['lat']
    east, north = bounds['northEast']['lng'], bounds['northEast']['lat']

    Moment
      .where("lng BETWEEN ? AND ?", west, east)
      .where("lat BETWEEN ? AND ?", south, north)
      .fire_query
  end

  self.finalize!
  # ModelBase::finalize! writes all attr_reader and attr_accessors
end