import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return hash({
      bracket: this.store.findRecord('bracket', params.id)
    });
  }
});
