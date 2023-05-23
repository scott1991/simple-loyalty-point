import express from 'express';
const router = express.Router();
import { UserPoint } from '../models/userPoint.js';

router.get('/:phone', async (req, res) => {
  const phone = req.params.phone;
  if (!phone) {
    return res.status(400).send('phone is required');
  }
  const userPoint = await UserPoint.findOne({ phone:phone });
  if (!userPoint) {
    return res.status(404).send('UserPoint not found');
  }
  res.json({phone:userPoint.phone,totalPoint:userPoint.point});
});

export default router;