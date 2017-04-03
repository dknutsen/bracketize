import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      bracket: this.store.findRecord('bracket', params.id),
    });
  }

});
