import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  userId: Ember.computed.alias('session.uid'),

  actions: {
    deleteBracket: function(bracket){
      bracket.destroyRecord();
    }
  }
});
