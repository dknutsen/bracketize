import Service, { inject as service } from '@ember/service';

export default Service.extend({
  firebaseApp: service(),
  store: service(),

  init: function(){
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

  createFavorite: function(contender){
    let favorite = this.get('store').createRecord('favorite', {contender: contender});
    favorite.save();
  },

  deleteFavorite: function(favorite){
    favorite.destroyRecord();
  },

});
