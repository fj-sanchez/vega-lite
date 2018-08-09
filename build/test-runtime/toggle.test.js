"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var vega_util_1 = require("vega-util");
var util_1 = require("./util");
var hits = {
    qq: [8, 19, 13, 21],
    qq_clear: [5, 16],
    bins: [4, 29, 16, 9],
    bins_clear: [18, 7],
    composite: [1, 3, 5, 7, 8, 9]
};
function toggle(key, idx, shiftKey, parent) {
    var fn = key.match('_clear') ? 'clear' : 'pt';
    return "return " + fn + "(" + hits[key][idx] + ", " + vega_util_1.stringValue(parent) + ", " + !!shiftKey + ")";
}
describe('Toggle multi selections at runtime', function () {
    var type = 'multi';
    var embed = util_1.embedFn(browser);
    var testRender = util_1.testRenderFn(browser, 'multi/toggle');
    it('should toggle values into/out of the store', function () {
        embed(util_1.spec('unit', 0, { type: type }));
        browser.execute(toggle('qq', 0, false));
        browser.execute(toggle('qq', 1, true));
        var store = browser.execute(toggle('qq', 2, true)).value;
        chai_1.assert.lengthOf(store, 3);
        testRender('click_0');
        store = browser.execute(toggle('qq', 2, true)).value;
        chai_1.assert.lengthOf(store, 2);
        testRender('click_1');
        store = browser.execute(toggle('qq', 3, false)).value;
        chai_1.assert.lengthOf(store, 1);
        testRender('click_2');
    });
    it('should clear out the store w/o shiftKey', function () {
        embed(util_1.spec('unit', 1, { type: type }));
        browser.execute(toggle('qq', 0, false));
        browser.execute(toggle('qq', 1, true));
        browser.execute(toggle('qq', 2, true));
        browser.execute(toggle('qq', 3, true));
        testRender("clear_0");
        var store = browser.execute(toggle('qq_clear', 0, true)).value;
        chai_1.assert.lengthOf(store, 4);
        testRender("clear_1");
        store = browser.execute(toggle('qq_clear', 1, false)).value;
        chai_1.assert.lengthOf(store, 0);
        testRender("clear_2");
    });
    it('should toggle binned fields', function () {
        embed(util_1.spec('unit', 0, { type: type, encodings: ['x', 'y'] }, { x: { bin: true }, y: { bin: true } }));
        browser.execute(toggle('bins', 0, false));
        browser.execute(toggle('bins', 1, true));
        var store = browser.execute(toggle('bins', 2, true)).value;
        chai_1.assert.lengthOf(store, 3);
        testRender('bins_0');
        store = browser.execute(toggle('bins', 2, true)).value;
        chai_1.assert.lengthOf(store, 2);
        testRender('bins_1');
        store = browser.execute(toggle('bins', 3, false)).value;
        chai_1.assert.lengthOf(store, 1);
        testRender('bins_2');
    });
    util_1.compositeTypes.forEach(function (specType, idx) {
        it("should toggle in " + specType + " views", function () {
            embed(util_1.spec(specType, idx, { type: type, resolve: 'union' }));
            var length = 0;
            for (var i = 0; i < hits.composite.length; i++) {
                var parent_1 = util_1.parentSelector(specType, i % 3);
                var store = browser.execute(toggle('composite', i, true, parent_1)).value;
                chai_1.assert.equal((length = store.length), i + 1);
                if (i % 3 === 2) {
                    testRender(specType + "_" + i);
                }
            }
            for (var i = 0; i < hits.composite.length; i++) {
                var even = i % 2 === 0;
                var parent_2 = util_1.parentSelector(specType, ~~(i / 2));
                var store = browser.execute(toggle('qq_clear', 0, even, parent_2)).value;
                chai_1.assert.lengthOf(store, even ? length : (length = length - 2), "iter: " + i);
                if (!even) {
                    testRender(specType + "_clear_" + i);
                }
            }
        });
    });
});
//# sourceMappingURL=toggle.test.js.map