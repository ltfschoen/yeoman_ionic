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

    it('should display correct description for hello', function() {
      expect(element(by.binding('sentence.description')).getText()).toBe('Hello is a greeting');
    });

    it('should display list of 1 thumbnail images on the hello detail page', function() {
      var list = element.all(by.css('.sentence-thumbnails'));
      expect(list.count()).toBe(1);
    });

    // verify that main image set to first sentence image by default
    it('should display first phone image as the main phone image', function() {
      expect(element(by.css('img.sentence')).getAttribute('src')).toMatch('/images/hello.jpg');
    });
    // clicks several thumbnail images to verify that main image changed
    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.sentence-thumbnails li:nth-child(1) img')).click();
      expect(element(by.css('img.sentence')).getAttribute('src')).toMatch('/images/hello.jpg');

      element(by.css('.sentence-thumbnails li:nth-child(2) img')).click();
      expect(element(by.css('img.sentence')).getAttribute('src')).toMatch('/images/ionic.png');
    });

  });
});