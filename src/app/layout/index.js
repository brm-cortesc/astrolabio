const yo = require('yo-yo');

module.exports = function layout(cat, content) {
  return yo`<section class=${cat}>
      ${content}
    </section>`;
}