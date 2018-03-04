import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
const { attr, belongsTo, hasMany, Model } = DS;

export default Model.extend({
  session: service(),

  owner: attr('string'),

  contenderA: belongsTo('contender', { async: true, inverse: null }),
  contenderB: belongsTo('contender', { async: true, inverse: null }),

  winner: belongsTo('contender', { async: true, inverse: null }),

  votes: hasMany('vote', { async: true, inverse: null }),
  // predictions: hasMany('prediction'),

  bracket: belongsTo('bracket'),

  round: belongsTo('round'),

  // i think a match should have it's own open/closed setting
  // in addition to rounds.
  // in a voted bracket a match can only be open for voting if the round is open
  // in predictive bracket a match can only be open before the bracket has started(?)
  status: attr('string'), // waiting, open, closed

  /*
  * computed properties
  */
  votesA: computed('votes', 'votes.@each.winner', function() {
    return this.get('votes').filterBy('winner.id', this.get('contenderA.id')).get('length');
  }),
  votesB: computed('votes', 'votes.@each.winner', function() {
    return this.get('votes').filterBy('winner.id', this.get('contenderB.id')).get('length');
  }),

  winnerIsA: computed('winner', 'contenderA', function() {
    return this.get('winner.id') && this.get('contenderA.id') && this.get('winner.id') === this.get('contenderA.id');
  }),
  winnerIsB: computed('winner', 'contenderB', function() {
    return this.get('winner.id') && this.get('contenderB.id') && this.get('winner.id') === this.get('contenderB.id');
  }),

  loserIsA: computed('winner', 'contenderA', function() {
    return this.get('winner.id') && this.get('contenderA.id') && this.get('winner.id') !== this.get('contenderA.id');
  }),
  loserIsB: computed('winner', 'contenderB', function() {
    return this.get('winner.id') && this.get('contenderB.id') && this.get('winner.id') !== this.get('contenderB.id');
  }),

  isWaiting: computed.equal('status', 'waiting'),
  isOpen: computed.equal('status', 'open'),
  isClosed: computed.equal('status', 'closed'),

  // used for tracking the current user's vote
  myVote: computed('votes.{[],@each.owner}', function() {
    return this.get('votes').findBy('owner', this.get('session.uid')) || null;
  }),
  iVotedA: computed('myVote', 'myVote.winner.id', 'contenderA.id', function() {
    return this.get('myVote.winner.id') === this.get('contenderA.id');
  }),
  iVotedB: computed('myVote', 'myVote.winner.id', 'contenderB.id', function() {
    return this.get('myVote.winner.id') === this.get('contenderB.id');
  })
});
