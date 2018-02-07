import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteContender: function(contender){
      contender.destroyRecord();
    }
  }
});
