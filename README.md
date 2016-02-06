== PubSub
The simpliest possible PubSub module. Supports:

* Subscription for events via `on(event, callback)` interface.
* Unsubscription via `off(event, callback)`.
* Emitting events by means of `emit(event, ...arguments)` (no to be confused with Spread operator of ES6).