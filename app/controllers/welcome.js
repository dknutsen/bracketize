import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    submitForm(bracketName) {
      this.transitionToRoute('brackets.new', { queryParams: { name: bracketName } });
    }
  }
});
