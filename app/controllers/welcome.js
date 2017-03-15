import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submitForm: function(bracketName){
      console.log('submitForm', bracketName);
      this.transitionToRoute('brackets.new', { queryParams: { name: bracketName }});
    }
  }
});
