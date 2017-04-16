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
  roundName: function(roundContenders){
    let name = "";
    if(roundContenders === 2) {
      name = 'Final';
    } else if(roundContenders === 4) {
      name = 'Semifinals';
    } else if(roundContenders === 4) {
      name = 'Quarterfinals';
    } else {
      name = `Round of ${roundContenders}`;
    }
    return name;
  },

  // FIXME: probably some issues with this logic, should we create records in a CP?
  // probably a better place/time to do this. Maybe when we create the bracket? My
  // only objection there is that we're creating a ton of records all at once, but
  // that's probably still the most appropriate?
  rounds: Ember.computed('sortedContenders', 'content.bracket.rounds', function(){
    let bracket = this.get('content.bracket');
    let rounds = bracket.get('rounds');
    if(rounds.get('length')) {
      return rounds;
    }
    // if the bracket didn't have rounds/matches already we need to create them
    let owner = this.get('session.uid');
    let contenders = this.get('sortedContenders');
    let numRounds = this.powersOf2[contenders.length];
    // create the rounds
    let roundPromises = [];
    for(var r = 0; r<numRounds; r++){
      let matchPromises = [];
      let roundContenders = contenders.length/Math.pow(2, r);
      let newRound = this.store.createRecord('round', {
        name: this.roundName(roundContenders),
        index: r,
        owner,
        bracket
      });
      bracket.get('rounds').addObject(newRound);
      // create matches for each round
      for(var m = 0; m<roundContenders/2; m++){
        let newMatch = this.store.createRecord('match', {
          bracket,
          round: newRound,
          owner
        });
        // if it's the first round we know the contenders already
        if(r === 0) {
          newMatch.set('contenderA', contenders.objectAt(m));
          newMatch.set('contenderB', contenders.objectAt(contenders.length-m-1));
        }
        newRound.get('matches').addObject(newMatch);
        // push the save promise into our match promises
        matchPromises.push(newMatch.save());
      }
      // once all the round's matches are saved, save the round
      Ember.RSVP.all(matchPromises).then(() => {
        roundPromises.push(newRound.save());
      });
    }
    // once all the rounds are saved, save the bracket
    Ember.RSVP.all(roundPromises).then(() => {
      bracket.save();
    });
    return rounds;
  }),


  actions: {
    gotoMatch: function(match){
      this.transitionToRoute('match', match.get('id'));
    }
  }

/*
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
*/



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
