import Ember from 'ember';
import parseCSV from "../utils/parse-csv";
import parseJSON from "../utils/parse-json";

export default Ember.Component.extend({
  quickInput: false,

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
/*
  contenders: [
    {apple:1, pear:2, lemon:4, e:5},
    {a:0, b:0, c:0, d:0},
    {a:"q", b:"b", c:"c", d:"d", e:"e"}
  ],
*/

  actions: {
    tabChanged: function(newTab){
      this.set('inputMode', newTab.replace('Tab',''));
    },
    startQuickInput: function(){
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
      this.set('csvInputText', csvText);
      // set JSON text
      this.set('jsonInputText', JSON.stringify(contenders, null, 2));
      this.set('quickInput', true);
    },
    saveQuickInput: function(){
      this.set('quickInput', false);
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
