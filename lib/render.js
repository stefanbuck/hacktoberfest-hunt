const liquid = new (require('liquid')).Engine()
const whitespaceControl = require('@github-docs/render-content/whitespace-control')

module.exports = async function render (template, context) {
  template = whitespaceControl(template)
  return liquid.parseAndRender(template, context)
}
