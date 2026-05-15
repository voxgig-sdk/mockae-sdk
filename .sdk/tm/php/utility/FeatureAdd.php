<?php
declare(strict_types=1);

// Mockae SDK utility: feature_add

class MockaeFeatureAdd
{
    public static function call(MockaeContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
