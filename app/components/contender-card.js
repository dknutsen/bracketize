import Ember from 'ember';

export default Ember.Component.extend({

  showBlind: function(){
    return !this.get('bracketClosed') && !this.get('isOwner') && this.get('isBlind');
  }.property('bracketClosed', 'isBlind', 'isOwner'),

  actions: {
    contenderClicked: function(contender){
      this.sendAction('contenderClicked', contender);
    }
  }
});
