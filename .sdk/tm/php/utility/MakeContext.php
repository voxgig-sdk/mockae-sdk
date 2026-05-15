<?php
declare(strict_types=1);

// Mockae SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MockaeMakeContext
{
    public static function call(array $ctxmap, ?MockaeContext $basectx): MockaeContext
    {
        return new MockaeContext($ctxmap, $basectx);
    }
}
