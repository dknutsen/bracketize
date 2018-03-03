import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  backend: service(),

  queryParams: Object.freeze(['name', 'numContenders', 'blind', 'type', 'visibility']),
  name: null,
  blind: false, 
  numContendersOptions: Object.freeze([2, 4, 8, 16, 32, 64]),
  numContenders: 16,
  typeOptions: Object.freeze(["Voted"/*, "Predictive"*/]),
  type: "Voted",
  visibilityOptions: Object.freeze([/*"Private", "Shared",*/ "Public"]),
  visibility: "Private",

  //contenders: [],
  //columns: ['name'],

  init() {
    this._super(...arguments);
    this.contenders = [];
    this.columns = ['name'];
    this.send('numContendersChanged', this.get('numContenders'));
  },

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
    submit: function(bracketForm){
      let self = this;
      let contenderData = this.get('contenders');
      self.get('backend').createBracket(bracketForm, contenderData).then((bracket)=>{
        self.transitionToRoute('bracket', bracket.get('id'));
      });
    },
  }
});

