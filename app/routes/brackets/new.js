import Route from '@ember/routing/route';

export default Route.extend({
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
