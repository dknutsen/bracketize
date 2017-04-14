import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    contenderClicked: function(contender){
      this.sendAction('contenderClicked', contender);
    }
  }
});
