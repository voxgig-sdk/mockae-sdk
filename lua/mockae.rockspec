package = "voxgig-sdk-mockae"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/mockae-sdk.git"
}
description = {
  summary = "Mockae SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["mockae_sdk"] = "mockae_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
