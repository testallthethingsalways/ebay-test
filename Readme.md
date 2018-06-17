## Approach
Use webdriverIO which supports mutiple browsers running in parallel. If multiple browsers in parallel was not an option I would have liked to have tried https://www.cypress.io/ or https://github.com/prismagraphql/chromeless which I have yet to use
yarn is used to manage the node dependencies
```
yarn add webdriverIO
yarn add chai
```

Java is required. Java 10 is not yet supported by selenium server
```
brew tap caskroom/versions
brew cask install java8
```

The test iterates over a defined list of items to be searched for to avoid repeating test cases.
The test uses the page object pattern

The test should make more assertions. I would have liked to assert on the seller, price and item being consistent thoughout the user journey. It would be much better to have tracked the item used an item reference rather than the title text. I could get the item number on the cart page but it was not immediately obvious how to get this on the list/item page.
Sometimes when selecting an item from the list view, ebay sent the user to the item view. Other times selecting an item instead showed a modal. The test attempts to handle both scenarios.

Methods like getFirstTitle and selectFirstItem should be configurable like getNthTitle()

# Execution
`./node_modules/.bin/wdio`
NB the initial test run is slow as the selenium server is being downloaded

## How to execute and be ready to be deployed on a CI server.
The tests can be run on any server which has java, node, yarn, chrome, firefox.
To run on a CI server like travis, I would ensure the target machine had all the required dependencies

By integrating travis with github a simple .travis.yml file can run the tests whenever a pr is created:

```
language: node
install: yarn
script: ./node_modules/.bin/wdio
```