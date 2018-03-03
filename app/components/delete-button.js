import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  text: null, // optional, if not provided, fa-times is used
  icon: 'times',

  confirmText: null,//'Sure?',
  confirmIcon: 'question-circle',
  confirmState: false, // if true we are confirming

  sizeClass: computed('size', function(){
    return this.get('size') ? `btn-${this.get('size')}` : '';
  }),

  focusOut(){
    this.set('confirmState', false);
  },

  actions: {
    handleClick: function(){
      if(this.get('confirmState')) {
        this.sendAction('onDelete');
      } else {
        this.toggleProperty('confirmState');
      }
    },
  }
});
