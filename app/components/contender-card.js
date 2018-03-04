import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({

  showBlind: computed('bracketClosed', 'isBlind', 'isOwner', function() {
    return !this.get('bracketClosed') && !this.get('isOwner') && this.get('isBlind');
  }),
  showScores: computed('matchIsClosed', 'isOwner', function() {
    return this.get('matchIsClosed') || this.get('isOwner');
  }),

  actions: {
    contenderClicked(contender) {
      get(this, 'contenderClicked')(contender);
    }
  }
});
