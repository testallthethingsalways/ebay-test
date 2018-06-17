class Page {
    constructor(title) {
        this.title = (typeof title !== 'undefined') ?  title : 'Base Page';
    }
    reloadLocation() {
        browser.execute(function () {
            window.location.reload();
        });
    }
}
module.exports = Page;
