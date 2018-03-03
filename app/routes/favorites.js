import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function(params){
    return hash({
      favorites: this.store.findAll('favorite'),
    });
  },
});
