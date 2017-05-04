import Ember from 'ember';
import parseCSV from "../utils/parse-csv";
import parseJSON from "../utils/parse-json";

export default Ember.Component.extend({
  // if we are in 'quickInput' mode or not (CSV or JSON editor)
  quickInput: false,

  // which input mode we're currently in 
  inputMode: 'csv',
  
  parsedContenders: function(){
    let inputMode = this.get('inputMode');
    let textValue = this.get('textValue');
    let parsed = inputMode === 'csv' ? parseCSV(textValue) : parseJSON(textValue);
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

  // table
  //contenders: [],
  //columns: ['name'],
  headers: function(){
    let headers = {};
    this.get('contenders').forEach((contender) => {
      for (var property in contender) {
        if (contender.hasOwnProperty(property)) {
          let header = property.capitalize();
          headers[header] = property;
        }
      }
    }); 
    return headers;
  }.property('contenders', 'contenders.[]', 'columns', 'columns.[]'),


//  getContendersFromTable: function(){
//    return JSON.parse(JSON.stringify(this.get('contenders')));
//  },
  getContendersFromCSV: function(){
    let csvInputText = this.get('csvInputText');
    try {
      let parsed = parseCSV(csvInputText);
      let sparsed = this.arraysToObject(parsed);
      return sparsed;
    } catch(error) {
      return null;
    }
  },
  getContendersFromJSON: function(){
    let jsonInputText = this.get('jsonInputText');
    try {
      //let parsed = parseJSON(jsonInputText);
      let parsed = JSON.parse(jsonInputText);
      return parsed;
    } catch(error) {
      return null;
    }
  },
  contendersToCSV: function(){
    let contenders = this.get('contenders');
    let columns = this.get('columns');
    // set CSV text
    let csvText = columns.join(',') + '\n';
    contenders.forEach((contender) => {
      let line = [];
      columns.forEach((column) => {
        line.push(contender[column]);
      });
      csvText += line.join(',') + '\n';
    });
    return csvText;
  },
  contendersToJSON: function(){
    return JSON.stringify(this.get('contenders'), null, 2);
  },
  setContenderDataFromObjects(objects){
    let contenders = this.get('contenders');
//    let columns = this.get('columns');
    
    if(contenders.length !== objects.length){ return false; }

    let columns = {};   

    for(var i = 0; i<objects.length; i++){
      let cobj = objects[i];
      for (var property in cobj) {
        if (cobj.hasOwnProperty(property)) {
          let lowerProp = property.toLowerCase();
          Ember.set(contenders[i], lowerProp, cobj[property]);
          columns[lowerProp] = true;
        }
      }
    }
    this.set('columns', Object.keys(columns));
    return true;
  },

  actions: {
    tabChanged: function(newTab){
      this.set('inputMode', newTab.replace('Tab',''));
    },
    startQuickInput: function(){
/*
      let contenders = this.get('contenders');
      let columns = this.get('columns');
      // set CSV text
      let csvText = columns.join(',') + '\n';
      contenders.forEach((contender) => {
        let line = [];
        columns.forEach((column) => {
          line.push(contender[column]);
        });
        csvText += line.join(',') + '\n';
      });
*/
      this.set('csvInputText', this.contendersToCSV());
      this.set('jsonInputText', this.contendersToJSON());
      this.set('quickInput', true);
    },
    saveQuickInput: function(){
      let objects = this.getContendersFromCSV();
      let saved = this.setContenderDataFromObjects(objects);
      if(saved) {
        this.set('quickInput', false);
      }
    },
    cancelQuickInput: function(){
      this.set('quickInput', false);
    },

    addColumn: function(){
      this.sendAction('addColumn');
    },
    deleteColumn: function(prop){
      this.sendAction('deleteColumn', prop);
    },

    // column name editing
    editColumnName: function(header, prop){
      this.set('editingColumn', prop);
      this.set('editingColumnValue', header);
    },
    doneEditingColumnName: function(header, prop){
      let value = this.get('editingColumnValue').toLowerCase();
      // validate
      if(value === '' || value === 'name' || (this.get('headers')[value.capitalize()] && value !== prop)) {
        return;
      }
      this.set('editingColumn', null);
      this.sendAction('columnNameChanged', prop, value);
    },
  }
});
/*
      let contenders = this.get('contenders');
      contenders.forEach((contender)=>{
        delete contender[prop];
      });
      this.set('conteders', contenders);
*/
