import Ember from 'ember';

export default Ember.Controller.extend({
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

      let name = form.name;
      let owner = this.get('session.uid');
      let blind = form.blind;
      let type = form.type;
      let visibility = form.visibility;
      let seedProperty = form.seedProperty;
      let seedAscending = form.seedAscending;

      // do validation?

      let bracket = this.store.createRecord('bracket', {
        name,
        owner,
        blind,
        type,
        seedProperty,
        seedAscending,
        visibility
      });

      let contenders = this.get('contenders');
      let cModels = contenders.map((contender) => {
        // split name off from the other contender attributes
        let {name, ...attributes} = contender;
        let cModel = self.store.createRecord('contender', {
          owner,
          name,
          attributes
        });
        // add the contender to the bracket
        bracket.get('contenders').addObject(cModel);
        // save the contender, then the post
        cModel.save().then(function() {
          // TODO should this be refactored so the map
          // returns a promise array and then we .then
          // on the promises.all or whatever and then
          // only do this save once?
          return bracket.save();
        });
        return cModel;
      });

      this.transitionToRoute('bracket', bracket);
    },
  }
});



/*
  parsedCSV: function(){
    let parsed = parseCSV(this.get('csvValue'));
    let parsedObjects = this.arraysToObject(parsed);
    return parsedObjects;
  }.property('csvValue'),
  arraysToObject: function(data){
    let keys = data.shift();
    let output = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = data[i][j];
      }
      output.push(obj);
    }
    return output;
  },
*/


