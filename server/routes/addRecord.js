import express from 'express';
let router = express.Router();
import { SaleRecord } from '../models/saleRecord.js';
const env = process.env.NODE_ENV || 'development';
import config_json from "../config.json" assert { type: "json" };
import { UserPoint } from '../models/userPoint.js';
const CONFIG = config_json[env];
/* GET home page. */
router.post('/', async function (req, res, next) {
  const body = req.body ;
  if (!body.phone || !body.amount) {
    var error = {
      message: 'invalid parameter',
      errors: ['invalid parameter.'],
    };
    console.error(error);
    return res.status(400).send(error);
  } else {
    let point = Math.floor(body.amount / CONFIG.pointRate);
    try {
      let doc = await SaleRecord.create({phone:body.phone,amount:body.amount,point:point}) ;
      console.log("SaleRecord created",doc);
      let docUserPoint = await UserPoint.findOne({phone:body.phone});
      console.log("UserPoint found",docUserPoint);
      res.json({phone:body.phone, point:doc.point, totalPoint:docUserPoint.point});
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

export default router;
