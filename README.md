# PubSub
The simpliest possible PubSub module. Supports:

* Subscription for events via `on(event, callback)` interface.
	* and also via `once(event, callback)`.
* Unsubscription via `off(event, callback)`.
* Emitting events by means of `emit(event, ...arguments)` (not to be confused with Spread operator of ES6, just ordinary arguments of any count passing).

## TODO
* Throw clear errors in unexpectable cases
* Think out a way to distinguish methods of different instances of one class passed as arguments