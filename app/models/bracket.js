import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  owner: DS.attr('string'),

  // Bracket Type 
  // voted - Voted is like the beer bracket, to determine who wins. 
  //         With voted each user votes on who the winner was. 
  //         With predictive the users predict who the winner will be.
  // predictive - Predictive is to predict who wins (contender wins). 
  //              Closest predictive bracket wins (contender wins and 
  //              causes a user to win). 
  type: DS.attr('string'),
 
  // Blind? 
  // if blind then instead of showing contender names(/data?) it shows
  // fake names. Real names are only shown to bracket owner. 
  // only applies to 'voted'?
  blind: DS.attr('boolean'), 

  // Bracket Status
  // what round the bracket is in (how should this work?)
  // could have open, roundX, ... closed?
  // should we have a different attr for current round?
  // current round
  // - waiting: new users can join, bracket settings can be changed
  // - round_index: bracket settings cannot change, no noobs
  // - closed: view only, bracket is done
  status: DS.attr('string'),
  
  // Bracket Permissions
  // who can see this bracket (private, shared, public)
  visibility: DS.attr('string'),
  // who can participate in this bracket (private, shared, public)
  interactivity: DS.attr('string'),

  seedProperty: DS.attr('string'),
  seedAscending: DS.attr('boolean'),

  contenders: DS.hasMany('contender', { async: true, inverse: null }),

  rounds: DS.hasMany('round', { async: true, inverse: null }),

/*
  rounds: function(){
    let numContenders = this.get('numContenders');
    let rounds = {};
    let roundCount = 1;
    while(numContenders > 1) {
      let name = '';
      if(numContenders === 2) {
        name = 'Final';
      } else if(numContenders === 4) {
        name = 'Semifinals';
      } else if(numContenders === 4) {
        name = 'Quarterfinals';
      } else {
        name = `Round of ${numContenders}`;
      }

      rounds[roundCount] = {
        name: name,
        number: roundCount,
        contenders: numContenders
      };
      roundCount++;
      numContenders /= 2;
    }
    return rounds;
  }.property('numContenders'),
*/

  numContenders: function(){
    return this.get('contenders.length');
  }.property('contenders.length'),

  isBlind: function(){
    return this.get('blind') && this.get('status') !== 'closed';
  }.property('blind'),

  isWaiting: function(){
    return this.get('status') === 'waiting';
  }.property('status'),
  isOpen: function(){
    return this.get('status') !== 'waiting' && this.get('status') !== 'closed';
  }.property('status'),
  isClosed: function(){
    return this.get('status') === 'closed';
  }.property('status'),

  isMoreRounds: function(){
    return this.get('status') !== 'closed' && this.get('status') < this.get('rounds.length') - 1;
  }.property('status', 'rounds.length'),
  nextStatus: function(){
    let s = this.get('status');
    if(s === 'waiting') {
      return 0;
    } else if(this.get('isMoreRounds')) {
      return parseInt(s) + 1;
    } else if(!this.get('isClosed')){
      return 'closed';
    } else {
      return null;
    }
  }.property('status'),
});
