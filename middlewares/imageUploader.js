require('dotenv').config()
const Multer = require('multer')
const Storage = require('@google-cloud/storage')

const storage = Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEYFILE_PATH,
})
const bucketName = process.env.BUCKET_NAME

const getPublicUrl = filename => {
  return `https://storage.googleapis.com/${bucketName}/userupload/${filename}`
}

<<<<<<< e559f8c9e0e41e96562e0ba34e9bec14ad846997
function getExt(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
function uploadOnePromise(multerFileObj) {
  const bucket = storage.bucket(bucketName)
  const newFilename = Date.now() + getExt(multerFileObj.originalname)
=======

>>>>>>> update
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

module.exports = {
  uploadAllFilesToGCS : (req, res, next) => {
    if (!req.files || req.files.length == 0) {
      return next()
    }
    console.log('ada file baru masuk.. hihihi', req.files)
    Promise.all(req.files.map(file => uploadOnePromise(file)))
      .then(newPhotos => {
        req.newPhotos = newPhotos
        next() /// <----EXIT
      })
      .catch(next)
  },
  multer : Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  })
}
