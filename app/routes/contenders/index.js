import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      contenders: this.store.findAll('contender')
    });
  },
});
