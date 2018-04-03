import Controller from '@ember/controller';

export default Controller.extend({
  toggleNav: false,
  actions: {
    toggleNav() {
      this.toggleProperty('toggleNav');
    }
  }
});
