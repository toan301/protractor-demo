import { browser, protractor } from "protractor";
import { SearchPageObject } from "../pages/searchPage.po";
import { defineSupportCode } from 'cucumber';
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const search: SearchPageObject = new SearchPageObject();
defineSupportCode(async function ({ Given, When, Then }) {
    Given(/^I am on "(.*?)" search page$/, async (text) => {
        await browser.get('https://www.google.com.vn/');
        await browser.sleep(2000);
        if (text === 'google') {
            await expect(browser.getTitle()).to.eventually.equal("Google");
        } else if (text === 'cucumber') {
            await expect(browser.getTitle()).to.eventually.equal(text + " - Google Search");
        } else if (text === 'protractor') {
            await expect(browser.getTitle()).to.eventually.equal(text + " - Google Search");
        }
    });
    When(/^I type "(.*?)"$/, async (text) => {
        await search.searchTextBox.sendKeys(text);
    });

    When(/^I click on search button$/, async () => {
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    });

    Then(/^I click on google logo$/, async () => {
        await search.logo.click();
    });
    Then(/^I clear the search text$/, async () => {
        await search.searchTextBox.clear();
    });
});
