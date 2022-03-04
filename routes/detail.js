const { Router } = require('express');
const router = Router();
const todoModel = require('../models/todoModel');

router.get('/:id', async (req, res) => {
	try {
		const data = await todoModel.findOne({id: parseInt(req.params.id)}).exec();
		res.render('products/detail',{'detail_data': data})
		if(!data){
			res.status(404).redirect('/notPage')
		}
	} catch (e) {
		res.status(500).json({
      message: "User 조회 실패",
    });
	}
});

module.exports = router;