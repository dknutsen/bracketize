import Component from '@ember/component';

export default Component.extend({
  showRealNames: function(){
    return this.get('isOwner') || this.get('bracket.isClosed') || !this.get('bracket.isBlind');
  }.property('isOwner', 'bracket.isOpen'),

  actions: {
    gotoMatch: function(match){
      this.sendAction('gotoMatch', match);
    }
  }
});
