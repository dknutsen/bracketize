# bracketize

# q's
- what are the guidelines for 2-way relationships, etc in firebase? Should they be used? How should that be done?


# Models
- Bracket (belongsTo user/id, has many contenders, has many votes, has many users(?), has many matches, has many rounds
- Contender (belongsTo many brackets? belongsTo many matches/rounds
- Match (belongsTo bracket, belongsTo round? has two contenders, has winner (either predicted or voted)
- Round (belongsTo bracket, hasMany matches, hasMany contenders which are unique per round)
- User (does firebase have a default user model of some sort? if not what all would we want on it? how much is required? ID, name, username, etc)
    - hasMany brackets, hasMany votes
- 

# security rules
- Bracket
    - can a bracket be moved from public to private? 
    - should all brackets be in public/shared or root level key? 
    - security rule should be: only owner can read AND write, anyone can see public bracket, worry about "shared" brackets later. 
- Votes 
    - is any part of the vote model private to the vote owner? Shouldn't be right?
    - if bracket is voted and has not begun voting is not possible (no writes)
    - If bracket is open and voted, votes can only be seen by bracket owner and vote owner
    - If bracket is closed and voted, votes can be seen by anyone who can see the bracket?
    - if bracket is predictive and hasn't started yet votes can be cast but no one can see them except vote owner
    - If bracket is open and predictive, anyone who can see bracket can see predictions?
    - if bracket is finished and predictive anyone who can see bracket can see it?
- Matches/Rounds
    - Read only (except for bracket owner who can control current round and match permissions)
    - inherit bracket read permissions

# brackets
- if a bracket is blind then should the seeds not be shown? and the matches should probably be randomized within the round too (for the non-owner)

# contenders
- give the contender a fake name when it is created? or should this be done on the fly?


# views

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
