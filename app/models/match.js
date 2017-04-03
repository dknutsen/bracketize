import DS from 'ember-data';

export default DS.Model.extend({
  //contenders?
  bracket: DS.belongsTo('bracket'),

  round: DS.attr('number'),

  // i think a match should have it's own open/closed setting
  // in addition to rounds.
  // in a voted bracket a match can only be open for voting if the round is open
  // in predictive bracket a match can only be open before the bracket has started(?)
  open: DS.attr('boolean'),

  // computed props
  //votes: count votes relationship
});
