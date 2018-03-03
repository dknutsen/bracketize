import Component from '@ember/component';

export default Component.extend({

  showBlind: function(){
    return !this.get('bracketClosed') && !this.get('isOwner') && this.get('isBlind');
  }.property('bracketClosed', 'isBlind', 'isOwner'),
  showScores: function(){
    return this.get('matchIsClosed') || this.get('isOwner');
  }.property('matchIsClosed', 'isOwner'),

  actions: {
    contenderClicked: function(contender){
      this.sendAction('contenderClicked', contender);
    }
  }
});
