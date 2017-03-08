# Initialize Express server
express = require 'express'
app = express()
app.requestMutex = false

# Initialize Musicbrainz client
NB = require 'nodebrainz'
nb = new NB userAgent: 'DiscogApp/0.0.1'

# Initialize static file middlware
app.use '/static', express.static 'public'

# Default public route
app.get '/', (req, res) ->
  res.sendFile __dirname + '/public/index.html'

# Initialize concurrency middleware for API endpoints
app.use (req, res, next) ->
  if app.requestMutex
    return res
      .status 429
      .send 'Maximum concurrent requests exceeded'
  else
    afterResponse = ->
      res.removeListener 'finish', afterResponse
      res.removeListener 'close', afterResponse
      app.requestMutex = false
    res.on 'finish', afterResponse
    res.on 'close', afterResponse
    app.requestMutex = true
    next()

# Search artists
# * param [string] name - Name of artist
app.get '/v1/api/artists/', (req, res) ->
  if not req.query.name?
    return res
      .status 400
      .send 'Missing required GET param: name\n'
  query = artist: req.query.name
  nb.search 'artist', query, (err, response) ->
    res.json response.artists

# Retrieve albums
# * param [string] artist_mbid - Musicbrainz MBID for artist
# * param [integer] page - Page of results [default: 0]
app.get '/v1/api/albums/', (req, res) ->
  if not req.query.artist_mbid?
    return res
      .status 400
      .send 'Missing required GET param: artist_mbid\n'
  page = req.query.page or 0
  query =
    artist: req.query.artist_mbid
    type: 'album'
    limit: 10
    offset: page * 10
  nb.browse 'release', query, (err, response) ->
    if not response.releases
      return res
        .status 404
        .send 'Releases not found'
    else
      res.json response.releases

# Start server
app.listen 2017, ->
  console.log 'Discog server listening on port 2017'
