import mongoose from 'mongoose';
import { UserPoint } from './userPoint.js';
const { Schema } = mongoose;

const schema = new Schema({
  phone: String, // String is shorthand for {type: String}
  amount: Number,
  point: Number,
});

schema.post('save', function (doc,next) {
  let sourceData = this;
  console.log("post SaleRecord save");
  UserPoint.findOneAndUpdate(
    { phone: sourceData.phone },
    { $inc: { point: sourceData.point } },
    { upsert: true, returnNewDocument:true }
  )
  .then(()=>{
    next();
    console.log("findOneAndUpdate then");
    // setTimeout(function() {
    //   next();
    // }, 5000);
  });
});

export const SaleRecord = mongoose.model('SaleRecord', schema);
