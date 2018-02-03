# Repro hapi stream

> Reproduce stream testing problem with hapi

The goal is to make an automated test that uses hapi's [`server.inject()`](https://github.com/hapijs/hapi/blob/master/API.md#server.inject()) to ensure our [`POST /cats` upload API](https://github.com/sholladay/repro-hapi-stream/blob/master/lib/route/cats.js) works correctly. The API expects a form with an image field, which the route handler wants to receive as a stream.

The problem is that while hapi does behave correctly when receiving a request from the browser, it doesn't seem to stream the file to the route handler when using `server.inject()`. In fact, it seems to exit the process prematurely. This makes it impossible to test the route.

See the instructions below to reproduce this behavior with the included test cases.

## Install

```sh
git clone git@github.com:sholladay/repro-hapi-stream.git &&
cd repro-hapi-stream &&
npm install
```

## Testing

### Manual test (works as expected)

This test demonstrates a basic file upload form, which hapi correctly decodes and provides to the route handler with file metadata (such as headers) on the file stream.

1. Start the server via `npm start`
2. Visit the index page (i.e. `http://localhost:3000`).
3. Use the form to submit a PNG image. You can use the one at [lib/static/cat.png](https://github.com/sholladay/repro-hapi-stream/blob/master/lib/static/cat.png) for convenience.

### Automated test (fails for some reason)

This test demonstrates our inability to simulate a file upload within a test, due to bugs or limitations in hapi's `inject()` implementation.

Run `npm test`.

One failure will appear, which will indicate that the test's Promise never resolved. This happens because hapi's `inject()` method seems to terminate the process prematurely. [AVA](https://github.com/avajs/ava) detects that the process exited before the test completed and reports this error.

## License

[MPL-2.0](https://github.com/sholladay/repro-hapi-stream/blob/master/LICENSE "License for repro-hapi-stream") © [Seth Holladay](https://seth-holladay.com "Author of repro-hapi-stream")
