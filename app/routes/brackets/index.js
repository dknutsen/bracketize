import { hash } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function(params){
    return hash({
      brackets: this.store.query('bracket', {})
      // ^ WTF YOU MIGHT ASK, why blank query instead of findAll?!?
      // see here: https://github.com/firebase/emberfire/issues/471
    });
  }
});
