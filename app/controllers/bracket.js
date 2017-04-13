import Ember from 'ember';
import isNumeric from '../utils/is-numeric';

export default Ember.Controller.extend({

  sortDefinition: Ember.computed('content.bracket.seedProperty', 'content.bracket.seedAscending', function(){
    let seedProp = this.get('content.bracket.seedProperty');
    if(seedProp !== 'name') {
      seedProp = `attributes.${seedProp}`;
    }
    return [`${seedProp}${this.get('content.bracket.seedAscending') ? '':':desc'}`];
  }),
  sortedContenders: Ember.computed.sort('content.bracket.contenders', 'sortDefinition'),
 
  // prob a cleaner way to do this, maybe refactor to a util?
  powersOf2: {
    1: 0,
    2: 1,
    4: 2,
    8: 3,
    16: 4,
    32: 5,
    64: 6
  },

  // here we should actually create some match/round records
  rounds: Ember.computed('sortedContenders', function(){
    let contenders = this.get('sortedContenders');
    let rounds = [];
    let numRounds = this.powersOf2[contenders.length];

    let matches = [];
    for(var m = 0; m<contenders.length/2; m++){
      let a = contenders.objectAt(m);
      let b = contenders.objectAt(contenders.length-m-1);
      matches.push({
        teamA: {name: a.get('name'), score: "-"},
        teamB: {name: b.get('name'), score: "-"}
      });
    }
    rounds.push({matches});

    for(var r = 1; r<numRounds; r++){
      matches = [];
      for(m=0; m<contenders.length/Math.pow(2, r+1); m++){
        matches.push({
          teamA: {name: "TBD", score: "-"},
          teamB: {name: "TBD", score: "-"}
        });
      }
      rounds.push({matches});
    }
    return rounds;
  }),


/*

  match object should have teamA and teamB and they should be references to the preceding match or preceding match winner probably and
  if not set they should be displayed as TBD

*/


/*
rounds: [{
  matches: [{
    teamA: {name: "a", score: 1, winner: true},
    teamB: {name: "b", score: 1}
  },...
}]
*/
});
