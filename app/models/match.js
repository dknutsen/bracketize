import DS from 'ember-data';

export default DS.Model.extend({
  //contenders?
  bracket: DS.belongsTo('bracket'),

  open: DS.attr('boolean'),

  // computed props
  //votes: count votes relationship
});
