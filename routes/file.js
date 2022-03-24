const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('xhr.ejs') 
});

router.post('/upload-file', (req, res) => {
	res.json({
		'massage':'성공'
	})
});

module.exports = router;