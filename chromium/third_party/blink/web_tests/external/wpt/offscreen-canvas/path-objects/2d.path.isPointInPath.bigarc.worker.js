// DO NOT EDIT! This test has been generated by tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.isPointInPath.bigarc
// Description:isPointInPath() works on unclosed arcs larger than 2pi
// Note:

importScripts("/resources/testharness.js");
importScripts("/2dcontext/resources/canvas-tests.js");

var t = async_test("isPointInPath() works on unclosed arcs larger than 2pi");
t.step(function() {

var offscreenCanvas = new OffscreenCanvas(100, 50);
var ctx = offscreenCanvas.getContext('2d');

ctx.arc(50, 25, 10, 0, 7, false);
_assertSame(ctx.isPointInPath(50, 10), false, "ctx.isPointInPath(50, 10)", "false");
_assertSame(ctx.isPointInPath(50, 20), true, "ctx.isPointInPath(50, 20)", "true");
_assertSame(ctx.isPointInPath(50, 30), true, "ctx.isPointInPath(50, 30)", "true");
_assertSame(ctx.isPointInPath(50, 40), false, "ctx.isPointInPath(50, 40)", "false");
_assertSame(ctx.isPointInPath(30, 20), false, "ctx.isPointInPath(30, 20)", "false");
_assertSame(ctx.isPointInPath(70, 20), false, "ctx.isPointInPath(70, 20)", "false");
_assertSame(ctx.isPointInPath(30, 30), false, "ctx.isPointInPath(30, 30)", "false");
_assertSame(ctx.isPointInPath(70, 30), false, "ctx.isPointInPath(70, 30)", "false");

t.done();

});
done();
