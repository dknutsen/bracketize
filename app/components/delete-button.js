import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  text: null, // optional, if not provided, fa-times is used
  icon: 'times',

  confirmText: null,
  confirmIcon: 'question-circle',
  confirmState: false, // if true we are confirming

  sizeClass: computed('size', function() {
    return this.get('size') ? `btn-${this.get('size')}` : '';
  }),

  focusOut() {
    this.set('confirmState', false);
  },

  actions: {
    handleClick() {
      if (this.get('confirmState')) {
        get(this, 'onDelete')();
      } else {
        this.toggleProperty('confirmState');
      }
    }
  }
});
