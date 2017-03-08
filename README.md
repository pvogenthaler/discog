# Instructions

TL;DR Implement a web application to browse an artist's discography

We've provided you with a simple node.js server that retrieves data from the [Musicbrainz.org](http://musicbrainz.org) API.  It comes with a couple endpoints that your application will use, as well as a static directory for your JS/CSS/HTML assets.  We've included a sample index.html and base.css as a starting point.

Your task is to implement all of the JS/CSS/HTML necessary to provide the user experience described in the Application Requirements section below. Feel free to use whatever JS/CSS frameworks/libraries you want, vanilla JS/CSS is also acceptable.

# Application Requirements

1. When the user navigates to [localhost:2017](http://localhost:2017), they should see a google-like search UI that lets them enter a musical artist's name.
2. When the user enters a name and presses "Search", the application will retrieve results from the "Search artists by name" endpoint (described below), and present the user with a search results page that includes the artist name of each result.
3. When the user clicks on one of the artist names, the application will retrieve results from the "Retrieve artist albums" endpoint (described below), and present the user with a list of album names w/ the accompanying release date.
4. Each of the search result screens (in step 2 & 3) provide the user with an artist query input so that they can start over.

NOTE: The "Retrieve artist albums" endpoint used in the final step supports pagination, and should be fully paginated to show the user all album results.  It's up to you if you want to load all data before rendering the albums page, or lazily load subsequent pages after the page is rendered.

# Application limitations

- Your application can only perform one request to the server at a time.  The server will return an HTTP 429 if you try to initialize a request while another one is in flight.
- This means you'll need to perform your pagination hits synchronously, otherwise you'll get request failures.

# What we're looking for

- User experience matches provided requirements
- Application honors server limitations
- Clean, organized, modular application code & markup
- Thoughtful comments

# Extras

- Form/layout styles
- CSS animations, loaders
- Cover Art (!)
- Unit tests

# Get started

## System Requirements

node.js (Preferably v6)

If you have issues running the provided server code with your system-level node.js installation, we recommend using [nvm](https://github.com/creationix/nvm).

```
nvm install 6
nvm use <version>
```

## Installation

Extract source code, install dependencies, start server
```
untar -xzvf discog-1.0.0.tar.gz
cd discog-1.0.0
npm install
npm start
```

## Test

Ensure server endpoints are functional
```
curl localhost:2017/v1/api/artists/?name=meshuggah
curl localhost:2017/v1/api/albums/?artist_mbid=cf8b3b8c-118e-4136-8d1d-c37091173413
```

## API Documentation

### Host
http://localhost:2017

### Endpoints

#### Search artists by name
GET /v1/api/artists/?name=meshuggah

#### Retrieve artist albums
GET /v1/api/albums/?artist_mbid=cf8b3b8c-118e-4136-8d1d-c37091173413&page=0
