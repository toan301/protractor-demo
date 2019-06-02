'use strict';
const config = require('./common.conf').config;
// config server to run e2e test
// config.seleniumAddress = 'http://eduappatsql.cloudapp.net:4444/wd/hub/';
//config.seleniumAddress = 'http://localhost:32773/wd/hub/';
config.baseUrl = 'https://www.google.com.vn/';
config.directConnect = true;
config.multiCapabilities = [
    {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars', 'lang=en-EN'], //'auto-open-devtools-for-tabs'],
        },
        loggingPrefs: { browser: 'SEVERE' }, // Available values for most loggers are "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL"
        shardTestFiles: false,
        maxInstances: 1,
        deviceProperties: {
            browser: {
                name: 'chrome',
                version: 'latest',
            },
            device: 'Test machine',
            platform: {
                name: 'windows',
                version: 'server',
            },
        },
    },
];
exports.config = config;

