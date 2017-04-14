import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      match: this.store.findRecord('match', params.id),
    });
  },
});
