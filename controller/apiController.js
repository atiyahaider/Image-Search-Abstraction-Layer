const getDb = require('../util/db').getDb;
const ImageSearch = require('../models/imageSearch');
const axios = require('axios');

module.exports = {
    getSearchImage: async (req, res, next) => {
      try {
          let { searchVal } = req.params;
          let offset = parseInt(req.query.offset) || 1;
          let url = 'https://www.googleapis.com/customsearch/v1';

          //Get list of images from Google Image Search API
          let response = await axios.get(url, { 
                                        params: {
                                            key: process.env.API_KEY,
                                            cx: process.env.SE_ID,
                                            searchType: 'image',
                                            num: 10,
                                            safe: 'active',
                                            q: searchVal,
                                            start: ((offset-1)*10) + 1
                                        }
                                      });
          
          //Build json object to send as a response.
          let imageList = response.data.items;
          let jsonList = imageList.map( image => {
            return {
              title: image.title,
              url: image.link,
              snippet: image.snippet,
              thumbnail: image.image.thumbnailLink,
              context: image.image.contextLink
            };
          });

          //save date and query in database  
          let imageSearch = new ImageSearch({
              searchVal: searchVal, 
              searchedOn: new Date()
          });
          let data = await imageSearch.save();
          
          //send image list in json respond
          res.status(201).json(jsonList);
      } 
      catch(err) {
          next(err);
      }
    },

    getRecentSearches: async (req, res, next) => {
        try {
            let data = await ImageSearch.find()
                                        .sort('-searchedOn')
                                        .limit(10)
                                        .select('searchVal searchedOn')
            if (data.length === 0)
                res.status(404).json({error: 'No searches made yet!'});
            else
                res.status(200).json(data.map( item => {return {searchTerm: item.searchVal, searchedOn: item.searchedOn} } ));
        } 
        catch(err)  {
            next(err);
        }
    }
}