import DS from 'ember-data';
const { belongsTo, Model } = DS;

export default Model.extend({
  // SHOULD THIS MODEL EVEN EXIST?!?
  // will it have attributes that a vote would not?
  // or can we just use a vote model and/or call vote
  // something more generic?

  // for each of these, should they be a relationship or
  // just a raw id value that we use to look up?

  user: belongsTo('user'),
  match: belongsTo('match'),
  winner: belongsTo('contender')
});
