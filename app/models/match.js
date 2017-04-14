import DS from 'ember-data';

export default DS.Model.extend({

  contenderA: DS.belongsTo('contender', { async: true, inverse: null }),
  contenderB: DS.belongsTo('contender', { async: true, inverse: null }),
  //parentA: DS.belongsTo('match'),
  //parentB: DS.belongsTo('match'),

  votes: DS.hasMany('vote', { async: true, inverse: null }),
  //predictions: DS.hasMany('prediction'),

  bracket: DS.belongsTo('bracket'),

  round: DS.attr('number'),

  // i think a match should have it's own open/closed setting
  // in addition to rounds.
  // in a voted bracket a match can only be open for voting if the round is open
  // in predictive bracket a match can only be open before the bracket has started(?)
  open: DS.attr('boolean'),

  // computed props
  //votes: count votes relationship
  votesA: function(){
    return this.get('votes').filterBy('winner', this.get('contenderA.id')).get('length');
  }.property('votes', 'votes.@each.winner'), 
  votesB: function(){
    return this.get('votes').filterBy('winner', this.get('contenderA.id')).get('length');
  }.property('votes', 'votes.@each.winner'), 

});
