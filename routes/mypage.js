const { Router } = require('express');
const router = Router();
const UserModel = require('../models/UserModel');
const passport = require('passport');

/* 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 */
passport.serializeUser((user, done) => {
	console.log('serializeUser');
	done(null, user);
});

passport.deserializeUser((user, done) => {
	UserModel.findOne({id: user.id}, (err, result) => {
		done(null, result);
	});
});
/* // 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 */

const required = (req, res, next) => {
  if (req.user) { 
    next() 
  } else { 
    res.send('로그인안하셨는데요?') 
  } 
};

router.get('/', required, (req, res) => {
	console.log(req.user); //로그인 할때마다 사용자 정보다 여기다 다 담겨있습니다.
  res.render('mypage.ejs', {user: req.user}) 
});



module.exports = router;