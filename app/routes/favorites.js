import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      favorites: this.store.findAll('favorite'),
    });
  },
});
