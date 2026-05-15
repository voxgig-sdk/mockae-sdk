<?php
declare(strict_types=1);

// Mockae SDK utility: prepare_body

class MockaePrepareBody
{
    public static function call(MockaeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
