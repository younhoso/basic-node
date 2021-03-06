const { Router } = require('express');
const router = Router();
const todoModel = require('../models/todoModel');

router.get('/', (_, res) => {
	todoModel.find({}).exec()
	.then(data => res.render('home',{'all_datas': data}))
	.catch(err => res.status(500).send(err))
});

module.exports = router;