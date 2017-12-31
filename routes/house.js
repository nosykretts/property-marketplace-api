const router = require('express').Router()

const {
  getHouses,
  getHouse,
  createHouse,
  updateHouse,
  deleteHouse,
  searchHouse,
} = require('../controllers/house')

router.get('/', getHouses)
router.post('/', createHouse)
router.get('/:id', getHouse)
router.put('/:id', updateHouse)
router.delete('/:id', deleteHouse)
router.post('/search', searchHouse)


module.exports = router
