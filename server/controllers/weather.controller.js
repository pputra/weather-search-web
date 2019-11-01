const { getCoordinateByFullAddress } = require('../actions/geocoding.action');
const { getWeatherByCoordinate } = require('../actions/weather.action');

module.exports = {
  getWeather: async (req, res) => {
    try {
      const {
        street,
        city,
        state,
      } = req.body;

      const { lat: latitude, lon: longitude } = await getCoordinateByFullAddress(street, city, state);

      const weatherData = await getWeatherByCoordinate(latitude, longitude);

      return res.status(200).json({
        message: "weather data has been fetched",
        weatherData, 
      });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};
