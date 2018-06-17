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
    selectNthItem(n) {
        const els = this.searchItemsLinks.value;
        const el = els[n];

        browser.elementIdClick(el.ELEMENT);
    }

    getNthTitle(n) {
        const els = this.searchItemsTitle.value;
        const el = els[n];

        return browser.elementIdText(el.ELEMENT).value;
    }

    url() {
        return EBAY_LIST_PAGE_URL;
    }

};

module.exports = new EbayListPage('Ebay List Page');
