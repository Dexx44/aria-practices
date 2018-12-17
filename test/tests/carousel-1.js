'use strict';

const { ariaTest } = require('..');
const { By, Key } = require('selenium-webdriver');
const assertAttributeValues = require('../util/assertAttributeValues');
const assertAriaControls = require('../util/assertAriaControls');
const assertAriaLabelledby = require('../util/assertAriaLabelledby');
const assertAriaLabelExists = require('../util/assertAriaLabelExists');
const assertAriaRoles = require('../util/assertAriaRoles');
const assertTabOrder = require('../util/assertTabOrder');

const exampleFile = 'carousel/carousel-1/carousel-1.html';

const ex = {
  pauseSelector: '#ex1 .pause',
  nextSelector: '#ex1 .next',
  previousSelector: '#ex1 .previous',
  landmarkSelector: '#myCarousel'
};

const openTabAtIndex = async function (t, index) {
  const tabs = await t.context.session.findElements(By.css(ex.tabSelector));
  await tabs[index].click();
};

const waitAndCheckFocus = async function (t, selector, index) {
  return t.context.session.wait(async function () {
    return t.context.session.executeScript(function () {
      const [selector, index] = arguments;
      let items = document.querySelectorAll(selector);
      return items[index] === document.activeElement;
    }, selector, index);
  }, t.context.waitTime, 'Timeout waiting for document.activeElement to become item at index ' + index + ' of elements selected by: ' + selector);
};

const waitAndCheckAriaSelected = async function (t, index) {
  return t.context.session.wait(async function () {
    const tabs = await t.context.session.findElements(By.css(ex.tabSelector));
    return (await tabs[index].getAttribute('aria-selected')) === 'true';
  }, t.context.waitTime, 'Timeout waiting for aria-selected to be set to true.');
};

// Attributes

ariaTest('Carousel 1: pause button has aria-pressed', exampleFile, 'pause-aria-pressed', async (t) => {
  t.plan(1);
  await assertAttributeValues(t, ex.pauseSelector, 'aria-pressed', 'false');
});

ariaTest('Carousel 1: section has aria-label', exampleFile, 'landmark-aria-label', async (t) => {
  t.plan(1);
  await assertAriaLabelExists(t, ex.landmarkSelector);
});

