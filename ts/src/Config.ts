
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Mockae',
        slug: "mockae",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.mockae.com/fakeapi",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      cart: {
      },

      coupon: {
      },

      product: {
      },

      status: {
      },

      user: {
      },

    }
  }


  entity = {
    "cart": {
      "fields": [
        {
          "name": "id",
          "short": "Cart ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "items",
          "short": "Items in the cart",
          "type": "`$ARRAY`"
        },
        {
          "format": "float",
          "name": "total",
          "short": "Total cart value",
          "type": "`$NUMBER`"
        },
        {
          "name": "userId",
          "short": "User ID who owns the cart",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "cart",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/carts",
              "segments": [
                {
                  "lit": "carts"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "carts"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/carts/{id}",
              "segments": [
                {
                  "lit": "carts"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "carts",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "coupon": {
      "fields": [
        {
          "name": "code",
          "short": "Coupon code",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "discount",
          "short": "Discount percentage or amount",
          "type": "`$NUMBER`"
        },
        {
          "format": "date",
          "name": "expiryDate",
          "short": "Coupon expiry date",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Coupon ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "type",
          "short": "Type of discount (percentage or fixed)",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "coupon",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/coupons",
              "segments": [
                {
                  "lit": "coupons"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "coupons"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/coupons/{id}",
              "segments": [
                {
                  "lit": "coupons"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "coupons",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "product": {
      "fields": [
        {
          "name": "category",
          "short": "Product category",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Product description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Product ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Product name",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "price",
          "short": "Product price",
          "type": "`$NUMBER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "product",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/products",
              "segments": [
                {
                  "lit": "products"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "products"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/products/{id}",
              "segments": [
                {
                  "lit": "products"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "products",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "status": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 403,
                    "kind": "param",
                    "name": "id",
                    "orig": "status_code",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/status/{statusCode}",
              "rename": {
                "param": {
                  "statusCode": "id"
                }
              },
              "segments": [
                {
                  "lit": "status"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "status",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "format": "email",
          "name": "email",
          "short": "User email address",
          "type": "`$STRING`"
        },
        {
          "name": "firstName",
          "short": "User's first name",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "User ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "lastName",
          "short": "User's last name",
          "type": "`$STRING`"
        },
        {
          "name": "username",
          "short": "Username",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "user",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/users",
              "segments": [
                {
                  "lit": "users"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "users"
              ]
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/users/{id}",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "users",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

