function mdLoader(content) {
  const options = this.getOptions({ 'handler': true })
  return options.handler.apply(this, [content])
}
module.exports = mdLoader

