import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submitForm: function(bracketName){
      console.log('submitForm', bracketName);
      this.transitionToRoute('brackets.new', { queryParams: { name: bracketName }});
    }
  }
});
