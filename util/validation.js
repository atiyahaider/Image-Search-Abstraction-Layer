module.exports = {
    searchVal: () => {
        return (req, res, next) => {
          let { searchVal } = req.params;
          if(searchVal === undefined)
            return res.status(400).json({error: 'Please specify the image to be searched'});
          else if(searchVal.trim() === '')
            return res.status(400).json({error: 'Please specify the image to be searched'});
          else
            next();
        }
    },
  
    offset: () => {
        return (req, res, next) => {
            let { offset } = req.query;
            if (offset !== undefined && (isNaN(parseInt(offset)) || offset < 1 || offset > 10))
                return res.status(400).json({error: 'Offset should be a valid number between 1 and 10'});  
            else
                next();
        }
    }
 }