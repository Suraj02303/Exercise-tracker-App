const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
//conncet to mongooose database
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
  return next();
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
//useNewUrlParser and useCreateIndex are flags 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });
const conn = mongoose.connection;


//view engine setup
//app.set("setting", value) /** here we assign setting to value**/
//app.set('views' ,path.join(__dirname, 'views'));
app.set("view engine", "jade");

// //app.use('/uploads', express.static('uploads'));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));




conn.once('open', ()=>{
	console.log("Mongodb database connection established successfully");
});


const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter); // this line says if the req comes with '/exercises' path then this middleware(exerciseRouter) is invoked(called)
app.use('/users', userRouter); // this line says that when req comes for '/users' path then this middleware(userRouter) is called        

app.listen(port, () =>{
 	console.log(`Server is running on port: ${port}`);
});

/**The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application.
Syntax
app.use(path, callback)
Parameters:

path: It is the path for which the middleware function is being called. It can be a string representing a path or path pattern or regular expression pattern to match the paths.
callback: It is a middleware function or a series/array of middleware functions.
**/

/**app.use(path, middleware) is used to call middleware function that needs to be called before the route is hit for the corresponding path. Multiple middleware functions can be invoked via an app.use.

app.use(‘/fetch’, enforceAuthentication) -> enforceAuthentication middleware fn will be called when a request starting with ‘/fetch’ is received. It can be /fetch/users, /fetch/ids/{id}, etc

Some middleware functions might have to be called irrespective of the request. For such cases, a path is not specified, and since the the path defaults to / and every request starts with /, this middleware function will be called for all requests.
**/