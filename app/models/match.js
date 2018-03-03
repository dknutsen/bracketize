import { computed } from '@ember/object';
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
  votesA: computed('votes', 'votes.@each.winner', function(){
    return this.get('votes').filterBy('winner.id', this.get('contenderA.id')).get('length');
  }),
  votesB: computed('votes', 'votes.@each.winner', function(){
    return this.get('votes').filterBy('winner.id', this.get('contenderB.id')).get('length');
  }),

  winnerIsA: computed('winner', 'contenderA', function(){
    return this.get('winner.id') && this.get('contenderA.id') && this.get('winner.id') === this.get('contenderA.id');
  }),
  winnerIsB: computed('winner', 'contenderB', function(){
    return this.get('winner.id') && this.get('contenderB.id') && this.get('winner.id') === this.get('contenderB.id');
  }),

  loserIsA: computed('winner', 'contenderA', function(){
    return this.get('winner.id') && this.get('contenderA.id') && this.get('winner.id') !== this.get('contenderA.id');
  }),
  loserIsB: computed('winner', 'contenderB', function(){
    return this.get('winner.id') && this.get('contenderB.id') && this.get('winner.id') !== this.get('contenderB.id');
  }),

  isWaiting: computed.equal('status', 'waiting'),
  isOpen: computed.equal('status', 'open'),
  isClosed: computed.equal('status', 'closed'),

  // used for tracking the current user's vote
  myVote: computed('votes.{[],@each.owner}', function(){
    return this.get('votes').findBy('owner', this.get('session.uid')) || null;
  }),
  iVotedA: computed('myVote', 'myVote.winner.id', 'contenderA.id', function(){
    return this.get('myVote.winner.id') === this.get('contenderA.id');
  }),
  iVotedB: computed('myVote', 'myVote.winner.id', 'contenderB.id', function(){
    return this.get('myVote.winner.id') === this.get('contenderB.id');
  }),
});
