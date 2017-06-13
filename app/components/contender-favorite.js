import Ember from 'ember';

export default Ember.Component.extend({
  favorites: Ember.inject.service(),

  tagName: "i",
  classNameBindings: ['isFavorite:fa-heart:fa-heart-o'],
  classNames: ['fa'],

  // contenderId, passed in from owner

  favoriteRecord: Ember.computed('favorites.favoritesRecords.length', function(){
    let records = this.get('favorites.favoritesRecords');
    return records ? records.findBy('contender', this.get('contenderId')) : undefined;
  }),
  isFavorite: Ember.computed('favoriteRecord', function(){
    return !!this.get('favoriteRecord');
  }),

  click(){
console.log('favorite click', this.get('contenderId'));
    let record = this.get('favoriteRecord');
    if(record) {
      this.get('favorites').deleteFavorite(record);
    } else {
      this.get('favorites').createFavorite(this.get('contenderId'));
    }
    return false;
  }
});
