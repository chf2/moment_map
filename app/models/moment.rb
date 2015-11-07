require_relative '../../lib/model_base.rb'

class Moment < ModelBase
  self.finalize!
  # ModelBase::finalize! writes all attr_reader and attr_accessors
end