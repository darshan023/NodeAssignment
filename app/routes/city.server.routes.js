const CityController = require('../controllers/city.server.controller');

module.exports=function(app){
    app.route('/globalSerarch').get(CityController.getCities);
    app.route('/state').get(CityController.getCitiesByState);
    app.route('/town').get(CityController.getCitiesByTown);
    app.route('/district').get(CityController.getCitiesByDistrict);
    // app.route('/insertCities').post(CityController.insertCities);
}