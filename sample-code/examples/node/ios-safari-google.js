"use strict";

var wd = require("wd");

require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var should = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe("ios safari", function () {
  this.timeout(300000);
  var driver;

  before(function () {
    var serverConfig = {
      host: 'localhost',
      port: 4723
    };

    driver = wd.promiseChainRemote(serverConfig);

    var desired = {
      browserName: 'safari',
      'appium-version': '1.6',
      platformName: 'iOS',
      platformVersion: '9.3',
      deviceName: 'iPhone 6s',
      app: undefined
    };
    return driver.init(desired);
  });

  after(function () {
    return driver
      .quit();
  });

  it("should get the url", function () {
    return driver
      .get('https://www.google.com')
      .sleep(1000)
      .waitForElementById('lst-ib')
      //.waitForElementByName('q', 5000)
        .type('cyberagent')
      .waitForElementByClassName('kpgrb')
      //.waitForElementByName('btnGNS')
        .click()
      .waitForElementByLinkText('サイバーエージェント')
        .click()
      .sleep(5000)
      .saveScreenshot('test.png');
  });

});
