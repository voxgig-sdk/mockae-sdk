# Mockae SDK utility: make_context
require_relative '../core/context'
module MockaeUtilities
  MakeContext = ->(ctxmap, basectx) {
    MockaeContext.new(ctxmap, basectx)
  }
end
