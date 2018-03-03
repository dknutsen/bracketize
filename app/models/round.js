import { equal } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  index: DS.attr('number'),

  owner: DS.attr('string'),

  status: DS.attr('string'), // waiting, open, closed

  bracket: DS.belongsTo('bracket'),
  matches: DS.hasMany('match'),

  isWaiting: equal('status', 'waiting'),
  isOpen: equal('status', 'open'),
  isClosed: equal('status', 'closed'),
});
