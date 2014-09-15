// Protractor config file
// http://angular.github.io/protractor/#/
// Error messages overcome thanks to this comment by sheffield:
// http://stackoverflow.com/questions/23771922/protractor-error-message-unsupported-command-line-flag-in-chrome

exports.config = {
  // OPTION #1 - PROTRACTOR TO START SELENIUM (STANDALONE MODE)
  // (NO NEED TO RUN 'webdriver-manager start' as well, JUST RUN 'protractor protractor.conf.js')
  // Run the following first:
  // npm install --save-dev protractor
  // npm install --save-dev chromedriver
  chromeOnly: true,
  chromeDriver: './node_modules/chromedriver/bin/chromedriver',
  // OPTION #2 - RUN TESTS USING A SEPARATELY SELENIUM SERVER (FOR COMPLEX TESTS)
  // (RUN WITH 'webdriver-manager start')
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // Enable multiCapabilities
  // multiCapabilities: 
  //   [{
  //     'browserName': 'chrome',
  //     'chromeOptions': {
  //     args: ['--test-type']
  //     }
  //   },
  //   {
  //     'browserName': 'firefox'
  //   }
  // ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        args: ['--test-type']
    }
  },
  // http://ramonvictor.github.io/protractor/slides
  onPrepare: function() {
     browser.driver.manage().window().setSize(800, 600);
  },
  // Separate tests into test suites
  // Run with: protractor protractor.conf.js --suite homepage
  // suites: {
  //   homepage: 'tests/e2e/**/*_test.js',
  //   search: ['tests/e2e/contact_search/**/*Spec.js']
  // },
  specs: ['./test/e2e/*_test.js'],
  baseUrl: 'http://localhost:9000', //default test port with Yeoman is 127.0.0.1 (localhost)
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    includeStackTrace: true
  }
};