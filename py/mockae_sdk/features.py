# Mockae SDK feature factory

from mockae_sdk.feature.base_feature import MockaeBaseFeature
from mockae_sdk.feature.test_feature import MockaeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MockaeBaseFeature(),
        "test": lambda: MockaeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
