const Page = require('./page');

const EBAY_ITEM_PAGE_URL = 'https://www.ebay.com.au/itm/';

class EbayItemPage extends Page {

    /**
    * define elements
    */
    get itemCenterPanel()   { return browser.element('#CenterPanel'); }
    get itemTitle()   { return browser.element('#itemTitle'); }
    get addToCartButton()   { return browser.element('#atcRedesignId_btn'); }

    /**
    * define Methods
    */
    url() {
        return EBAY_ITEM_PAGE_URL;
    }
};

module.exports = new EbayItemPage('Ebay Item Page');
