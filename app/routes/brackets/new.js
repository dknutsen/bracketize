import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    name: {
      replace: true,
    },
    numContenders: {
      replace: true,
    },
    blind: {
      replace: true,
    },
    type: {
      replace: true,
    },
    visibility: {
      replace: true,
    },
  }
});
