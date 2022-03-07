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
});

router.get('/edit/:id', async (req, res) => {
	try {
		const data = await todoModel.findOne({id : parseInt(req.params.id)}).exec();
		res.render('admin/edit', {post: data})
		if(!data){
			res.status(404).render('error', {'massage': '잘 못된 페이지 입니다.'});
		}
	} catch (e) {
		res.status(500).json({
      message: "data 조회 실패",
    });
	}
});

router.put('/edit', async (req, res) => {
	// 폼에담긴 제목데이터, 날짜데이터를 가지고
	try {
		await todoModel.updateOne({id: parseInt(req.body.id)},{$set: {title: req.body.title, desc: req.body.desc}}).exec();
		res.redirect('/list')
	} catch (e) {
	
	}
});

module.exports = router;