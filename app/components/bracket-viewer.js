import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    gotoMatch: function(match){
      this.sendAction('gotoMatch', match);
    }
  }
});
