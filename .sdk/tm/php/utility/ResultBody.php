<?php
declare(strict_types=1);

// Mockae SDK utility: result_body

class MockaeResultBody
{
    public static function call(MockaeContext $ctx): ?MockaeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
