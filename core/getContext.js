'use strict'

module.exports = function getContext (node) {
  const context = {contentMiddlewares: []}

  while (node) {
    if (!context.state && node.$state) {
      context.state = node.$state
    }
    if (!context.state && node.$contextState) {
      context.state = node.$contextState
    }
    if (context.isolate !== true && context.isolate !== 'middlewares') {
      context.isolate = node.$isolate
    }
    if (node.$contentMiddlewares && !context.isolate) {
      context.contentMiddlewares = node.$contentMiddlewares.concat(context.contentMiddlewares)
    }
    if (node.$root) {
      return context
    }
    node = node.parentNode
  }
  return context
}
