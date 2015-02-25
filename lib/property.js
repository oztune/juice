
/**
 * juice
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

module.exports = exports = Property;

/**
 * Module dependencies.
 */

var compare = require('./utils').compare

/**
 * CSS property constructor.
 *
 * @param {String} property
 * @param {String} value
 * @param {Selector} selector the property originates from
 * @api public
 */

function Property (prop, value, selector) {
  this.prop = prop;
  this.value = value;
  this.selector = selector
}

/**
 * Compares with another Property based on Selector#specificity.
 *
 * @api public
 */

Property.prototype.compare = function (property) {
  var a = this.selector.specificity()
    , b = property.selector.specificity()
    , winner = compare(a, b)

  if (winner === a && a !== b) return this;
  return property;
};

/**
 * Returns CSS property
 *
 * @api public
 */

Property.prototype.toString = function () {
  /// Original:
  // return this.prop + ': ' + this.value.replace(/['"]+/g, '') + ';';

  // By Oz: This is a bit of a hack, but without it the !important
  // part of the rule doesn't get inlined.
  // See this discussion and my comment about it: https://github.com/Automattic/juice/issues/52
  return this.prop + ': ' + this.value.replace(/['"]+/g, '') + (this.selector.text === '<!important>' ? ' !important' : '') + ';';
};
