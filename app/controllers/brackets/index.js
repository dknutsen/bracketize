import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  session: service(),

  userId: alias('session.uid'),

  actions: {
    deleteBracket: function(bracket){
      bracket.destroyRecord();
    }
  }
});
