const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});
//Exercise is a subclass of the class Model which is (mongoose.model)
//mongoose.modal() creates a subclass of the Modal class
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
/**
 * A Model is a class that's your primary tool for interacting with MongoDB.
 * An instance of a Model is called a [Document](./api.html#Document).
 *
 * In Mongoose, the term "Model" refers to subclasses of the `mongoose.Model`
 * class. You should not use the `mongoose.Model` class directly. The
 * [`mongoose.model()`](./api.html#mongoose_Mongoose-model) and
 * [`connection.model()`](./api.html#connection_Connection-model) functions
 * create subclasses of `mongoose.Model` as shown below.
 *
 * ####Example:
 *
 *     // `UserModel` is a "Model", a subclass of `mongoose.Model`.
 *     const UserModel = mongoose.model('User', new Schema({ name: String }));
 *
 *     // You can use a Model to create new documents using `new`:
 *     const userDoc = new UserModel({ name: 'Foo' });
 *     await userDoc.save();
 *
 *     // You also use a model to create queries:
 *     const userFromDb = await UserModel.findOne({ name: 'Foo' });**/
