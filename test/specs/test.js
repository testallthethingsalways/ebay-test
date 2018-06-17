const ebayHome = require('../pageObjects/ebayHome');
const ebayListPage = require('../pageObjects/ebayListPage');
const ebayItemPage = require('../pageObjects/ebayItemPage');
const ebayCart = require('../pageObjects/ebayCart');
const chai = require('chai');
const expect = chai.expect;

const ITEMS = ['spork'];

ITEMS.forEach(function (searchItem) {
    'use strict';

    describe('Given the ebay website', function () {
        describe('When on the ebay homepage', function () {

            before(function () {
                browser.url(ebayHome.url());
            });

            it('Then the url should be as expected', function () {
                expect(browser.url().value).to.equal(ebayHome.url());
            });

            it('Then the search box should be visible', function () {
                expect(ebayHome.homeSearchInput.isVisible()).to.be.true;
            });

            it('Then the search box should be focused when clicked', function () {
                ebayHome.homeSearchInput.click();
                ebayHome.homeSearchInputFocussed.waitForExist();
                expect(ebayHome.homeSearchInputFocussed.isExisting()).to.be.true;
            });

            it('Then the search box should allow text to be entered', function () {
                ebayHome.homeSearchInput.setValue(searchItem);
            });

            it('Then the search box should search for the text entered', function () {
                const value = ebayHome.homeSearchInput.getValue();

                expect(value).to.equal(searchItem);
            });

            it('Then clicking search should navigate to a new page', function () {
                ebayHome.searchButton.click();
                expect(browser.url().value).to.not.equal(ebayHome.url());
            });

            describe('When the user has performed a search', function () {
                let item, itemTitle, itemPrice;

                it('Then the search results page should be shown', function () {
                    expect(browser.url().value).to.contain(ebayListPage.url());
                    ebayListPage.searchResultsPageMainContent.waitForVisible();
                    expect(ebayListPage.searchResultsPageMainContent.isVisible()).to.be.true;
                });

                it('Then items matching the search should be listed', function () {
                    const results = ebayListPage.searchItemsTitle.value;
                    const numResults = results.length;

                    item = browser.url();
                    itemTitle = ebayListPage.getNthTitle(1);
                    itemPrice = ebayListPage.getNthPrice(1);

                    expect(numResults).to.be.above(0);
                });

                it('Then items should be clickable', function () {
                    ebayListPage.selectNthItem(1);

                    // Sometimes ebay shows a modal instead of navigating to the item page
                    // Ebay may be identifying the automated tests and performing some kind of spoofing
                    // Allow time for a modal to be shown and click the link to proceed to the item
                    browser.pause(1000);
                    if (browser.isVisible('.lens-modal')) {
                        browser.click('.item-link a');
                        browser.click('.item-link a');
                    }
                });

                describe('When the user selects an item', function () {
                    it('Then the item view should be shown', function () {
                        expect(browser.url().value).to.contain(ebayItemPage.url());
                        expect(ebayItemPage.itemCenterPanel.isVisible()).to.be.true;
                    });

                    it('Then the same item as selected should be shown', function () {
                        expect(itemTitle).to.equal(ebayItemPage.itemTitle.getText());
                    });

                    it('Then the user should be able to add that item to cart', function () {
                        ebayItemPage.addToCartButton.click();
                    });

                    describe('When the user adds an item to cart', function () {
                        it('Then the ebay cart view should be shown', function () {
                            expect(browser.url().value).to.contain(ebayCart.url());
                        });

                        it('Then the same item as selected should be shown', function () {
                            ebayCart.item(item).waitForExist();
                            expect(ebayCart.item(item).isExisting()).to.be.true;
                        });

                    });
                });
            });
        });
    });
});
