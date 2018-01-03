require('dotenv').config()
const Multer = require('multer')
const Storage = require('@google-cloud/storage')

const storage = Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEYFILE_PATH
})

const bucket = storage.bucket(process.env.BUCKET_NAME)
