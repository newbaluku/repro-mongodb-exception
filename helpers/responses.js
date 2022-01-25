class Responses {
  constructor() {
    this.headers = {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    };
  }

  ok(data = {}) {
    return {
      statusCode: 200,
      headers: this.headers,
      body: JSON.stringify(data)
    };
  }

  invalidArgument(data = {}) {
    return {
      statusCode: 400,
      headers: this.headers,
      body: JSON.stringify(data)
    };
  }

  unauthorized() {
    return {
      statusCode: 401,
      headers: this.headers,
      body: 'Unauthorized'
    };
  }

  forbidden() {
    return {
      statusCode: 403,
      headers: this.headers,
      body: 'Forbidden'
    };
  }
  internalServerError(data = {}) {
    return {
      statusCode: 500,
      headers: this.headers,
      body: JSON.stringify(data)
    };
  }
}

module.exports = new Responses;