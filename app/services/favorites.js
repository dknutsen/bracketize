import Ember from 'ember';

export default Ember.Service.extend({
  firebaseApp: Ember.inject.service(),
  store: Ember.inject.service(),

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

  createFavorite: function(contenderId){
    let favorite = this.get('store').createRecord('favorite', {contender: contenderId});
    favorite.save();
  },

  deleteFavorite: function(favorite){
    favorite.destroyRecord();
  },

});
