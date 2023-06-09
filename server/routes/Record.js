import express from 'express';
const router = express.Router();
import { SaleRecord } from '../models/saleRecord.js';

import { UserPoint } from '../models/userPoint.js';
import socketioService from "../service/socketioService.js";
import CONFIG from "../getConfig.js"


/* GET home page. */
router.post('/add', async function (req, res, next) {
  const body = req.body;
  if (!body.phone || !body.amount) {
    var error = {
      message: 'invalid parameter',
      errors: ['invalid parameter.'],
    };
    console.error(error);
    return res.status(400).send(error);
  } else {
    let point = Math.floor(body.amount / CONFIG.pointRate); // calc point with rate(in config)
    try { // create a record , hook would add total points in UserPoint, then get total points from there
      let doc = await SaleRecord.create({ phone: body.phone, amount: body.amount, point: point });
      console.log("SaleRecord created", doc);

      let docUserPoint = await UserPoint.findOne({ phone: body.phone });
      console.log("UserPoint found", docUserPoint);

      socketioService.broadcast('server.addRecord', { phone: body.phone, point: doc.point, totalPoint: docUserPoint.point });
      res.json({ phone: body.phone, point: doc.point, totalPoint: docUserPoint.point }); // merge record and total
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.post('/consumePoints', async function (req, res, next) {
  // check if user has enough points, if not return error, if yes add  which is a minus points record
  const body = req.body;
  if (!body.phone || !body.point) {
    var error = {
      message: 'invalid parameter',
      errors: ['invalid parameter.'],
    };
    console.error(error);
    return res.status(400).send(error);
  } else {
    try {
      // check if user has enough point
      let pointDoc = await UserPoint.findOne({ phone: body.phone });
      if (pointDoc.point < body.point) {
        return res.status(400).json({ message: "not enough points" });
      }
      // a Record
      let recordDoc = await SaleRecord.create({ phone: body.phone, amount: 0, point: (body.point * -1) });
      console.log("SaleRecord created", recordDoc);
      // check user point and broadcast
      let pointDocAfter = await UserPoint.findOne({ phone: body.phone });
      socketioService.broadcast('server.consumePoints', { phone: body.phone, point: (body.point * -1), totalPoint: pointDocAfter.point });
      res.json({ phone: body.phone, point: body.point, totalPoint: pointDocAfter.point });
    }

    catch (error) {
      res.status(500).json(error);
    }
  }
});


export default router;
