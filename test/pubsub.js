var PubSub = require('../pubsub.js');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('PubSub', function () {
    var pubsub;
    var cbTest;
    var cbTest2;
    var cbTest3;
    var cbTest4;

    beforeEach(function () {
        pubsub = new PubSub();
        cbTest = sinon.spy();
        cbTest2 = sinon.spy();
        cbTest3 = sinon.spy();
        cbTest4 = sinon.spy();

        pubsub.on('test', cbTest);
        pubsub.on('test', cbTest3);
        pubsub.once('test-2', cbTest2);
        pubsub.on('test-2', cbTest4);
    });

    it('calls callback only once', function () {
        pubsub.emit('test');
        expect(cbTest.callCount).to.equal(1);
    });

    it('doesn\'t call callback for another event', function () {
        pubsub.emit('test');
        expect(cbTest2.callCount).to.equal(0);
    });

    it('passes correct arguments to the callback', function () {
        pubsub.emit('test', 'Argument1', 'Argument2');
        expect(cbTest.getCall(0).args).to.deep.equal(['Argument1', 'Argument2']);
    });

    it('doesn\'t call callback after unsubscription', function () {
        pubsub.off('test', cbTest);
        pubsub.emit('test');
        expect(cbTest.callCount).to.equal(0);
    });

    it('continues to call other subscribers after another\'s unsubscription', function () {
        pubsub.off('test', cbTest);
        pubsub.emit('test');
        expect(cbTest3.callCount).to.equal(1);
    });

    it('calls subscribed via `once` callback only once', function () {
        pubsub.emit('test-2', 1);
        pubsub.emit('test-2');
        expect(cbTest2.callCount).to.equal(1);
    });

    it('passes arguments to the `once` callback correctly', function () {
        pubsub.emit('test-2', 1);
        expect(cbTest2.getCall(0).args).to.deep.equal([1]);
    });

    it('calls every callback depsite the presence of `once` which change callbacks array length', function () {
        pubsub.emit('test-2');
        expect(cbTest2.callCount).to.equal(1);
        expect(cbTest4.callCount).to.equal(1);
    });
});
