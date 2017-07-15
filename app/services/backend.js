import Ember from 'ember';
import RandomWords from "../utils/random-words";

export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  createBracket: function(data){
    let self = this;

    let name = data.name;
    let blind = data.blind;
    let type = data.type;
    let visibility = data.visibility;
    let seedProperty = data.seedProperty;
    let seedAscending = data.seedAscending;
    let owner = this.get('session.uid');
    let status = "waiting";

    // do validation?

    let bracket = this.get('store').createRecord('bracket', {
      name,
      owner,
      blind,
      type,
      seedProperty,
      seedAscending,
      status,
      visibility
    });
    return bracket.save().then(()=>{
      return bracket;
    });
  },

  createContenders: function(data, bracket){
    let self = this;
    let contenders = data;
    let owner = this.get('session.uid');
    let promises = contenders.map(contender => {
      // split name off from the other contender attributes
      let {name, ...attributes} = contender;
      let blindName = `${RandomWords.randomAdjective()} ${RandomWords.randomNoun()}`;
      let cModel = self.get('store').createRecord('contender', {
        owner,
        name,
        blindName,
        attributes
      });
      return cModel.save().then(()=>{
        return cModel;
      });
    });
    return Ember.RSVP.all(promises);
  },

  addContendersToBracket: function(bracket, contenders){
    contenders.forEach(cModel => {
      bracket.get('contenders').addObject(cModel);
    });
    return bracket.save();
  },










});
