const express = require('express');
const router   = express.Router();

const apiController = require('../controller/apiController');
const validate = require('../util/validation');

//Index page (static HTML)
router.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

router.route('/api/imagesearch/:searchVal?')
    .get(validate.searchVal(), validate.offset(), apiController.getSearchImage);

router.route('/api/latest/imagesearch')
    .get(apiController.getRecentSearches);

module.exports = router;