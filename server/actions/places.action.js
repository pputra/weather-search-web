const request = require('request-promise');

module.exports = {
  getPlaces: async (input) => {
      try {
        const uri = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=
          ${input}&types=(cities)&language=en&key=${process.env.GOOGLE_API_KEY}`;
  
        const options = {
          uri,
          method: 'GET',
          json: true,
        };
  
        const { predictions } = await request(options);

        const placesSuggestion = predictions
          .map(({structured_formatting: { main_text: suggestion }}) => suggestion);

        return Promise.resolve(placesSuggestion);
      } catch (err) {
        return Promise.reject(err);
      }
  },
};
