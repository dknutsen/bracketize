import Service, { inject as service } from '@ember/service';

export default Service.extend({
  firebaseApp: service(),
  store: service(),

  init() {
    let self = this;
    self.get('firebaseApp').auth().onAuthStateChanged(function(user) {
      if (user) {
        self.set('favoritesEnabled', true);
        self.get('store').query('favorite', {}).then((favorites)=>{
          // ^ WTF YOU MIGHT ASK, why blank query instead of findAll?!?
          // see here: https://github.com/firebase/emberfire/issues/471
          self.set('favoritesRecords', favorites);
        });
      } else {
        self.set('favoritesRecords', null);
        self.set('favoritesEnabled', false);
      }
    });
  },

  createFavorite(contender) {
    let favorite = this.get('store').createRecord('favorite', { contender });
    favorite.save();
  },

  deleteFavorite(favorite) {
    favorite.destroyRecord();
  }

});
