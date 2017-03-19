import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  afterModel: function(){
    // if we want to auto-create reocrds at any point
    /*
    var self = this;
    self.store.findRecord('item', "root").catch(function(error){
      var root = self.store.createRecord('item', {
        title: "root"
      });
      root.set('id',"root");
      root.save();
    });
    */
  },

  actions: {
    // this is for non-firebase login
    signIn: function(provider) {
console.log(ENV);
      var self = this;
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        console.log(data.currentUser);
        self.transitionTo('welcome');
      });
    },
    signOut: function() {
      var self = this;
      this.get('session').close().then(function(){
        self.store.unloadAll();
        self.transitionTo('/');
      });
    },
    accessDenied() {
      this.transitionTo('login');
    },
    reloadApp(){
      window.location.reload();
    }
  }
});
