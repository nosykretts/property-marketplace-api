const HouseModel = require('../models/house')
const boom = require('boom')

module.exports = {
  getHouses: function(req, res, next) {
    HouseModel.find()
      .then(houses =>
        res.status(200).json({
          message: 'Houses get success',
          data: houses,
        })
      )
      .catch(err => next(boom.boomify(err)))
  },
  searchHouse: function(req, res, next) {
    // res.json(req.body.longlat)
    let lng = req.body.longlat[0]
    let lat = req.body.longlat[1]
    let newQuery = HouseModel.aggregate().near({
      near: {type: 'point', coordinates: [lng, lat]},
      maxDistance: req.body.distance ,
      spherical: true,
      distanceField: 'distance',
    })
    newQuery.exec(function(err, docs) {
      if(err){
        res.json(err)
      }else{
        res.json(docs)
      }
      // console.log('ERR: ' + err)
      // console.log('Docs: ' + docs)

    })
  },
  getHouse: function(req, res, next) {
    HouseModel.findById(req.params.id)
      .then(house => {
        if (house) {
          res.status(200).json({
            message: 'House get success',
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
  createHouse: function(req, res, next) {
    let b = req.body
    let newHouse = new HouseModel({
      title: b.title,
      description: b.description,
      price: b.price,
      surfaceArea: b.surfaceArea,
      buildingArea: b.buildingArea,
      roomCount: b.roomCount,
      toiletCount: b.toiletCount,
      maidRoomCount: b.maidRoomCount,
      floorCount: b.floorCount,
      garageCount: b.garageCount,
      carportCount: b.carportCount,
      certification: b.certification,
      facilities: b.facilities,
    })
    newHouse
      .save()
      .then(house => {
        res.status(200).json({
          message: 'House successfully created',
          data: house,
        })
      })
      .catch(err => next(boom.boomify(err)))
  },
  updateHouse: function(req, res, next) {
    let b = req.body
    HouseModel.findByIdAndUpdate(
      req.params.id,
      {
        title: b.title,
        description: b.description,
        price: b.price,
        surfaceArea: b.surfaceArea,
        buildingArea: b.buildingArea,
        roomCount: b.roomCount,
        toiletCount: b.toiletCount,
        maidRoomCount: b.maidRoomCount,
        floorCount: b.floorCount,
        garageCount: b.garageCount,
        carportCount: b.carportCount,
        certification: b.certification,
        facilities: b.facilities,
      },
      { new: true } // return new updated document
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
    HouseModel.findByIdAndRemove(req.params.id)
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
