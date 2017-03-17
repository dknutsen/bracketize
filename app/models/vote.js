import DS from 'ember-data';

export default DS.Model.extend({
  // for each of these, should they be a relationship or
  // just a raw id value that we use to look up?

  user: DS.belongsTo('user'),
  match: DS.belongsTo('match'),
  winner: DS.belongsTo('contender'), 
});
