import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  favorites: service(),

  tagName: "i",
  classNameBindings: ['isFavorite:fa-heart:fa-heart-o'],
  classNames: ['fa'],

  // contender, passed in from owner

  favoriteRecord: computed('favorites.favoritesRecords.length', 'contender', function(){
    let records = this.get('favorites.favoritesRecords');
    return records ? records.findBy('contender.id', this.get('contender.id')) : undefined;
  }),
  isFavorite: computed('favoriteRecord', function(){
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
