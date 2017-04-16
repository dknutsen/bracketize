import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.attr('string'),

  contenderA: DS.belongsTo('contender', { async: true, inverse: null }),
  contenderB: DS.belongsTo('contender', { async: true, inverse: null }),

  winner: DS.belongsTo('contender', { async: true, inverse: null }),

  votes: DS.hasMany('vote', { async: true, inverse: null }),
  //predictions: DS.hasMany('prediction'),

  bracket: DS.belongsTo('bracket'),

  round: DS.belongsTo('round'),

  // i think a match should have it's own open/closed setting
  // in addition to rounds.
  // in a voted bracket a match can only be open for voting if the round is open
  // in predictive bracket a match can only be open before the bracket has started(?)
  open: DS.attr('boolean'),

  // computed props
  //votes: count votes relationship
  votesA: function(){
    return this.get('votes').filterBy('winner.id', this.get('contenderA.id')).get('length');
  }.property('votes', 'votes.@each.winner'), 
  votesB: function(){
    return this.get('votes').filterBy('winner.id', this.get('contenderB.id')).get('length');
  }.property('votes', 'votes.@each.winner'), 

  winnerIsA: function(){
    return this.get('winner.id') && this.get('contenderA.id') && this.get('winner.id') === this.get('contenderA.id');
  }.property('winner', 'contenderA'),
  winnerIsB: function(){
    return this.get('winner.id') && this.get('contenderB.id') && this.get('winner.id') === this.get('contenderB.id');
  }.property('winner', 'contenderB'),

  loserIsA: function(){
    return this.get('winner.id') && this.get('contenderA.id') && this.get('winner.id') !== this.get('contenderA.id');
  }.property('winner', 'contenderA'),
  loserIsB: function(){
    return this.get('winner.id') && this.get('contenderB.id') && this.get('winner.id') !== this.get('contenderB.id');
  }.property('winner', 'contenderB'),
});
