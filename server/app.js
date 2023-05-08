import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import addRecord from './routes/addRecord.js';
import confirmAmount from './routes/confirmAmount.js';
import confirmPhone from './routes/confirmPhone.js';
import { fileURLToPath } from 'url';
import cors from 'cors';

//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(new URL('../spa', import.meta.url).pathname));

app.use('/', indexRouter);
app.use('/addRecord', addRecord);
app.use('/confirmAmount', confirmAmount);
app.use('/confirmPhone', confirmPhone);

export default app;
