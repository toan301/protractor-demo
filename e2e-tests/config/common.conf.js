'use strict';
const argv = require('yargs').argv;
const fs = require('fs-extra');
const path = require('path');

exports.config = {
    allScriptsTimeout: 60000,
    disableChecks: true,
    SELENIUM_PROMISE_MANAGER: false, // for using async await

    beforeLaunch: () => {
        fs.removeSync('./.tmp');
    },

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: 'ts:ts-node/register',
        require: [
            path.resolve(process.cwd(), './e2e-tests/**/hooks.ts'),
            path.resolve(process.cwd(), './e2e-tests/**/cucumber.config.ts'),
            path.resolve(process.cwd(), './e2e-tests/**/*.steps.ts'),
        ],
        format: 'json:.tmp/results.json',
        // tags: argv.tags || '@runEvaluation',
    },
    specs: getFeatureFiles(),

    ignoreUncaughtExceptions: true,

    plugins: [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport: true,
                metadataKey: 'deviceProperties',
                removeExistingJsonReportFile: true,
                removeOriginalJsonReportFile: false,
                disableLog: true,
                openReportInBrowser: false,
            },
        },
    ],
};

function getFeatureFiles() {
    if (argv.feature) {
        return argv.feature
            .split(',')
            .map(
                feature => `${process.cwd()}/e2e-tests/features/${feature}.feature`
            );
    }

    return [`${process.cwd()}/e2e-tests/features/*.feature`];
}
