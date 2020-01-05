const mongoose = global.mongoose,
  CityModel = mongoose.model("City"),
  DistrictModel = mongoose.model("District"),
  StateModel = mongoose.model("State");

exports.getCities = function (req, res, next) {

  try {
    CityModel.aggregate([
      {
        $match: {
          city: { $regex: req.query.city, $options: "i" }
        }
      },
      {
        $lookup: {
          from: "districts",
          localField: "districtcode",
          foreignField: "districtcode",
          as: "District"
        }
      },
      { $unwind: "$District" },
      {
        $lookup: {
          from: "states",
          localField: "$District.statecode",
          foreignField: "statecode",
          as: "States"
        }
      },
      { $unwind: "$States" }
    ]).exec((err, list) => {
      res.send(list);
    });
  }
  catch (err) {
    res.send({ err: err, msg: err.message });
  }
};

exports.getCitiesByState = function (req, res, next) {
  // state: { "$regex": req.query.state, "$options": "i" }
  try {
    StateModel.aggregate([
      {
        "$match": {
          state: { "$regex": req.query.q, "$options": "i" }
        }
      },
      {
        "$lookup": {
          from: "districts",
          localField: "statecode",
          foreignField: "statecode",
          as: "District"
        }
      },
      { "$unwind": "$District" },
      {
        $project: {
          "_id":0,
          "state": 1,
          "district_code": "$District.districtcode",
          "district": "$District.district"


        }
      },
    ]).exec((err, list) => {
      console.log("err ", err);

      res.send(list);
    });
  }
  catch (err) {
    res.send({ err: err, msg: err.message });
  }
};

exports.getCitiesByTown = function (req, res, next) {


  try {
    CityModel.aggregate([
      {
        $match: {
          city: { $regex: req.query.q, $options: "i" }
        }
      },
      {
        $lookup: {
          from: "districts",
          localField: "districtcode",
          foreignField: "districtcode",
          as: "District"
        }
      },
      { $unwind: "$District" },
      {
        $lookup: {
          from: "states",
          localField: "District.statecode",
          foreignField: "statecode",
          as: "States"
        }
      },
      { $unwind: "$States" },
      {
        $project: {
          "_id":0,
          "town": "city",
          "state": "$States.state",
          "district": "$District.district"
        }
      }
    ]).exec((err, list) => {
      res.send(list);
    });
  }
  catch (err) {
    res.send({ err: err, msg: err.message });
  }
};

exports.getCitiesByDistrict = function (req, res, next) {

  try {
    DistrictModel.aggregate([
      {
        $match: {
          district: { $regex: req.query.q, $options: "i" }
        }
      },
      {
        $lookup: {
          from: "states",
          localField: "statecode",
          foreignField: "statecode",
          as: "States"
        }
      },
      { $unwind: "$States" },
      {
        $lookup: {
          from: "cities",
          localField: "districtcode",
          foreignField: "districtcode",
          as: "Cities"
        }
      },
      { $unwind: "$Cities" },
      {
        $project: {
          "_id":0,
          "town": "$Cities.city",
          "Urban_status":"$Cities.urbanstatus",
		      "State_code":"$States.statecode",
		      "State":"$States.state",
		      "District_code":"disrictcode",
		      "District":"district"
        }
      }
    ]).exec((err, list) => {
      res.send(list);
    });
  }
  catch (err) {
    res.send({ err: err, msg: err.message });
  }
};



// exports.insertCities = function(req, res, next) {
//   StateModel.create(jsonarray, serr => {
//     DistrictModel.create(jsonarray, derr => {
//       CityModel.create(jsonarray, cerr => {
//         res.send({ msg: "Success", serr: serr, derr: derr, cerr: cerr });
//       });
//     });
//   });
// };


