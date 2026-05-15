# Mockae SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MockaeFeatures
  def self.make_feature(name)
    case name
    when "base"
      MockaeBaseFeature.new
    when "test"
      MockaeTestFeature.new
    else
      MockaeBaseFeature.new
    end
  end
end
