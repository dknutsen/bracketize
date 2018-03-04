import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  showRealNames: computed('isOwner', 'bracket.isOpen', function() {
    return this.get('isOwner') || this.get('bracket.isClosed') || !this.get('bracket.isBlind');
  }),

  actions: {
    gotoMatch(match) {
      get(this, 'gotoMatch')(match);
    }
  }
});
