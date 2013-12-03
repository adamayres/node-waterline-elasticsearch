/**
 * Node Model
 *
 */
module.exports = {
  "attributes": {
    name: "string",
    version: "string",
    tagline: "string",
    hostname: "string",
    transport_address: "string",
    plugins: {
      "type": "object"
    }
  }
}
