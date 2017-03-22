import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['name', 'numContenders', 'blind', 'type', 'visibility'],
  name: null,
  blind: null, 
  numContendersOptions: [2, 4, 8, 16, 32, 64],
  numContenders: 16,
  typeOptions: ["Voted", "Predictive"],
  type: "Voted",
  visibilityOptions: ["Private", "Shared", "Public"],
  visibility: "Private",


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

  actions: {
    submit: function(form){
      console.log("REPLACE THIS WITH A RECORD CREATE");
      console.log({
        name: form.name,
        blind: form.blind,
        contenders: form.contenders,
        type: form.type,
        visibility: form.visibility
      });
    },
  }
});
