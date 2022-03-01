const { Router } = require('express');
const router = Router();
const todoModel = require('../models/todoModel');

router.get('/', (_, res) => {
	todoModel.find({}, function(err, data){
		res.render('home',
			{'all_datas': data}
		);
	});
});

module.exports = router;