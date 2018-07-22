/* Test suite for RSS Feeds */

$(function() {

  describe('RSS Feeds', function() {
    /* It ensures that the allFeeds variables are defined
     * and is not empty
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('have an url', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* This test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    it('names are defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });

  });

  /* Test suite for "The menu" */

  describe('The Menu', function() {

    /* This test ensures the menu element is
     * hidden by default.
     */
    it('menu hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* This test ensures the menu changes
     * visibility when the menu icon is clicked.
     * The menu appears when clicked and hides when clicked again. 
     */

    it('show on click event', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).not.toBe(true);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

  });

  /* Test suite is for Initial Entries */

  /* This test uses Jasmine's beforeEach and asynchronous done() function.
   * This test ensures that when the loadFeed function is called and completes its work,
   * there should be a single .entry element within the .feed container.
   */

  describe('Initial Entries', function() {

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('has a single entry', function() {
      let entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
    });

  });

  /* Test suite is for New Feed Selection */

  /* This test ensures that when a new feed is loaded
   * by the loadFeed function, the content actually changes.
   */

  describe('New Feed Selection', function() {
    var feed;
    beforeEach(function(done) {
      loadFeed(0, function() {
        feed = $('.feed').html();
        loadFeed(1, done);
      });
      loadFeed(1, function() {
        entriesEnd = $('.feed').find(allFeeds.url);
        done();
      });
    });

    it('new feed is different to older one', function(done) {
      expect($('.feed').html()).not.toBe(feed);
      done();
    });

  });

}());