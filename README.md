# Front Matter Loader

## Installation
Load it in `app.js` like so:

```javascript
const page = {}
const site = {}

module.exports = {
  posthtml: (ctx) => {
    return {
      defaults: [
        jade({ filename: ctx.resourcePath, page: page, site: site})
      ]
    }
  },
  module: {
    preLoaders: [
      { test: /\.jade$/, loader: 'dynamic-loader', page: page, site: site}
    ]
  },
}
```

## Usage
In order to use the results from front-matter-loader, you must pass it two objects, which it will put the parsed data on, using the `post` and `site` keys.

I know this is an unusual pattern for a javascript library, but the way it works is very effective in this particular system, and affords a lot of flexibility and power.
