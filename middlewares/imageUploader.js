require('dotenv').config()
const Multer = require('multer')
const Storage = require('@google-cloud/storage')

const storage = Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEYFILE_PATH,
})
const bucketName = process.env.BUCKET_NAME

const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${bucketName}/${filename}`
}

function uploadOnePromise(multerFileObj) {
  const bucket = storage.bucket(bucketName)
  const newFilename = Date.now() + multerFileObj.originalname
  const newFile = bucket.file('userupload/' + newFilename)
  return new Promise((resolve, reject) => {
    newFile
      .save(multerFileObj.buffer, {
        metadata: {
          contentType: multerFileObj.mimetype,
        },
      })
      .then(() => newFile.makePublic())
      .then(resolve(getPublicUrl(newFilename)))
      .catch(reject)
  })
}

const uploadAllFilesToGCS = (req, res, next) => {
  if (!req.files || req.files.length == 0) {
    return next(new Error('no files bro'))
  }
  console.log(req.files)
  Promise.all(req.files.map(file => uploadOnePromise(file)))
    .then(imagePublicUrls => {
      res.json(imagePublicUrls)
      // req.body.photos.join(imagePublicUrls)
      // next()
    })
    .catch(next)
}

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

module.exports = {
  multer,
  uploadAllFilesToGCS,
}
