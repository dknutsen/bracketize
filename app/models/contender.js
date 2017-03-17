import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  attributes: DS.attr('raw'),
  //seed: DS.attr('number') // this should be on the bracket, not the contender

  // allows contender data to be grouped and shared across brackets
  organization: DS.belongsTo('organization'),
});
