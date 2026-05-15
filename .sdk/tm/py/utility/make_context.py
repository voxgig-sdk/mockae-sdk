# Mockae SDK utility: make_context

from core.context import MockaeContext


def make_context_util(ctxmap, basectx):
    return MockaeContext(ctxmap, basectx)
