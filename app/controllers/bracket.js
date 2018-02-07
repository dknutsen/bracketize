import Ember from 'ember';
import isNumeric from '../utils/is-numeric';

export default Ember.Controller.extend({
  backend: Ember.inject.service(),

  isOwner: function(){
    return this.get('model.bracket.owner') === this.get('session.uid');
  }.property(),

  currentRound: Ember.computed('model.bracket.status', 'model.rounds', function(){
    let bracket = this.get('model.bracket');
    if(!bracket.get('isOpen')) {
      return null;
    }
    return bracket.get('rounds').objectAt(bracket.get('status'));
  }),

  roundStatusButtonLabel: Ember.computed('model.bracket.status', function(){
    if(this.get('model.bracket.isWaiting')) {
      return "Open Bracket";
    } else if(this.get('model.bracket.isOpen')) {
      return "Next Round";
    } else if(this.get('model.bracket.isMoreRounds')) {
      return "Close Bracket";
    } else {
      return "Closed";
    }
  }),


  actions: {
    gotoMatch: function(match){
      this.transitionToRoute('match', match.get('id'));
    },
    nextStatus: function(){
      let bracket = this.get('model.bracket');
      let currentStatus = bracket.get('status');
      let nextStatus = bracket.get('nextStatus');
      if(nextStatus === null) { return; }

      // first close the exisiting round if any
      if(bracket.get('isOpen')) {
        let currentRound = bracket.get('rounds').objectAt(currentStatus);
        if(currentRound){
          this.get('backend').closeRound(currentRound);
        }
      }
      // set the bracket status to the next round
      bracket.set('status', nextStatus);
      // if that didn't close the bracket, open the next round
      if(bracket.get('isOpen')) {
        let currentRound = bracket.get('rounds').objectAt(currentStatus);
        let newRound = bracket.get('rounds').objectAt(nextStatus);
        if(newRound){
          this.get('backend').openRound(newRound);
          if(currentRound) {
            // set previous winners as contenders for the matches in the new round
            for(var n = 0; n<newRound.get('matches.length'); n++) {
              let previousWinnerA = currentRound.get('matches').objectAt(n*2).get('winner');
              let previousWinnerB = currentRound.get('matches').objectAt(n*2+1).get('winner');
              let matchN = newRound.get('matches').objectAt(n);
              matchN.set('contenderA', previousWinnerA);
              matchN.set('contenderB', previousWinnerB);
              matchN.save();
            }
          }
        }
      }
      bracket.save();
    }
  }
});
