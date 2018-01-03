const router = require('express').Router()
const authentication = require('../middlewares/authentication')

const {
  getHouses,
} = require('../controllers/user')


router.get('/houses', authentication, getHouses)


module.exports = router
