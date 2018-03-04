import { computed } from '@ember/object';
import { not, or, equal, and, sort } from '@ember/object/computed';
import DS from 'ember-data';
const { attr, hasMany, Model } = DS;

export default Model.extend({
  name: attr('string'),

  owner: attr('string'),

  // Bracket Type
  // voted - Voted is like the beer bracket, to determine who wins.
  //         With voted each user votes on who the winner was.
  //         With predictive the users predict who the winner will be.
  // predictive - Predictive is to predict who wins (contender wins).
  //              Closest predictive bracket wins (contender wins and
  //              causes a user to win).
  type: attr('string'),

  // Blind?
  // if blind then instead of showing contender names(/data?) it shows
  // fake names. Real names are only shown to bracket owner.
  // only applies to 'voted'?
  blind: attr('boolean'),

  // Bracket Status
  // what round the bracket is in (how should this work?)
  // could have open, roundX, ... closed?
  // should we have a different attr for current round?
  // current round
  // - waiting: new users can join, bracket settings can be changed
  // - round_index: bracket settings cannot change, no noobs
  // - closed: view only, bracket is done
  status: attr('string'),

  // Bracket Permissions
  // who can see this bracket (private, shared, public)
  visibility: attr('string'),
  // who can participate in this bracket (private, shared, public)
  interactivity: attr('string'),

  seedProperty: attr('string'),
  seedAscending: attr('boolean'),

  contenders: hasMany('contender', { async: true, inverse: null }),

  rounds: hasMany('round', { async: true, inverse: null }),

  /*
  * Computed Properties
  */
  isOpen: not('isNotOpen'),
  isNotOpen: or('isClosed', 'isWaiting'),
  isClosed: equal('status', 'closed'),
  isNotClosed: not('isClosed'),
  isWaiting: equal('status', 'waiting'),
  isNotWaiting: not('isWaiting'),
  isBlind: and('isNotClosed', 'blind'),

  numContenders: computed('contenders.length', function() {
    return this.get('contenders.length');
  }),
  sortDefinition: computed('seedProperty', 'seedAscending', function() {
    let seedProp = this.get('seedProperty');
    if (seedProp !== 'name') {
      seedProp = `attributes.${seedProp}`;
    }
    return [`${seedProp}${this.get('seedAscending') ? '' : ':desc'}`];
  }),
  sortedContenders: sort('contenders', 'sortDefinition'),

  isMoreRounds: computed('status', 'rounds.length', function() {
    return this.get('status') !== 'closed' && this.get('status') < this.get('rounds.length') - 1;
  }),
  nextStatus: computed('status', function() {
    let s = this.get('status');
    if (s === 'waiting') {
      return 0;
    } else if (this.get('isMoreRounds')) {
      return parseInt(s) + 1;
    } else if (!this.get('isClosed')) {
      return 'closed';
    } else {
      return null;
    }
  })
});
