import { equal } from '@ember/object/computed';
import DS from 'ember-data';
const { attr, belongsTo, hasMany, Model } = DS;

export default Model.extend({
  name: attr('string'),
  index: attr('number'),

  owner: attr('string'),

  status: attr('string'), // waiting, open, closed

  bracket: belongsTo('bracket'),
  matches: hasMany('match'),

  isWaiting: equal('status', 'waiting'),
  isOpen: equal('status', 'open'),
  isClosed: equal('status', 'closed')
});
