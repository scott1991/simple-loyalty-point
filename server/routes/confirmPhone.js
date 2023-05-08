import socketioService from "../service/socketioService.js";
import express from 'express';
const router = express.Router();

// POST / use socketioService.sendMsgToRoom to send msg to Employee
router.post('/', (req, res) => {
  if (req.body && req.body.phone) {
    socketioService.sendMsgToRoom('Employee', 'customer.confirmPhone', req.body.phone);
    res.send('ok');
  }
  else { // return 400
    res.status(400).send('bad request');
  }
});
export default router;