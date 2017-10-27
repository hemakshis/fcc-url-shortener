export MONGOLAB_URI = "mongodb://username:password@ds01316.mlab.com:1316/hemakshis-shorturl"

var url = process.env.MONGOLAB_URI;

module.exports = {
  database:url,
  secret:'yougogirl'
}
