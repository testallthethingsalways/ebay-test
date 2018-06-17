const Page = require('./page');

const EBAY_CART_URL = 'https://www.ebay.com.au/';

class EbayCart extends Page {

    /**
    * define elements
    */
    get startButton()   { return browser.element('.start-test-btn'); }

    /**
    * define Methods
    */
    url() {
        return EBAY_CART_URL;
    }

    item(item) {
        return browser.element(`a[href="${item}"]`);
    }
};

module.exports = new EbayCart('Ebay Cart');
