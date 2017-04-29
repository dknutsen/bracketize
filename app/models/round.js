import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  index: DS.attr('number'),

  owner: DS.attr('string'),

  status: DS.attr('string'), // waiting, open, closed

  bracket: DS.belongsTo('bracket'),
  matches: DS.hasMany('match'),


  isClosed: function(){
    return this.get('status') === 'closed';
  }.property('status'),

  // don't love putting these in the model but in the normal case they'd be on the
  // server so hey, why not
  openRound: function(){
    this.set('status', 'open');
    this.get('matches').forEach((match) => {
      match.openMatch();
    });
    this.save();
  },
  closeRound: function(){
    this.set('status', 'closed');
    this.get('matches').forEach((match) => {
      match.closeMatch();
    });
    this.save();
  }
});
