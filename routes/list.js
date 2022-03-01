const { Router } = require('express');
const router = Router();
const todoModel = require('../models/todoModel');

router.get('/' , (_, res) => {
	todoModel.find({}).exec()
	.then(data => res.render('products/list',{'all_datas': data}))
	.catch(err => res.status(500).send(err))
});

router.delete('/delete', (req, _) => {
	console.log(req.body)
})

module.exports = router;