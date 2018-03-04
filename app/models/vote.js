import DS from 'ember-data';
const { attr, belongsTo, Model } = DS;

export default Model.extend({
  // for each of these, should they be a relationship or
  // just a raw id value that we use to look up?

  owner: attr('string'),
  // user: belongsTo('user'),
  match: belongsTo('match'),
  winner: belongsTo('contender')
});
