import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['name', 'numContenders', 'blind', 'type'],
  name: null,
  blind: null, 
  typeOptions: ["Voted", "Predictive"],
  type: "Voted",
  numContendersOptions: [2, 4, 8, 16, 32, 64],
  numContenders: 16,


  actions: {
    submit: function(stuff){
      console.log(stuff);
    },
/*
    valueChanged: function(a, b, c) {
      console.log(a,b,c);
      this.set(a, b);
    }
*/
  }
});
