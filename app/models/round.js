import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  index: DS.attr('number'),

  owner: DS.attr('string'),

  bracket: DS.belongsTo('bracket'),
  matches: DS.hasMany('match'),
});
