# Mockae SDK utility: feature_add
module MockaeUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
