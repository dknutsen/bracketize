import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  index: DS.attr('number'),

  owner: DS.attr('string'),

  status: DS.attr('string'), // waiting, open, closed

  bracket: DS.belongsTo('bracket'),
  matches: DS.hasMany('match'),

  isWaiting: Ember.computed.equal('status', 'waiting'),
  isOpen: Ember.computed.equal('status', 'open'),
  isClosed: Ember.computed.equal('status', 'closed'),
});
