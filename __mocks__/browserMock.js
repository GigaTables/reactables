Object.defineProperty(document, 'CSVLink', {
    // value: document.createElement('a'),
    createElement: (val) => {
        return document.createElement(val)
    }
});

const constantDate = new Date('2018-03-23T04:41:20')

Date = class extends Date {
    constructor() {
        super();
        return constantDate
    }
}
