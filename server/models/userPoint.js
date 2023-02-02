import mongoose from 'mongoose';
const { Schema } = mongoose;

const schema = new Schema({
  phone:  String, // String is shorthand for {type: String}
  point: Number
});

// schema.post('findOneAndUpdate', function (doc,next) {
//   console.log("post UserPoint findOneAndUpdate");
//   next();
// });

export const UserPoint = mongoose.model('UserPoint', schema);