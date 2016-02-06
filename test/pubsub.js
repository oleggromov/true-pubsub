var PubSub = require('../pubsub.js');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('PubSub', function () {
    var pubsub;
    var cbTest = sinon.spy();
    var cbTest2 = sinon.spy();

    before(function () {
        pubsub = new PubSub();
        pubsub.on('test', cbTest);
        pubsub.once('test-2', cbTest2);
        pubsub.emit('test', 'Argument1', 'Argument2');
    });

    it('calls callback only once', function () {
        expect(cbTest.callCount).to.equal(1);
    });

    it('doesn\'t call callback for another event', function () {
        expect(cbTest2.callCount).to.equal(0);
    });

    it('passes correct arguments to the callback', function () {
        expect(cbTest.getCall(0).args).to.deep.equal(['Argument1', 'Argument2']);
    });

    it('doesn\'t call callback after unsubscription', function () {
        pubsub.off('test', cbTest);
        pubsub.emit('test');
        expect(cbTest.callCount).to.equal(1);
    });

    it('calls subscribed via `once` callback only once', function () {
        pubsub.emit('test-2', 1);
        pubsub.emit('test-2');
        expect(cbTest2.callCount).to.equal(1);
    });

    it('passes arguments to the `once` callback correctly', function () {
        expect(cbTest2.getCall(0).args).to.deep.equal([1]);
    });
});
