const { Router } = require('express');
const router = Router();
const todoModel = require('../models/todoModel');

router.get('/', function(req,res){
	res.render('index')
});

module.exports = router;