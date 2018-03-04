import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('welcome', { path: '/' });

  // brackets
  this.authenticatedRoute('bracket', { path: '/brackets/:id' });
  this.authenticatedRoute('brackets', function() {
    this.route('new');
  });

  // contenders
  this.authenticatedRoute('contender', { path: '/contenders/:id' });
  this.authenticatedRoute('contenders', function() {
    // this.route('new');
  });

  // favorites
  this.authenticatedRoute('favorites');

  // matches
  this.authenticatedRoute('match', { path: '/matches/:id' });
});

export default Router;
