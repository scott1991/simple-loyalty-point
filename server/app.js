import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import addRecord from './routes/addRecord.js';
import { fileURLToPath } from 'url';

//const __filename = new URL('', import.meta.url).pathname;
//const __dirname = new URL('.', import.meta.url).pathname;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(new URL('../spa', import.meta.url).pathname));

app.use('/', indexRouter);
app.use('/addRecord', addRecord);

export default app;
