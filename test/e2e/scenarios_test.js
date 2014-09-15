// INSTRUCTIONS: protractor protractor.conf.js (at command prompt)

describe('YeomanIonic App', function() {

  describe('Sentences view', function() {

    beforeEach(function() {
      // match the address that opens with command 'grunt server'
      browser.get('/'); // opens /app/index.html
    });

    // verify search box and repeater are correctly wired together
    it('should filter the sentences list as user types into the search box', function() {

      var sentenceList = element.all(by.repeater('sentence in sentences'));
      var query = element(by.model('query'));

      expect(sentenceList.count()).toBe(4);

      query.sendKeys('ee');
      expect(sentenceList.count()).toBe(2);

      query.clear();
      query.sendKeys('Hello');
      expect(sentenceList.count()).toBe(1);
    });

    // verify ordering mechanism of select box is working
    it('should control sentence order via the drop down select box', function() {
      var sentenceNameColumn = element.all(by.repeater('sentence in sentences').column('{{sentence.name}}'));
      var query = element(by.model('query'));

      function getNames() {
        return sentenceNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      // narrow dataset to make test assertions shorter
      query.sendKeys('ee');

      // should match on 'ee' common to both sentences
      expect(getNames()).toEqual([
        "Greetings",
        "Cheerio"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "Cheerio",
        "Greetings"
      ]);

    });

    it('should render sentence specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('hello');
      element.all(by.css('.sentences li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/sentences/hello');
      });
    });

    it('should redirect index.html to index.html#/sentences', function() {
      browser.get('index.html');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/sentences');
      });
    });

  });

  describe('Sentences detail view', function() {

    beforeEach(function() {
      browser.get('index.html#/sentences/hello');
    });

    it('should display placeholder page with sentenceId', function() {
      expect(element(by.binding('sentenceId')).getText()).toBe('hello');
    });

  });
});