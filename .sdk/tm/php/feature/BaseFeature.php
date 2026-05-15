<?php
declare(strict_types=1);

// Mockae SDK base feature

class MockaeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MockaeContext $ctx, array $options): void {}
    public function PostConstruct(MockaeContext $ctx): void {}
    public function PostConstructEntity(MockaeContext $ctx): void {}
    public function SetData(MockaeContext $ctx): void {}
    public function GetData(MockaeContext $ctx): void {}
    public function GetMatch(MockaeContext $ctx): void {}
    public function SetMatch(MockaeContext $ctx): void {}
    public function PrePoint(MockaeContext $ctx): void {}
    public function PreSpec(MockaeContext $ctx): void {}
    public function PreRequest(MockaeContext $ctx): void {}
    public function PreResponse(MockaeContext $ctx): void {}
    public function PreResult(MockaeContext $ctx): void {}
    public function PreDone(MockaeContext $ctx): void {}
    public function PreUnexpected(MockaeContext $ctx): void {}
}
