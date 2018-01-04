const router = require('express').Router()
const authentication = require('../middlewares/authentication')

const {
  getHouses,
  getHouse,
  updateHouse,
  deleteHouse,
  searchHouse,

} = require('../controllers/house')

router.get('/', getHouses)
router.post('/search', searchHouse)
router.get('/:id', getHouse)
// router.put('/:id', updateHouse)
// router.delete('/:id', deleteHouse)



module.exports = router
