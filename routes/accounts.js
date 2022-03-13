const { Router } = require('express');
const router = Router();
const UserModel = require('../models/UserModel');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 */
passport.serializeUser((user, done) => {
	console.log('serializeUser');
	done(null, user);
});

passport.deserializeUser((user, done) => {
	var result = user;
	result.password = "";
	console.log('deserializeUser');
	done(null, result);
});
/* // 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 */

/* 어떻게 인증할건지 세부 코드를 작성 */
passport.use(new LocalStrategy({
		usernameField: 'id',
		passwordField: 'pw',
		session: true,
		passReqToCallback: false
	}, 
	function (id, pw, done) {
		UserModel.findOne({id}, function(err, user) {
			if (err) return done(err)
			if (!user) return done(null, false, { message: '존재하지않는 아이디요' })
			if (pw == user.pw) {
				return done(null, user)
			} else {
				return done(null, false, { message: '비번틀렸어요' })
			}
		});
	}
));
/* // 어떻게 인증할건지 세부 코드를 작성 */

router.get('/fail',(req, res) => {
	res.send('로그인 실패')
});

router.get('/login',(req, res) => {
	res.render('login.ejs')
});

router.post('/login', passport.authenticate('local', { 
	failureRedirect: '/fail'
}), (req, res) => {
	res.send('<script>alert("로그인 성공");\
	location.href="/";</script>');
});

module.exports = router;