import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  firebaseApp: service(),

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
    // this is for non-firebase auth providers (eg google, facebook, etc)
    signIn: function(provider) {
      this.get('session').open('firebase', { provider: provider}).then(() => {
        if(this.get('session.attemptedTransition')){
          this.get('session.attemptedTransition').retry();
        } else {
          this.transitionTo('/');
        }
      });
    },
    signOut: function() {
      this.get('session').close().then(() => {
        this.store.unloadAll();
        this.transitionTo('/');
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
