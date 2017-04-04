import Ember from 'ember';
import isNumeric from '../utils/is-numeric';

export default Ember.Controller.extend({

  sortDefinition: Ember.computed('content.bracket.seedProperty', 'content.bracket.seedAscending', function(){
    let seedProp = this.get('content.bracket.seedProperty');
    if(seedProp !== 'name') {
      seedProp = `attributes.${seedProp}`;
    }
    return [`${seedProp}${this.get('content.bracket.seedAscending') ? '':':desc'}`];
  }),
  sortedContenders: Ember.computed.sort('content.bracket.contenders', 'sortDefinition'),
});
