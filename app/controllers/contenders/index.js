import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    deleteContender(contender) {
      contender.destroyRecord();
    }
  }
});
