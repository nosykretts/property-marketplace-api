const HouseModel = require('../models/house')
const boom = require('boom')

function reqBodyToMongoose(req) {
  let b = req.body
  let photos = []
  if(b.photos && b.photos.length > 0){
    photos = b.photos
  }
  if(req.newPhotos && req.newPhotos.length > 0){
    photos = [].concat(req.newPhotos, photos)
  }
  console.log(photos)
  return {
    title: b.title,
    description: b.description,
    price: Number(b.price),
    certification: b.certification,
    surfaceArea: Number(b.surfaceArea),
    buildingArea: Number(b.buildingArea),
    floorCount: Number(b.floorCount),
    roomCount: Number(b.roomCount),
    toiletCount: Number(b.toiletCount),
    maidRoomCount: Number(b.maidRoomCount),
    garageCount: Number(b.garageCount),
    carportCount: Number(b.carportCount),
    facilities: b.facilities,
    photos:photos,
    contact : {
      name : b.contactName,
      phoneNumber : b.contactPhoneNumber,
    },
    loc : {
      type : 'Point',
      coordinates : [Number(b.longitude), Number(b.latitude)]
    },
    address : b.address
  }
}

module.exports = {
  getHouses: function(req, res, next) {
    console.log(req.userId)
    HouseModel.find({
      creator: req.userId,
    })
      .sort({createdAt: 'desc'})
      .then(houses =>
        res.status(200).json({
          message: 'Houses get success',
          data: houses,
        })
      )
      .catch(err => next(boom.boomify(err)))
  },
  createHouse: (req, res, next) => {
    HouseModel.create({
      creator: req.userId,
      ...reqBodyToMongoose(req),
    })
      .then(house => {
        res.status(200).json({
          message: 'House successfully created',
          data: house,
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  updateHouse: (req, res, next) => {
    HouseModel.findOneAndUpdate(
      {
        _id: req.params.id,
        creator: req.userId,
      },
      reqBodyToMongoose(req),
      { new: true }
    )
      .then(house => {
        if (house) {
          res.status(200).json({
            message: 'House successfully updated',
            data: house,
          })
        } else {
          res.status(404).json({
            message: 'House not found',
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
  deleteHouse: function(req, res, next) {
    HouseModel.findOneAndRemove({
      _id: req.params.id,
      creator: req.userId,
    })
      .then(house => {
        if (house) {
          res.status(200).json({
            message: 'House successfully deleted',
            data: house,
          })
        } else {
          res.status(404).json({
            message: 'House not found',
          })
        }
      })
      .catch(err => next(boom.boomify(err)))
  },
}
