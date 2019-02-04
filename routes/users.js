const router = require('express').Router();
const authFilter = require('../middleware/jwt-token.filter');

/* Check user */
router.use(authFilter);

/* GET users listing. */
router.get('/', (req, res, next) => res.send('respond with a resource'));

module.exports = router;
