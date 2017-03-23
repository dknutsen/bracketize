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
  headers: function(){
    let headers = {};
    this.get('contenders').forEach((contender) => {
      for (var property in contender) {
        if (contender.hasOwnProperty(property)) {
          headers[property] = property;
        }
      }
    }); 
    return headers;
  }.property('contenders', 'contenders.[]'),
  contenders: [
    {apple:1, pear:2, lemon:4, e:5},
    {a:0, b:0, c:0, d:0},
    {a:"q", b:"b", c:"c", d:"d", e:"e"}
  ],
  //

  actions: {
    tabChanged: function(newTab){
      this.set('inputMode', newTab.replace('Tab',''));
    },
    startQuickInput: function(){
      this.set('quickInput', true);
    },
    saveQuickInput: function(){
      this.set('quickInput', false);
    },
    cancelQuickInput: function(){
      this.set('quickInput', false);
    },
    addColumn: function(){

    },
    deleteColumn: function(prop){
      let contenders = this.get('contenders');
      contenders.forEach((contender)=>{
        delete contender[prop];
      });
      this.set('conteders', contenders);
    },
    addRow: function(){
      let headers = this.get('headers');
      let newRow = {};
      for (var property in headers) {
        if (headers.hasOwnProperty(property)) {
          newRow[property] = "";
        }
      }
      this.get('contenders').pushObject(newRow);
    },
    deleteRow: function(index){
      this.get('contenders').removeAt(index);
    }
  }
});
