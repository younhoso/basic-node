const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

//flash  메시지 관련
const flash = require('connect-flash');

//MongoDB 접속
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log('mongodb connect');
});

//라우터 경로를 가져온다.
const home = require('./routes/home');
const write = require('./routes/write');
const list = require('./routes/list');
const detail = require('./routes/detail')
const accounts = require('./routes/accounts')
const mypage = require('./routes/mypage')
const file = require('./routes/file')

const app = express();

const { PORT, MONGO_URI } = process.env;
mongoose
.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

app.use(methodOverride('_method'));
// 확장자가 ejs 로 끈나는 뷰 엔진을 추가한다.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 셋팅
app.use(bodyParser.urlencoded({ extended: true }));

//static path 추가
app.use('/static', express.static('static'));

//session 관련 셋팅
const sessionMiddleWare = session({
  secret: '비밀코드',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2000 * 60 * 60 //지속시간 2시간
  }
});
app.use(sessionMiddleWare);
//passport 적용
app.use(passport.initialize());
app.use(passport.session());

//플래시 메시지 관련
app.use(flash());

// Routing 미들웨어
app.use('/', home);
app.use('/write', write);
app.use('/list', list);
app.use('/detail', detail);
app.use('/accounts', accounts);
app.use('/mypage', mypage);
app.use('/file', file);

app.listen(`${PORT}`, () => {
  console.log(`Example app listening on port! http://localhost:${PORT}`);
});