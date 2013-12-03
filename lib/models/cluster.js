/**
 * Cluster Model
 *
 */
module.exports = {
  attributes: {
    name: "string",
    health: "string",
    status: "string",
    nodes: {
      "type": "array"
    }
  }
}
