import Ember from 'ember';

export default Ember.Component.extend({
  favorites: Ember.inject.service(),

  tagName: "i",
  classNameBindings: ['isFavorite:fa-heart:fa-heart-o'],
  classNames: ['fa'],

  // contender, passed in from owner

  favoriteRecord: Ember.computed('favorites.favoritesRecords.length', 'contender', function(){
    let records = this.get('favorites.favoritesRecords');
    return records ? records.findBy('contender.id', this.get('contender.id')) : undefined;
  }),
  isFavorite: Ember.computed('favoriteRecord', function(){
    return !!this.get('favoriteRecord');
  }),

  click(){
console.log('favorite click', this.get('contender'));
    let record = this.get('favoriteRecord');
    if(record) {
      this.get('favorites').deleteFavorite(record);
    } else {
      this.get('favorites').createFavorite(this.get('contender'));
    }
    return false;
  }
});
