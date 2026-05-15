package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/mockae-sdk"
	"github.com/voxgig-sdk/mockae-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCartEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Cart(nil)
		if ent == nil {
			t.Fatal("expected non-nil CartEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := cartBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cart." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MOCKAE_TEST_CART_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		cartRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.cart", setup.data)))
		var cartRef01Data map[string]any
		if len(cartRef01DataRaw) > 0 {
			cartRef01Data = core.ToMapAny(cartRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cartRef01Data

		// LIST
		cartRef01Ent := client.Cart(nil)
		cartRef01Match := map[string]any{}

		cartRef01ListResult, err := cartRef01Ent.List(cartRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cartRef01ListOk := cartRef01ListResult.([]any)
		if !cartRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cartRef01ListResult)
		}

		// LOAD
		cartRef01MatchDt0 := map[string]any{
			"id": cartRef01Data["id"],
		}
		cartRef01DataDt0Loaded, err := cartRef01Ent.Load(cartRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cartRef01DataDt0LoadResult := core.ToMapAny(cartRef01DataDt0Loaded)
		if cartRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if cartRef01DataDt0LoadResult["id"] != cartRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func cartBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cart", "CartTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cart test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cart test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"cart01", "cart02", "cart03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MOCKAE_TEST_CART_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MOCKAE_TEST_CART_ENTID": idmap,
		"MOCKAE_TEST_LIVE":      "FALSE",
		"MOCKAE_TEST_EXPLAIN":   "FALSE",
		"MOCKAE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MOCKAE_TEST_CART_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MOCKAE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MOCKAE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewMockaeSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MOCKAE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MOCKAE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
