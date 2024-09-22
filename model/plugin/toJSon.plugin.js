const toJson = (schema) => {
  schema.virtual(id).get(function () {
    return this._id;
  });
  schema.set("toJSON", { virtual: true });
};


module.exports = toJson