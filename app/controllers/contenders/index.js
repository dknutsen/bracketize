import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    deleteContender: function(contender){
      contender.destroyRecord();
    }
  }
});
