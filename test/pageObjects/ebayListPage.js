const Page = require('./page');

const EBAY_LIST_PAGE_URL = 'https://www.ebay.com.au/sch/i.html';

class EbayListPage extends Page {

    /**
    * define elements
    */
    get searchResultsPageMainContent()   { return browser.element('.srp-main-content'); }
    get searchItemsTitle()               { return browser.elements('.s-item__title'); }
    get searchItemsPrice()               { return browser.elements('.s-item__price'); }
    get searchItems()                    { return browser.elements('.s-item'); }
    get searchItemsLinks()               { return browser.elements('.s-item a'); }
    /**
    * define Methods
    */
    selectNthItem(n)   {
        const els = this.searchItemsLinks.value;
        const el = els[n];

        // need to check this
        browser.elementIdClick(el.ELEMENT);
        // browser.elementIdClick(el.ELEMENT);
    }

    getNthTitle(n)   {
        const els = this.searchItemsTitle.value;
        const el = els[n];

        return browser.elementIdText(el.ELEMENT).value;
    }

    getNthPrice(n)   {
        const els = this.searchItemsPrice.value;
        const el = els[n];

        return browser.elementIdText(el.ELEMENT).value;
    }

    url() {
        return EBAY_LIST_PAGE_URL;
    }

    clickStartAssessment() {
        this.buttonReady.waitForExist();
        this.startButton.click();
    }
};

module.exports = new EbayListPage('Ebay List Page');
