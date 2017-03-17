import DS from 'ember-data';

export default DS.Model.extend({
  // SHOULD THIS MODEL EVEN EXIST?!?
  // will it have attributes that a vote would not?
  // or can we just use a vote model and/or call vote
  // something more generic?


  // for each of these, should they be a relationship or
  // just a raw id value that we use to look up?

  user: DS.belongsTo('user'),
  match: DS.belongsTo('match'),
  winner: DS.belongsTo('contender'),
});
