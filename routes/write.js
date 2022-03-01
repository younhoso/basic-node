const { Router } = require('express');
const router = Router();
const todoModel = require('../models/todoModel');

router.get('/' , (_, res) => {
	res.render('admin/write');
});

router.post('/' , (req, res) => {	
	const product = new todoModel(req.body);
	if(!product.validateSync()){
		product.save()
		.then(data => res.redirect('/write'))
		.catch(err => res.status(500).send(err))
	}
});

module.exports = router;