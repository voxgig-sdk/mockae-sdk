# Mockae SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MockaeFeatures
  def self.make_feature(name)
    case name
    when "base"
      MockaeBaseFeature.new
    when "ratelimit"
      MockaeRatelimitFeature.new
    when "retry"
      MockaeRetryFeature.new
    when "test"
      MockaeTestFeature.new
    when "timeout"
      MockaeTimeoutFeature.new
    else
      MockaeBaseFeature.new
    end
  end
end
