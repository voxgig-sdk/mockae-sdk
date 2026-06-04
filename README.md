# Mockae SDK

Read-only public mock REST API with sample products, carts, users, coupons and HTTP status helpers

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Mockae API

[Mockae](https://mockae.com/) is an open-source project by Cyril Bois that lets developers mock REST APIs using Lua scripts to control headers, HTTP status codes, and response bodies based on the incoming URL, headers, and payload.

This SDK targets the hosted public sandbox at `https://api.mockae.com/fakeapi`, which exposes a small set of read-only sample collections useful for demos, tutorials, and front-end prototyping:

- `/products` — around 50 sample product records
- `/carts` — around 20 sample shopping carts
- `/users` — around 20 sample user profiles
- `/coupons` — around 20 sample coupon records
- `/status` — endpoint for simulating arbitrary HTTP response codes

The public sandbox has CORS enabled and requires no authentication. Rate limits are not published, and the service is community-monitored, so availability and latency can vary. For private mocks with custom Lua rules, run Mockae yourself from the project's homepage.

## Try it

**TypeScript**
```bash
npm install mockae
```

**Python**
```bash
pip install mockae-sdk
```

**PHP**
```bash
composer require voxgig/mockae-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/mockae-sdk/go
```

**Ruby**
```bash
gem install mockae-sdk
```

**Lua**
```bash
luarocks install mockae-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MockaeSDK } from 'mockae'

const client = new MockaeSDK({})

// List all carts
const carts = await client.Cart().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o mockae-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "mockae": {
      "command": "/abs/path/to/mockae-mcp"
    }
  }
}
```

## Entities

The API exposes 5 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Cart** | Sample shopping carts returned from `/carts` (about 20 fixtures). | `/carts` |
| **Coupon** | Sample discount coupons returned from `/coupons` (about 20 fixtures). | `/coupons` |
| **Product** | Sample product catalogue entries returned from `/products` (about 50 fixtures). | `/products` |
| **Status** | Helper endpoint at `/status` for simulating arbitrary HTTP response codes during testing. | `/status/{statusCode}` |
| **User** | Sample user profile records returned from `/users` (about 20 fixtures). | `/users` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from mockae_sdk import MockaeSDK

client = MockaeSDK({})

# List all carts
carts, err = client.Cart(None).list(None, None)

# Load a specific cart
cart, err = client.Cart(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'mockae_sdk.php';

$client = new MockaeSDK([]);

// List all carts
[$carts, $err] = $client->Cart(null)->list(null, null);

// Load a specific cart
[$cart, $err] = $client->Cart(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/mockae-sdk/go"

client := sdk.NewMockaeSDK(map[string]any{})

// List all carts
carts, err := client.Cart(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Mockae_sdk"

client = MockaeSDK.new({})

# List all carts
carts, err = client.Cart(nil).list(nil, nil)

# Load a specific cart
cart, err = client.Cart(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("mockae_sdk")

local client = sdk.new({})

-- List all carts
local carts, err = client:Cart(nil):list(nil, nil)

-- Load a specific cart
local cart, err = client:Cart(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MockaeSDK.test()
const result = await client.Cart().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MockaeSDK.test(None, None)
result, err = client.Cart(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MockaeSDK::test(null, null);
[$result, $err] = $client->Cart(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Cart(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MockaeSDK.test(nil, nil)
result, err = client.Cart(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Cart(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Mockae API

- Upstream: [https://mockae.com/](https://mockae.com/)

- Mockae is a free, open-source project by Cyril Bois
- The hosted `api.mockae.com/fakeapi` service is provided as a public, read-only sandbox
- No specific rate limits or auth requirements are documented; treat the service as best-effort for testing and prototyping
- See the Mockae homepage at https://mockae.com/ for conditions of use

---

Generated from the Mockae API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
