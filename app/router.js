import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('welcome', {path: '/'});

  // brackets
  this.authenticatedRoute('bracket',  {path:'/brackets/:id'});
  this.authenticatedRoute('brackets', function() {
    this.route('new');
  });

  // contenders
  this.authenticatedRoute('contender',  {path:'/contenders/:id'});
  this.authenticatedRoute('contenders', function() {
    //this.route('new');
  });
});

export default Router;
