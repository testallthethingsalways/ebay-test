const Page = require('./page');

const EBAY_URL = 'https://www.ebay.com.au/';

class EbayHome extends Page {

    /**
    * define elements
    */
    get homeSearchInput()   { return browser.element('#gh-ac'); }
    get homeSearchInputFocussed()   { return browser.element('.gh-ac-box-focus'); }
    get searchButton()   { return browser.element('#gh-btn'); }

    /**
    * define Methods
    */
    url() {
        return EBAY_URL;
    }
    clickStartAssessment() {
        this.buttonReady.waitForExist();
        this.startButton.click();
    }
};

module.exports = new EbayHome('Ebay Home');
