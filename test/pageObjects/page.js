class Page {
    constructor(title) {
        this.title = (typeof title !== 'undefined') ?  title : 'Base Page';
    }
}
module.exports = Page;
