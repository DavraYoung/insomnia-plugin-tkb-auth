const Base64   = require('crypto-js/enc-base64');
const hmacSHA1 = require('crypto-js/hmac-sha1');

module.exports = function(context) {

  const request = context.request;

  const login = request.getEnvironmentVariable("TCB_LOGIN");
  const signature = request.getEnvironmentVariable("TCB_SIGN");
  const type = request.getEnvironmentVariable("TCB_SERIALIZER_TYPE");

  if (login === undefined || signature === undefined) {
    return;
  }


  const sign = Base64.stringify(hmacSHA1(request.getBodyText(), signature));
  context.request.addHeader('TCB-Header-Login', login);
  context.request.addHeader('TCB-Header-Sign', sign);
  if (type !== undefined) {
    context.request.addHeader('TCB-Header-SerializerType', type);
  }

};
