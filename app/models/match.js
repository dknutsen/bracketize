import { equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default DS.Model.extend({
  session: service(),

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
  status: DS.attr('string'), // waiting, open, closed

  /*
  * computed properties
  */
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

  isWaiting: equal('status', 'waiting'),
  isOpen: equal('status', 'open'),
  isClosed: equal('status', 'closed'),

  // used for tracking the current user's vote
  myVote: function(){
    return this.get('votes').findBy('owner', this.get('session.uid')) || null;
  }.property('votes.[]', 'votes.@each.owner'),
  iVotedA: function(){
    return this.get('myVote.winner.id') === this.get('contenderA.id');
  }.property('myVote', 'myVote.winner.id', 'contenderA.id'),
  iVotedB: function(){
    return this.get('myVote.winner.id') === this.get('contenderB.id');
  }.property('myVote', 'myVote.winner.id', 'contenderB.id'),
});
