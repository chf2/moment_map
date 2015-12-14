# Moment Map 

### Live Link: [www.momentmap.io][moment-map-link]

Moment Map is a rack application built on [chf-go][chf-go-link], a lightweight
ruby web framework and PostgreSQL ORM. The front end uses React.js and moment
data is managed using the Flux pattern. Static assets are bundled with Webpack
and served using Rack::Static. Using the Google Maps API and a moment API built
on chf-go, users can create new moments and browse moments by location and tag
in a single-page experience.

[moment-map-link]: http://www.momentmap.io
[chf-go-link]: https://github.com/chf2/chf-go
