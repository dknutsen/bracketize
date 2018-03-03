import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  isOwner: computed(function(){
    return this.get('model.match.owner') === this.get('session.uid');
  }),

  // did the user already vote? and who for?
  alreadyVoted: computed('model.match.votes.@each.{winner,owner}', function(){
    // either return a vote model if we already voted, or false if not
    return this.get('model.match.votes').findBy('owner', this.get('session.uid')) || false;
  }),
  votedA: computed('alreadyVoted', function(){
    return this.get('alreadyVoted.winner') && this.get('model.match.contenderA') && this.get('alreadyVoted.winner.id') === this.get('model.match.contenderA.id');
  }),
  votedB: computed('alreadyVoted', function(){
    return this.get('alreadyVoted.winner') && this.get('model.match.contenderB') && this.get('alreadyVoted.winner.id') === this.get('model.match.contenderB.id');
  }),

  // CPs that return the prev and next matches
  nextMatch: computed('model.match.round.matches', function(){
    let matches = this.get('model.match.round.matches');
    let index = matches.indexOf(this.get('model.match'));
    return matches.objectAt(index+1);
  }),
  prevMatch: computed('model.match.round.matches', function(){
    let matches = this.get('model.match.round.matches');
    let index = matches.indexOf(this.get('model.match'));
    return matches.objectAt(index-1);
  }),

  actions: {
    gotoMatch: function(match){
      this.transitionToRoute('match', match.get('id'));
    },
    contenderClicked: function(contender){
      let match = this.get('model.match');
      if(!match.get('isOpen')) { return; }

      let alreadyVoted = this.get('alreadyVoted');
      if(alreadyVoted) {
        alreadyVoted.set('winner', contender);
        alreadyVoted.save();
      } else {
        let owner = this.get('session.uid'); 
        let vote = this.store.createRecord('vote', {
          owner,
          match,
          winner: contender
        });
        match.get('votes').addObject(vote);
        vote.save().then(()=>{
          match.save();
        });
      }
    }
  }
});
