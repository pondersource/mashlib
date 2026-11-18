const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
    testDir: '.', timeout: 90_000,
    expect: { timeout: 20_000 },
    use: { baseURL: 'http://localhost:5001', trace: 'retain-on-failure' },
    webServer: { command: 'node acceptance/serve.cjs', cwd: '..', url: 'http://localhost:5001' },
});
