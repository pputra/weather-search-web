const request = require('request-promise');

module.exports = {
  getStateSeal: async (state) => {
      try {
        const uri = `https://www.googleapis.com/customsearch/v1?q=${state}%20State%20Seal
          &cx=${process.env.SEARCH_ENGINE_ID}&imgSize=huge&imgType=news&num=1
          &searchType=image&key=${process.env.GOOGLE_API_KEY}`;
  
        const options = {
          uri,
          method: 'GET',
          json: true,
        };

        const { items } = await request(options);

        const imageUri = items[0].link;

        return Promise.resolve(imageUri);
      } catch (err) {
        return Promise.reject(err);
      }
  },
};
