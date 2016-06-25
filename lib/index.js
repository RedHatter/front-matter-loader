const yaml       = require('js-yaml')
const SpikeUtils = require('spike-util')
const path       = require('path')
const FRONTMATTER_REGEXP = /^---\s*(?:\r\n|\n|\r)([\s\S]*?)(?:\r\n|\n|\r)?---\s*(?:\r\n|\n|\r)?/

module.exports = function (content) {
  // Check for and extract front matter
  front_matter_str = content.match(FRONTMATTER_REGEXP)
  if (front_matter_str == null)
    return content

  const util = new SpikeUtils(this.options)

  folders = this.context.replace(this.options.context, '').split(path.sep)
  folders.shift()

  // Parse front matter yaml
  data = yaml.safeLoad(front_matter_str[1])
  data.content = content.replace(front_matter_str[0], '')

  // Set implicit values
  data._url = util.getOutputPath(this.resourcePath).relative
  data._categories = folders

  // Find the loader options and set the page local
  let options = this.options.module.preLoaders.find(elm => elm.loader == 'front-matter-loader')
  for (let prop in data)
    options.page[prop] = data[prop]

  // Set the site local
  let locals = options.site
  folders.forEach((f, i) => {
    if (!locals[f])
      locals[f] = []

    locals = locals[f]

    // Final folder, add front matter
    if (i == folders.length - 1)
      locals.push(data)

      // TODO: Implement all function
      // @all_content.push(front_matter)
      // locals.all = all_fn
  })

  return content
}
