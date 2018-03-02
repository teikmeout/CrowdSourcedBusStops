const db = require('../lib/dbConnect.js');

// function getAllLocations(req, res, next) {
//   console.log('getAllLocations');
//   db.any(`SELECT * FROM locations;`)
//   .then((allLocations) => {
//     res.allLocations = allLocations;
//     next();
//   })
//   .catch((err) => {
//     next(err);
//   })
// }

// READ
// vv replaces getFavorites
function getLocationsByUser(req, res, next) {
  console.log('getLocationsByUser');
  // we're using session to contain the logged in user
  // checking value of session to see what the userId is
  console.log('session ->', req.session);
  db.any(`SELECT * FROM locations WHERE user_id = $1;`, [req.session.userId])
    .then((locations) => {
      console.log('locations by user ->', locations);
      res.favorites = locations;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

// CREATE
function saveLocation(req, res, next) {
  // creating an empty object for the insertObj
  const insertObj = {};
  insertObj.lat = parseFloat(req.body.lat);
  insertObj.long = parseFloat(req.body.long);
  insertObj.route = req.body.route;
  // Adding userId to insertObj
  insertObj.user_id = req.session.userId;

  // console.log('the data', insertObj);
  db.one(`INSERT INTO locations (lat, long, route,user_id)
    VALUES ($[lat], $[long], $[route], $[user_id])
    RETURNING *;`, insertObj)
    .then((savedLocation) => {
      // console.log('location inserted correctly', savedLocation);
      res.locals.savedLocation = savedLocation;
      next();
    })
    .catch((err) => {
      // console.log('location insertion failed', err);
      // res.status(500).json({
      //   message: 'failed inserting at saveFavorite',
      //   err,
      // });
      next(err);
    });
}

// Delete method doesn't change because we are deleting objects from the database
// based on that object's unique _id - you do not need to specify which user as
// the _id is sufficient enough
function deleteLocation(req, res, next) {
  db.one(`DELETE FROM locations WHERE id = $1 RETURNING *;`, req.params.id)
    .then((deletedLocation) => {
      console.log('location delted correctly', deletedLocation);
      res.locals.deletedLocation = deletedLocation;
      next();
    })
    .catch((err) => {
      console.log('location deletion failed');
      next(err);
    });
  // getDB().then((db) => {
  //   db.collection('favorites')
  //     .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
  //       if (removeErr) return next(removeErr);
  //       res.removed = result;
  //       db.close();
  //       next();
  //     });
  //     return false;
  // });
  // return false;
}

module.exports = {
  getLocationsByUser,
  saveLocation,
  deleteLocation,
};

// code taken from @rapala61 template
