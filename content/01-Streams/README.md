---
title: JSNAD Study Guide - Streams
---

# Streams

## Main Idea

**Streams** are an input/output utility that allow reads/writes to be preformed asynchronously; by only reading/writing a buffers worth at a time.

Under the hood, **Streams** are implemented using [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

## Use Cases

- Networking - Or any variable speed read/write data source (in networking this is due to network speed)

## Common Errors

- Applying incorrectly - Using to read files when files sizes are known, small, and asynchronicity is not required. https://whistlr.info/2020/nodejs-streams/#speed-comparison

## Examples

- [Using](./example-01-using.js)

<iframe
  src="https://codesandbox.io/s/8f0bl?codemirror=1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## References

- [Node Docs](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_stream)
