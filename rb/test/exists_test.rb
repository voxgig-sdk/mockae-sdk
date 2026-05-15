# Mockae SDK exists test

require "minitest/autorun"
require_relative "../Mockae_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MockaeSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
