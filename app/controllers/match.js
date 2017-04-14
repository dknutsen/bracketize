import Ember from 'ember';

export default Ember.Controller.extend({
  votesA: function(){
    return this.get('content.match.votes').filterBy('winner.id', this.get('content.match.contenderA.id')).get('length');
  }.property('content.match.votes.@each.winner'),
  votesB: function(){
    return this.get('content.match.votes').filterBy('winner.id', this.get('content.match.contenderB.id')).get('length');
  }.property('content.match.votes.@each.winner'),

  alreadyVoted: function(){
    return this.get('content.match.votes').findBy('owner', this.get('session.uid')) || false;
  }.property('content.match.votes.@each.winner', 'content.match.votes.@each.owner'),
  votedA: function(){
    return this.get('alreadyVoted.winner.id') === this.get('content.match.contenderA.id');
  }.property('alreadyVoted'),
  votedB: function(){
    return this.get('alreadyVoted.winner.id') === this.get('content.match.contenderB.id');
  }.property('alreadyVoted'),

  actions: {
    contenderClicked: function(contender){
      let alreadyVoted = this.get('alreadyVoted');
      if(alreadyVoted) {
        alreadyVoted.set('winner', contender);
        alreadyVoted.save();
      } else {
        let owner = this.get('session.uid'); 
        let match = this.get('content.match'); 
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
