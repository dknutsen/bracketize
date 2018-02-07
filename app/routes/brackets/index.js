import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return Ember.RSVP.hash({
      brackets: this.store.query('bracket', {})
      // ^ WTF YOU MIGHT ASK, why blank query instead of findAll?!?
      // see here: https://github.com/firebase/emberfire/issues/471
    });
  }
});
