import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['name'],
  name: null,

  numContendersOptions: [2, 4, 8, 16, 32, 64],
  numContenders: 16,
});
