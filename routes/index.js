var express = require('express');
var router = express. Router();

// route for home page accepting a GET. Note it will be localhost:3000
router.get('/', function(req, res, next){
	// res.send('INDEX PAGE -2');
	res.render('index.html');
});

// export router so that we can access this from other files
module.exports = router;