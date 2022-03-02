const { Router } = require('express');
const router = Router();
const todoModel = require('../models/todoModel');

router.get('/' , (_, res) => {
	todoModel.find({}).exec()
	.then(data => res.render('products/list',{'all_datas': data}))
	.catch(err => res.status(500).send(err))
});

router.delete('/delete/:id', (req, res) => {
	todoModel.deleteOne({id : parseInt(req.params.id)})
	.then(data => res.json({ message : "success" }))
	.catch(err => res.status(500).send(err))
})

module.exports = router;