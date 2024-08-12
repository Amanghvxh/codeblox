class AIQuery {
  constructor(response) {
    this.response = response;
  }

  analyse() {
    const { query } = this.response;
    if (!query) {
      throw new Error(
        "Error from AIQuery class analyse method : No query found in the response"
      );
    }
    switch (query.type) {
      case "UPDATE": {
      }
      case "DELETE": {
      }
      case "WRITE": {
      }
      case "READ": {
      }
      case "MOVE": {
      }
    }
  }
}
