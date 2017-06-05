import Ember from 'ember';

export default Ember.Controller.extend({
/*
  votesA: function(){
    return this.get('content.match.votes').filterBy('winner.id', this.get('content.match.contenderA.id')).get('length');
  }.property('content.match.votes.@each.winner'),
  votesB: function(){
    return this.get('content.match.votes').filterBy('winner.id', this.get('content.match.contenderB.id')).get('length');
  }.property('content.match.votes.@each.winner'),
*/

  isOwner: function(){
    return this.get('content.match.owner') === this.get('session.uid');
  }.property(),

  alreadyVoted: function(){
    return this.get('content.match.votes').findBy('owner', this.get('session.uid')) || false;
  }.property('content.match.votes.@each.winner', 'content.match.votes.@each.owner'),
  votedA: function(){
    return this.get('alreadyVoted.winner') && this.get('content.match.contenderA') && this.get('alreadyVoted.winner.id') === this.get('content.match.contenderA.id');
  }.property('alreadyVoted'),
  votedB: function(){
    return this.get('alreadyVoted.winner') && this.get('content.match.contenderB') && this.get('alreadyVoted.winner.id') === this.get('content.match.contenderB.id');
  }.property('alreadyVoted'),

  nextMatch: function(){
    let matches = this.get('content.match.round.matches');
    let index = matches.indexOf(this.get('content.match'));
    return matches.objectAt(index+1);
  }.property('content.match.round.matches'),
  prevMatch: function(){
    let matches = this.get('content.match.round.matches');
    let index = matches.indexOf(this.get('content.match'));
    return matches.objectAt(index-1);
  }.property('content.match.round.matches'),

  actions: {
    gotoMatch: function(match){
      this.transitionToRoute('match', match.get('id'));
    },
    contenderClicked: function(contender){
      let match = this.get('content.match');
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
