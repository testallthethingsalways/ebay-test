const Page = require('./page');

const EBAY_LIST_PAGE_URL = 'https://www.ebay.com.au/sch/i.html';

class EbayListPage extends Page {

    /**
    * define elements
    */
    get searchResultsPageMainContent()   { return browser.element('.srp-main-content'); }
    get searchItemsTitle()               { return browser.elements('.s-item__title'); }
    get searchItemsLinks()               { return browser.elements('.s-item a'); }

    /**
    * define Methods
    */
    selectFirstItem() {
        const els = this.searchItemsLinks.value;
        const el = els[1];

        browser.elementIdClick(el.ELEMENT);
    }

    getFirstTitle() {
        const els = this.searchItemsTitle.value;
        const el = els[0];

        return browser.elementIdText(el.ELEMENT).value;
    }

    url() {
        return EBAY_LIST_PAGE_URL;
    }

};

module.exports = new EbayListPage('Ebay List Page');
