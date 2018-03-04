import DS from 'ember-data';
const { attr, Model } = DS;

export default Model.extend({
  owner: attr('string'),

  name: attr('string'),
  blindName: attr('string'),
  attributes: attr('raw')
  // seed: attr('number') // this should be dynamic on the bracket? not the contender

  // allows contender data to be grouped and shared across brackets
  // organization: belongsTo('organization'),

});
