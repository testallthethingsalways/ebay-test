const Page = require('./page');

const EBAY_CART_URL = 'https://cart.payments.ebay.com.au/';

class EbayCart extends Page {
    /**
    * define Methods
    */
    url() {
        return EBAY_CART_URL;
    }

    cartTitles() {
        return browser.elements('[id^="sellerBucket"] [id*="title"] > a').value;;
    }
};

module.exports = new EbayCart('Ebay Cart');
