import Ember from 'ember';
import RandomWords from "../../utils/random-words";

export default Ember.Controller.extend({
  backend: Ember.inject.service(),

  queryParams: ['name', 'numContenders', 'blind', 'type', 'visibility'],
  name: null,
  blind: false, 
  numContendersOptions: [2, 4, 8, 16, 32, 64],
  numContenders: 16,
  typeOptions: ["Voted"/*, "Predictive"*/],
  type: "Voted",
  visibilityOptions: ["Private", "Shared", "Public"],
  visibility: "Private",

  contenders: [],
  columns: ['name'],

  setup: function(){
    this.send('numContendersChanged', this.get('numContenders'));
  }.on('init'),

  actions: {
    numContendersChanged: function(value){
      this.set('numContenders', value);
      let contenders = this.get('contenders');
      let columns = this.get('columns');
      let oldLength = contenders.get('length');
      if(oldLength > value) {
        contenders.removeAt(value, oldLength - value);
      } else {
        for(var i=0; i<value-oldLength; i++) {
          let newRow = {'name': ''};
          for(var j=0; j<columns.length; j++){
            newRow[columns[j]] = '';
          }
          contenders.pushObject(newRow);
        }
      }
    },
    addColumn: function(){
      this.get('columns').addObject('new column');
      this.get('contenders').forEach((contender)=>{
        contender['new column'] = '';
      });
    },
    deleteColumn: function(prop){
      this.get('columns').removeObject(prop);
      this.get('contenders').forEach((contender)=>{
        delete contender[prop];
      });
    },
    columnNameChanged: function(prop, newProp){
      this.get('columns').removeObject(prop);
      this.get('columns').addObject(newProp);
      this.get('contenders').forEach((contender)=>{
        contender[newProp] = contender[prop];
        delete contender[prop];
      });
    },
    submit: function(form){
      let self = this;

      let bracket = self.get('backend').createBracket(form).then(bracket => bracket);;
      let contenders = self.get('backend').createContenders(this.get('contenders')).then(contenders => contenders);
      Ember.RSVP.hash({bracket, contenders}).then((hash)=>{
        self.get('backend').addContendersToBracket(hash.bracket, hash.contenders).then(()=>{
          self.get('backend').createRounds(hash.bracket).then(()=>{
            self.transitionToRoute('bracket', hash.bracket.get('id'));
          });
        });
      });

    },
  }
});

