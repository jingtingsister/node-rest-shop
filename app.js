// youtube 教學： https://www.youtube.com/watch?v=ucuNgSOFDZ0&index=14&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q
// MongoDB Altas: https://cloud.mongodb.com/user?n=%2Fv2%2F5c3d6fedd5ec13986701816f&nextHash=%23clusters#/atlas/login 帳號jingting0722@gmail.com 密碼Ss0933153155!
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(
  'mongodb://jingtingSister:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop-shard-00-00-1aoln.mongodb.net:27017,node-rest-shop-shard-00-01-1aoln.mongodb.net:27017,node-rest-shop-shard-00-02-1aoln.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true')
mongoose.Promise = global.Promise;
// middleware
// app.use((req, res, next)=> {
//   res.status(200).json({
//     message: 'first api works!!!!!!'
//   });
// });

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next)=>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})

// handle all error
app.use((error, req, res, next)=>{
   res.status(error.status || 500)
   res.json({
      error: {
        message: error.message
      }
   });
});

module.exports = app;
