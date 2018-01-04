const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const {multer, uploadAllFilesToGCS} = require('../middlewares/imageUploader')
const {
  getHouses,
  createHouse
} = require('../controllers/user')



router.get('/houses', authentication, getHouses)
router.post('/houses', authentication, multer.array('newPhotos'), uploadAllFilesToGCS,  createHouse)








module.exports = router
