var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('food.db');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
router.get('/food/:category', (req, res) => {
  const { category } = req.params;

  // Query the database
  db.all('SELECT * FROM food WHERE category COLLATE NOCASE = ?', [category], (err, rows) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log(rows)
          res.json(rows); // Send all rows matching the category
      }
  });
});

module.exports = router;
