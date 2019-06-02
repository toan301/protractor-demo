import { browser, by, element, ElementArrayFinder, ElementFinder, ProtractorExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { BaseElement } from './base-element';
import { Constant } from './constant';

import { format, log } from 'util';

const dataSample = new Constant();
const defaultTimeout = Constant.TIMEOUT;

export class BasePage extends BaseElement {
  constructor() {
    super();
  }
  condition = browser.ExpectedConditions;

  async goToUrl(url: string) {
    await browser.get(url);
    await this.sleep(3);
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }


  async waitElementReady(locator: string) {
    const _element = this.findElement(locator);
    let driverWaitIterations = 0;
    let lastWebdriverError: any;
    return await browser.driver
      .wait(async () => {
        driverWaitIterations++;
        return await _element.isPresent().then(async present => {
          if (present) {
            return await _element.isDisplayed().then(async visible => {
              lastWebdriverError = 'visible:' + visible;
              return await visible;
            });
          } else {
            lastWebdriverError = 'present:' + present;
            return false;
          }
        });
      }, defaultTimeout)
      .then(waitResult => {
        return waitResult;
      });
  }
  async type(locator: string, value: string, param?: string) {
    try {
      const _element = param ? this.findElement(locator, param) : this.findElement(locator);
      await this.waitElementReady(locator);
      await _element.clear();
      await this.sleep(0.5);
      await _element.sendKeys(value);
      await this.sleep(0.5);
    } catch (er) {
      console.log('There is error: ' + er);
    }
  }

  async typeByExecuteJS(locator: string, value: string, param: string) {
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      return await browser.executeScript("arguments[0].value='" + value + "';", el);
    } catch (er) {
      console.log('There is error: ' + er);
    }
  }

  async click(locator: string, param?: string) {
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      await this.sleep(0.5);
      await el.click();
    } catch (er) {
      console.log('There is error: ' + er);
    }
  }

  async selectCombobox(locator: string, value: string) {
    const valueEl = 'cssText=mat-option containsText=' + value;
    await this.waitForElementVisible(locator);
    await this.click(locator);
    await this.waitForElementVisible(valueEl);
    await this.click(valueEl);
  }

  async isElementDisplayed(locator: string, param?: string): Promise<boolean> {
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      await this.sleep(3);
      return await el.isDisplayed();
    } catch (e) {
      console.log('Control is not displayed. ' + e);
    }
  }


  async isElementPresent(locator: string) {
    try {
      const el = this.findElement(locator);
      return await browser.isElementPresent(el);
    } catch (e) {
      console.log('Control is not presented.', e);
      return false;
    }
  }

  async isElementSelected(locator: string) {
    try {
      const el = this.findElement(locator);
      return await el.isSelected();
    } catch (e) {
      console.log('There is error: ' + e);
      return false;
    }
  }

  async isElementEnabled(locator: string) {
    try {
      const el = this.findElement(locator);
      return await el.isEnabled();
    } catch (e) {
      console.log('There is error: ' + e);
      return false;
    }
  }
  async getTextElement(locator: string, param?: string): Promise<string> {
    try {
      await this.sleep(1);
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      return await el.getText();
    } catch (er) {
      console.log('There is error: ' + er);
    }
  }

  async getAttributeElement(locator: string, attribute: string) {
    try {
      const el = this.findElement(locator);
      return await el.getAttribute(attribute);
    } catch (er) {
      console.log('There is error: ' + er);
    }
  }

  async waitForElementInvisibility(locator: string, timewait?: number) {
    let timeout = timewait ? timewait : defaultTimeout;
    try {
      const el = this.findElement(locator);
      await browser.wait(this.condition.invisibilityOf(el), timeout, `Control at: ${locator} can not be invisible`);
    } catch (e) {
      console.log('There is error: ' + e);
    }
  }

  async getCSSColor(locator: string) {
    const el = this.findElement(locator);
    return await el.getCssValue('color');
  }

  async waitForElementVisible(locator: string, param?: string, timewait?: number) {
    let timeout = timewait ? timewait : defaultTimeout;
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      await browser.wait(this.condition.visibilityOf(el), timeout, `Control at: ${locator} can not be visible`);
    } catch (e) {
      console.log('There is error: ' + e);
    }
  }

  async waitForButtonIsClickable(locator: string, param?: string, timewait?: number) {
    let timeout = timewait ? timewait : defaultTimeout;
    try {
      const el = param ? this.findElement(locator, param) : this.findElement(locator);
      let visibilityOf = this.condition.visibilityOf(el);
      let isClickable = this.condition.elementToBeClickable(el);
      await browser.wait(this.condition.and(visibilityOf, isClickable), timeout);
    } catch (e) {
      console.log('There is error: ' + e);
    }
  }
  async waitForTheValueIsChanged(locator: string, value: string, timewait?: number) {
    let timeout = timewait ? timewait : defaultTimeout;
    try {
      const el = this.findElement(locator);
      await browser.wait(this.condition.textToBePresentInElement(el, value), timeout, `Control at: ${locator} can not be changed`);
    } catch (e) {
      console.log('There is error: ' + e);
    }
  }

  async waitForLoading() {
    const loading = 'css=.spinner';
    await this.waitForElementInvisibility(loading);
  }

  async waitForControlPresence(locator: string) {
    try {
      const element_ = await this.findElement(locator);
      return browser.wait(this.condition.presenceOf(element_), defaultTimeout, "Control at: " + locator + " can not be present");
    } catch (e) {
      console.error('Control is not present. ' + e);
    }
  }

  async waitForAlertPopupPresent() {
    try {
      return browser.wait(this.condition.alertIsPresent(), defaultTimeout);
    } catch (e) {
      console.log('Alert not present.' + e);
    }
  }

  async waitForAngularDialogPresent() {
    try {
      const el = this.findElement('css=.mat-dialog-container');
      await browser.wait(this.condition.visibilityOf(el), defaultTimeout);
    } catch (e) {
      console.log('Dialog is not present.' + e);
    }
  }

  async chooseActionInDialog(action: string) {
    try {
      const el = this.findElement('xpath=//mat-dialog-container//button/span[contains(.,"%s")]', action);
      el.click();
    } catch (e) {
      console.log('Cannot perform the action.' + action);
    }
  }

  async convertTime(time: string) {
    let hour = parseInt(time.split(':')[0], 10);
    const min = parseInt(time.split(':')[1], 10);
    let minute = min.toString();
    if (min === 0) {
      minute = '0' + min;
    }
    if (hour > 12) {
      hour = hour - 12;
      return '' + hour + ':' + minute + ' PM';
    }
    return '' + hour + ':' + minute + ' AM';
  }

  /**
   * TODO Need update
   * @param id
   */
  async switchToIframe(id: number) {
    await this.sleep(1);
    await browser.switchTo().frame(id);
  }

  async switchToIframeUsingLocator(frameLocator: string) {
    try {
      const frameElement = this.findElement(frameLocator);
      await this.sleep(1);
      await browser.switchTo().frame(frameElement);
    } catch (e) {
      console.log(e);
    }
  }

  async switchToWindows(windows: string) {
    try {
      await this.sleep(1);
      await browser.switchTo().window(windows);
    } catch (e) {
      console.log(e);
    }
  }

  async getCurrentWindows() {
    return await browser.getWindowHandle();
  }

  async switchToDefaultContent() {
    await this.sleep(1);
    await browser.switchTo().defaultContent();
  }

  async selectDropdownByCssText(locator: string, item: string, timeOut?: number, param?: string) {
    try {
      const _dropdownLocator = param ? this.findElement(locator, param) : this.findElement(locator);
      await _dropdownLocator.click();
      await this.sleep(2);
      const dropdownValueLocator = '.mat-select-content mat-option';
      if (item != null || item != undefined) {
        for (const itemValue of item.split(';')) {
          await element(by.cssContainingText(dropdownValueLocator, itemValue)).click();
          await this.sleep(2);
        }
        await this.pressEscKey();
      }
    } catch (e) { }
  }
  async selectValueFromDropDown(dropdownName: string, item: string) {
    try {
      const _dropdownXpath = format('xpath=//div[@ngbdropdown]/button[contains(.,"%s")]', dropdownName);
      this.waitForElementVisible(_dropdownXpath);
      const dropdownLocator = this.findElement(_dropdownXpath);
      await dropdownLocator.click();
      await this.sleep(2);
      const dropdownValueLocator = '.dropdown-item';
      if (item != null || item != undefined) {
        await element(by.cssContainingText(dropdownValueLocator, item)).click();
        await this.sleep(2);
      }
    } catch (e) { }
  }
  async selectDropdownByText(locator: string, item: string, timeOut?: number, param?: string) {
    try {
      let desiredOption;
      const _dropdownLocator = param ? this.findElement(locator, param) : this.findElement(locator);
      await _dropdownLocator.click();
      await this.sleep(1);
      const dropdownValueLocator = '.mat-select-content mat-option';
      if (item != null || item != undefined) {
        for (const itemValue of item.split(';')) {
          await element.all(by.css(dropdownValueLocator)).each(async elem => {
            await elem.getText().then(text => {
              if (text.indexOf(itemValue.trim()) !== -1) {
                desiredOption = elem;
                return true;
              }
            });
          });
          if (desiredOption) {
            desiredOption.click();
          }
          if (timeOut !== null) {
            await this.sleep(timeOut);
          }
        }
        await this.sleep(1);
        await this.pressEscKey();
      }
    } catch (e) { }
  }
  async checkToCheckbox(locator: string, checked: boolean, param?: string) {
    try {
      const _element = param ? this.findElement(locator, param) : this.findElement(locator);
      const state = await this.isElementSelected(locator);
      if (state !== checked) {
        return _element.click();
      }
    } catch (e) {
      console.log('Can not check to checkbox. ' + e);
    }
  }
  async clickByExecuteJS(locator: string, param?: string) {
    try {
      const _element = param ? this.findElement(locator, param) : this.findElement(locator);
      return await browser.executeScript('arguments[0].click();', _element);
    } catch (er) {
      console.log('There is error: ' + er);
    }
  }

  async scrollToBottom() {
    await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
  }

  async sleep(s: number) {
    return browser.sleep(s * 1000);
  }

  async refreshPage() {
    await browser.refresh();
  }

  async moveMouseToElement(locator: string) {
    try {
      const el = this.findElement(locator);
      await browser
        .actions()
        .mouseMove(el)
        .perform();
      browser.sleep(5000);
    } catch (e) {
      return false;
    }
  }

  async pressEnterKey() {
    try {
      browser
        .actions()
        .sendKeys(protractor.Key.ENTER)
        .perform();
    } catch (e) {
      return false;
    }
  }

  async pressEscKey() {
    try {
      browser
        .actions()
        .sendKeys(protractor.Key.ESCAPE)
        .perform();
    } catch (e) {
      return false;
    }
  }

  async moveMouseToDynamicElement(locator: string, value: string) {
    try {
      const el = this.findElement(locator, value);
      await browser
        .actions()
        .mouseMove(el)
        .perform();
      browser.sleep(5000);
    } catch (e) {
      return false;
    }
  }

  async processUploadFile(filePath: string) {
    try {
      console.log('Uploaded');
      const uploadFileLocator = this.findElement('css=input[type="file"]');
      const uploadBtn = this.findElement('xpath=//button[contains(.,"Upload")]');
      await browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", uploadFileLocator);
      await uploadFileLocator.sendKeys(filePath);
      await this.sleep(5);
      await uploadBtn.click();
      await this.sleep(1);
    } catch (e) {
      console.log(e);
    }
  }
}
