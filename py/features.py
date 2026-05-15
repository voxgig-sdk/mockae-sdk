# Mockae SDK feature factory

from feature.base_feature import MockaeBaseFeature
from feature.test_feature import MockaeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MockaeBaseFeature(),
        "test": lambda: MockaeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
