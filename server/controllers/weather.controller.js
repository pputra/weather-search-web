const { getCoordinateByFullAddress } = require('../actions/geocoding.action');
const { getWeatherByCoordinate , getWeatherByCoordinateAndTime} = require('../actions/weather.action');
const { getStateSeal } = require('../actions/searchEngine.action');

module.exports = {
  getWeather: async (req, res) => {
    try {
      const {
        street,
        city,
        state,
        lat,
        lon,
        time,
        state_seal,
      } = req.query;

      let weatherData;

      if (lat && lon && time) {
        weatherData = await getWeatherByCoordinateAndTime(lat, lon, time);
      } else if (lat && lon) {
        weatherData = await getWeatherByCoordinate(lat, lon);
      } else {
        const { lat: latitude, lon: longitude } = await getCoordinateByFullAddress(street, city, state);
        weatherData = await getWeatherByCoordinate(latitude, longitude);
      }

      const fetchStateSeal = state_seal === 'true';
      if (fetchStateSeal) {
        const stateSeal = await getStateSeal(state);
        //const stateSeal = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Seal_of_New_York.svg/2000px-Seal_of_New_York.svg.png";

        return res.status(200).json({
          message: "weather data has been fetched",
          stateSeal,
          weatherData,
        });
      }

      return res.status(200).json({
        message: "weather data has been fetched",
        weatherData,
      });
    } catch (err) {

      return res.status(401).json({ message: err.message });
    }
  },
};
