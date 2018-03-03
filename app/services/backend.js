import { hash, all } from 'rsvp';
import Service, { inject as service } from '@ember/service';
import RandomWords from "../utils/random-words";

export default Service.extend({
  store: service(),
  session: service(),


  createBracket(bracketData, contendersData){
    let self = this;
    // FIXME: this is probably overcomplicated and could be refactored
    let bracket = self._createBracket(bracketData).then(bracket => bracket);
    let contenders = self._createContenders(contendersData).then(contenders => contenders);
    return hash({bracket, contenders}).then((hash)=>{
      return self._addContendersToBracket(hash.bracket, hash.contenders).then(()=>{
        return self._createRounds(hash.bracket).then(()=>{
          return hash.bracket;
        });
      });
    });
  },


  // we used to have all these open/close round/match methods
  // on the respective models and honestly that's not terrible
  // either...
  openRound(round){
    let self = this;
    round.set('status', 'open');
    round.get('matches').forEach((match) => {
      self.openMatch(match);
    });
    round.save();
  },
  closeRound(round){
    let self = this;
    round.set('status', 'closed');
    round.get('matches').forEach((match) => {
      self.closeMatch(match);
    });
    round.save();
  },
  openMatch(match){
    match.set('status', 'open');
    match.save();
  },
  closeMatch(match){
    match.set('status', 'closed');
    if(match.get('votesA') >= match.get('votesB')) {
      match.set('winner', match.get('contenderA'));
    } else {
      match.set('winner', match.get('contenderB'));
    }
    match.save();
  },




  //
  // Private methods
  //

  _createBracket(data){
    let name = data.name;
    let blind = data.blind;
    let type = data.type;
    let visibility = data.visibility;
    let seedProperty = data.seedProperty;
    let seedAscending = data.seedAscending;
    let owner = this.get('session.uid');
    let status = "waiting";

    // do validation?

    let bracket = this.get('store').createRecord('bracket', {
      name,
      owner,
      blind,
      type,
      seedProperty,
      seedAscending,
      status,
      visibility
    });
    return bracket.save().then(()=>{
      return bracket;
    });
  },

  _createContenders(data){
    let self = this;
    let contenders = data;
    let owner = this.get('session.uid');
    let promises = contenders.map(contender => {
      // split name off from the other contender attributes
      let {name, ...attributes} = contender;
      let blindName = `${RandomWords.randomAdjective()} ${RandomWords.randomNoun()}`;
      let cModel = self.get('store').createRecord('contender', {
        owner,
        name,
        blindName,
        attributes
      });
      return cModel.save().then(()=>{
        return cModel;
      });
    });
    return all(promises);
  },

  _addContendersToBracket(bracket, contenders){
    contenders.forEach(cModel => {
      bracket.get('contenders').addObject(cModel);
    });
    return bracket.save();
  },

  _createRounds(bracket){
    // just make sure the bracket doesn't already have rounds
    let rounds = bracket.get('rounds');
    if(rounds.get('length')) {
      return;
    }

    let owner = this.get('session.uid');
    let contenders = bracket.get('sortedContenders');
    let numRounds = this._powersOf2[contenders.length];

    // create the rounds
    let matchPromises = [];
    let roundPromises = [];
    let newRounds = [];
    for(var r = 0; r<numRounds; r++){
      let roundContenders = contenders.length/Math.pow(2, r);
      let newRound = this.get('store').createRecord('round', {
        name: this._roundName(roundContenders),
        index: r,
        owner,
        bracket,
        status: "waiting"
      });
      bracket.get('rounds').addObject(newRound);
      // create matches for each round
      for(var m = 0; m<roundContenders/2; m++){
        let newMatch = this.get('store').createRecord('match', {
          bracket,
          round: newRound,
          owner,
          status: "waiting"
        });
        // if it's the first round we know the contenders already
        if(r === 0) {
          newMatch.set('contenderA', contenders.objectAt(m));
          newMatch.set('contenderB', contenders.objectAt(contenders.length-m-1));
        }
        newRound.get('matches').addObject(newMatch);
        // push the save promise into our match promises
        matchPromises.push(newMatch.save());
        newRounds.push(newRound);
      }
    }
    // wait until all matches are saved, then save all rounds,
    // and once those are done, save the bracket
    return all(matchPromises).then(() => {
      newRounds.forEach(round => {
        roundPromises.push(round.save());
      });
      return all(roundPromises).then(() => {
        return bracket.save();
      });
    });
  },






  // prob a cleaner way to do this, maybe refactor to a util?
  _powersOf2: Object.freeze({
    1: 0,
    2: 1,
    4: 2,
    8: 3,
    16: 4,
    32: 5,
    64: 6
  }),

  // prob a cleaner way to do this, maybe refactor to a util?
  _roundName(roundContenders){
    let name = "";
    if(roundContenders === 2) {
      name = 'Final';
    } else if(roundContenders === 4) {
      name = 'Semifinals';
    } else if(roundContenders === 8) {
      name = 'Quarterfinals';
    } else {
      name = `Round of ${roundContenders}`;
    }
    return name;
  },

});
