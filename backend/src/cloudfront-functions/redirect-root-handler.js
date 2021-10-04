function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Check whether the URI is missing a file name.
  if (uri.indexOf('.') === -1) {
    request.uri = '/';
  }

  return request;
}
