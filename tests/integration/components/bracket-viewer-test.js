import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bracket-viewer', 'Integration | Component | bracket viewer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bracket-viewer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bracket-viewer}}
      template block text
    {{/bracket-viewer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
