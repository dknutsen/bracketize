# bracketize

### Main page
large format text with stylized underline `<input>`: "I want to bracketize `_________`. -> `bracket_name`
On submit, check authentication
  - if not authenticated go to login w encodeURIComponent query param `bracket_name`
  - if authenticated, go to create bracket route with query param `bracket_name`

### login
for starters just use google, add facebook, etc. later 

### create bracket
  - `# contestants`: powers of two from 2 to... 64? 128?
  - `
  - `visibility`: private (only i can see it), secret (anyone can see but they need a link), public (anyone can see it)

### my brackets
list of brackets that i have created with edit/delete buttons and a button to add a new bracket

### public brackets









This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd bracketize`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
