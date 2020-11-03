# Streams

## Main Idea
**Streams** are an input/output utility that allow reads/writes to be preformed asynchronously; by only reading/writing a buffers worth at a time. 

Under the hood, **Streams** are implemented using [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

## Use Cases

* Networking - Or any variable speed read/write data source

## Common Errors

* Applying incorrectly - Using to read files when files sizes are known, small, and asynchronicity is not required. https://whistlr.info/2020/nodejs-streams/#speed-comparison

## Examples

* [Using](./example-01-using.js)

## References

* [Node Docs](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_stream)
