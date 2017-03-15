import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  attributes: DS.attr('raw'),
  seed: DS.attr('number')
});
