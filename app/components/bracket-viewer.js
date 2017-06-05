import Ember from 'ember';

export default Ember.Component.extend({

  showBlindNames: function(){
    return !this.get('bracket.isClosed') && !this.get('isOwner') && this.get('bracket.isBlind');
  }.property('isOwner', 'bracket.isBlind', 'bracket.isClosed'),

  actions: {
    gotoMatch: function(match){
      this.sendAction('gotoMatch', match);
    }
  }
});
