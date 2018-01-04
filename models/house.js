const mongoose = require('mongoose')
const Schema = mongoose.Schema

let houseSchema = new Schema(
  {
    creator : {
      type : Schema.Types.ObjectId,
      ref : 'User',
      required : true
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    photos : {
      type: [String]
    },
    address : {
      type: String
    },
    loc: {
      type: { type: String },
      coordinates: []
    },    
    price: {
      type: Number
    },
    surfaceArea: {
      type: Number
    },
    buildingArea: {
      type: Number
    },
    roomCount: {
      type: Number
    },
    toiletCount: {
      type: Number
    },
    maidRoomCount: {
      type: Number
    },
    floorCount: {
      type: Number
    },
    garageCount: {
      type: Number
    },
    carportCount: {
      type: Number
    },
    certification: {
      type: String
    },
    facilities: {
      type: [String]
    },
    contact:{
      name :{
        type : String
      },
      phoneNumber : {
        type : String
      }
    }
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)


houseSchema.index({ "loc": "2dsphere" });

module.exports = mongoose.model('House', houseSchema)
