require_relative '../app/controllers/api/moments_controller'
require_relative '../app/controllers/static_pages_controller'
require_relative '../lib/router/router'

class AllRoutes
  def self.run(router)
    router.draw do
      get gen_rgx(""), StaticPagesController, :root
      get gen_rgx("about"), StaticPagesController, :about
      get gen_rgx("api/moments"), MomentsController, :index
      post gen_rgx("api/moments"), MomentsController, :create
    end
  end
end