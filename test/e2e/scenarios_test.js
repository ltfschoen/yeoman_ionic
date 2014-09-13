describe('YeomanIonic App', function() {

  describe('Sentences view', function() {

    beforeEach(function() {
      // match the address that opens with command 'grunt server'
      browser.get('/'); // opens /app/index.html (root)
    });

    // verify search box and repeater are correctly wired together
    it('should filter the sentences list as user types into the search box', function() {

      var sentenceList = element.all(by.repeater('sentence in sentences'));
      var query = element(by.model('query'));

      expect(sentenceList.count()).toBe(2);

      query.sendKeys('sentence');
      expect(sentenceList.count()).toBe(2);

      query.clear();
      query.sendKeys('1st');
      expect(sentenceList.count()).toBe(1);
    });
  });
});