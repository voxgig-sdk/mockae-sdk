-- ProjectName SDK exists test

local sdk = require("mockae_sdk")

describe("MockaeSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
