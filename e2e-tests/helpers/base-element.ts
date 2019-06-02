import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { format } from 'util';

export class BaseElement {
  // Find dynamic single element
  protected findElement(locator: string, param?: string): ElementFinder {
    let control: any;
    // locator = param ? locator.replace('%s', param) : locator;
    locator = param ? format(locator, param) : locator;
    try {
      if (locator.startsWith('id=')) {
        locator = locator.substring(3);
        control = element(by.id(locator));
      } else if (locator.startsWith('name=')) {
        locator = locator.substring(5);
        control = element(by.name(locator));
      } else if (locator.startsWith('css=')) {
        locator = locator.substring(4);
        control = element(by.css(locator));
      } else if (locator.startsWith('class=')) {
        locator = locator.substring(6);
        control = element(by.className(locator));
      } else if (locator.startsWith('xpath=')) {
        locator = locator.substring(6);
        control = element(by.xpath(locator));
      } else if (locator.startsWith('binding=')) {
        locator = locator.substring(8);
        control = element(by.binding(locator));
      } else if (locator.startsWith('model=')) {
        locator = locator.substring(6);
        control = element(by.model(locator));
      } else if (locator.startsWith('repeater=')) {
        locator = locator.substring(9);
        control = element(by.repeater(locator));
      } else if (locator.startsWith('options=')) {
        locator = locator.substring(8);
        control = element(by.options(locator));
      } else if (locator.startsWith('tagname=')) {
        locator = locator.substring(8);
        control = element(by.tagName(locator));
      } else if (locator.startsWith('button=')) {
        locator = locator.substring(7);
        locator = param ? locator : locator.replace('%s', param);
        control = element(by.buttonText(locator));
      } else if (locator.startsWith('cssText=')) {
        locator = locator.substring(8);
        locator = param ? locator : locator.replace('%s', param);
        const text = locator.split(' containsText=')[1];
        const _locator = locator.split(' containsText=')[0];
        control = element(by.cssContainingText(_locator, text));
      }
    } catch (e) {
      console.error('Not found ' + `${locator}` + ' element');
    }

    return control;
  }

  // Find dynamic all elements
  protected findAllElements(locator: string): ElementArrayFinder {
    let controls: any;
    try {
      if (locator.startsWith('id=')) {
        locator = locator.substring(3);
        controls = element.all(by.id(locator));
      } else if (locator.startsWith('name=')) {
        locator = locator.substring(5);
        controls = element.all(by.name(locator));
      } else if (locator.startsWith('css=')) {
        locator = locator.substring(4);
        controls = element.all(by.css(locator));
      } else if (locator.startsWith('class=')) {
        locator = locator.substring(6);
        controls = element.all(by.className(locator));
      } else if (locator.startsWith('xpath=')) {
        locator = locator.substring(6);
        controls = element.all(by.xpath(locator));
      } else if (locator.startsWith('binding=')) {
        locator = locator.substring(8);
        controls = element.all(by.binding(locator));
      } else if (locator.startsWith('model=')) {
        locator = locator.substring(6);
        controls = element.all(by.model(locator));
      } else if (locator.startsWith('repeater=')) {
        locator = locator.substring(9);
        controls = element.all(by.repeater(locator));
      } else if (locator.startsWith('options=')) {
        locator = locator.substring(8);
        controls = element.all(by.options(locator));
      } else if (locator.startsWith('tagname=')) {
        locator = locator.substring(8);
        controls = element.all(by.tagName(locator));
      } else if (locator.startsWith('button=')) {
        locator = locator.substring(7);
        controls = element.all(by.buttonText(locator));
      }
    } catch (e) {
      console.error('Not found ' + `${locator}` + ' element');
    }
    return controls;
  }
}
