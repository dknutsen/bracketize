import DS from 'ember-data';
const { belongsTo, Model } = DS;

export default Model.extend({
  contender: belongsTo('contender')
});
