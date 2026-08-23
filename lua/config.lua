-- Mockae SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Mockae",
      slug = "mockae",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.mockae.com/fakeapi",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["cart"] = {},
        ["coupon"] = {},
        ["product"] = {},
        ["status"] = {},
        ["user"] = {},
      },
    },
    entity = {
      ["cart"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "Cart ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "items",
            ["short"] = "Items in the cart",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "total",
            ["short"] = "Total cart value",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "userId",
            ["short"] = "User ID who owns the cart",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "cart",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/carts",
                ["parts"] = {
                  "carts",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/carts/{id}",
                ["parts"] = {
                  "carts",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["coupon"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["short"] = "Coupon code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "discount",
            ["short"] = "Discount percentage or amount",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "expiryDate",
            ["short"] = "Coupon expiry date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Coupon ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "type",
            ["short"] = "Type of discount (percentage or fixed)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "coupon",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/coupons",
                ["parts"] = {
                  "coupons",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/coupons/{id}",
                ["parts"] = {
                  "coupons",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["product"] = {
        ["fields"] = {
          {
            ["name"] = "category",
            ["short"] = "Product category",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Product description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Product ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Product name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "price",
            ["short"] = "Product price",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "product",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/products",
                ["parts"] = {
                  "products",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/products/{id}",
                ["parts"] = {
                  "products",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["status"] = {
        ["fields"] = {},
        ["name"] = "status",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 403,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "status_code",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/status/{statusCode}",
                ["parts"] = {
                  "status",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["statusCode"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["short"] = "User email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "firstName",
            ["short"] = "User's first name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "User ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "lastName",
            ["short"] = "User's last name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "username",
            ["short"] = "Username",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "user",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users",
                ["parts"] = {
                  "users",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{id}",
                ["parts"] = {
                  "users",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
