import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      brackets: this.store.findAll('bracket')
    });
  },
  actions: {
    deleteBracket: function(bracket){
      //this.store.deleteRecord('bracket', bracket);
      bracket.destroyRecord();
    }
  }
});
