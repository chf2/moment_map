require_relative '../lib/controller_base'
require_relative '../app/controllers/cats_controller'
require_relative '../lib/router'

class AllRoutes
  def initialize
    @collection = []
  end

  def run(router)
    router.draw do
      get gen_rgx("^$"), StaticPagesController, :root
      get gen_rgx("about"), StaticPagesController, :about
    end
  end

end