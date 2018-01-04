

const HouseModel = require('../models/house')
const boom = require('boom')

module.exports = {
  getHouses: function(req, res, next) {
    
    let opt = {}
    if (req.query.search){
      let regex = new RegExp(req.query.search,'i');
      opt = {$or : [
        {address: regex},
        {title: regex}
      ]}
    }

    HouseModel.find(opt)
      .sort({createdAt: 'desc'})
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
      near: { type: 'point', coordinates: [lng, lat] },
      maxDistance: req.body.distance,
      spherical: true,
      distanceField: 'distance',
    })
    newQuery.exec(function(err, docs) {
      if (err) {
        res.json(err)
      } else {
        res.json(docs)
      }
      // console.log('ERR: ' + err)
      // console.log('Docs: ' + docs)
    })
  },
  getHouse: function(req, res, next) {
    HouseModel.findById(req.params.id)
      .populate('creator')
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

}
