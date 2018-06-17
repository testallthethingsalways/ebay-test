const ebayHome = require('../pageObjects/ebayHome');
const ebayListPage = require('../pageObjects/ebayListPage');
const ebayItemPage = require('../pageObjects/ebayItemPage');
const ebayCart = require('../pageObjects/ebayCart');
const chai = require('chai');
const expect = chai.expect;

// Define a list of items to search for and add to cart
const ITEMS = ['spork', 'lego'];

ITEMS.forEach(function (searchItem) {
    'use strict';

    let itemTitle;

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

            it('Then the search box should allow text to be entered', function () {
                ebayHome.homeSearchInput.setValue(searchItem);
                expect(ebayHome.homeSearchInput.getValue()).to.equal(searchItem);
            });

            it('Then clicking search should navigate to a new page', function () {
                ebayHome.searchButton.click();
                expect(browser.url().value).to.not.equal(ebayHome.url());
            });
        });

        describe('When the user has performed a search', function () {

            it('Then the search results page should be shown', function () {
                expect(browser.url().value).to.contain(ebayListPage.url());

                ebayListPage.searchResultsPageMainContent.waitForVisible();
                expect(ebayListPage.searchResultsPageMainContent.isVisible()).to.be.true;
            });

            it('Then items matching the search should be listed', function () {
                const results = ebayListPage.searchItemsTitle.value;
                const numResults = results.length;

                itemTitle = ebayListPage.getNthTitle(0);
                expect(numResults).to.be.above(0);
                expect(itemTitle.toLowerCase()).to.contain(searchItem);
            });

            it('Then the user should be able to add the item to the cart', function () {
                ebayListPage.selectNthItem(1);

                // Sometimes ebay shows a modal instead of navigating to the item page
                // Ebay may be identifying the automated tests and performing some kind of spoofing
                // Allow time for a modal to be shown and click the link to proceed to the item if so
                browser.pause(1000);

                if (browser.isVisible('.lens-modal')) {
                    browser.click('.cart-add-btn');

                    browser.waitForVisible('.cart-added-btn');
                    browser.click('.cart-added-btn');

                } else {
                    ebayItemPage.addToCartButton.waitForVisible();
                    ebayItemPage.addToCartButton.click();
                }

            });
        });
    });

    describe('When the user adds an item to cart', function () {
        it('Then the ebay cart page should be shown', function () {
            expect(browser.url().value).to.contain(ebayCart.url());
        });

        it('Then the same item title as selected should be shown', function () {
            const els = ebayCart.cartTitles();

            let match = false;
            els.forEach(function (el) {
                if (browser.elementIdText(el.ELEMENT).value === itemTitle) {
                    match = true;
                }
            })
            expect(match, `expected ${itemTitle}`).to.be.true;
        });

    });
});
