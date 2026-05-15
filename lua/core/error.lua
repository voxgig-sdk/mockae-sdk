-- Mockae SDK error

local MockaeError = {}
MockaeError.__index = MockaeError


function MockaeError.new(code, msg, ctx)
  local self = setmetatable({}, MockaeError)
  self.is_sdk_error = true
  self.sdk = "Mockae"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MockaeError:error()
  return self.msg
end


function MockaeError:__tostring()
  return self.msg
end


return MockaeError
