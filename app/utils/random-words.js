// export default function randomWords() {
//  return true;
// }

let nouns = [
  'altar',
  'angel',
  'arrow',
  'battle',
  'brother',
  'burst',
  'cage',
  'cellar',
  'cliff',
  'connection',
  'control',
  'covfefe',
  'demon',
  'desert',
  'desire',
  'destruction',
  'disaster',
  'dispatch',
  'distance',
  'dog',
  'dragon',
  'dust',
  'eagle',
  'earth',
  'elephant',
  'explosion',
  'fall',
  'fang',
  'farm',
  'force',
  'fury',
  'golem',
  'grouper',
  'hand',
  'harbor',
  'hate',
  'hook',
  'knowledge',
  'leopard',
  'lightning',
  'mantis',
  'matrix',
  'mother',
  'motion',
  'needle',
  'ninja',
  'noise',
  'plunge',
  'power',
  'prophet',
  'rage',
  'rain',
  'rapture',
  'raven',
  'road',
  'rose',
  'secret',
  'sense',
  'shark',
  'ship',
  'sleep',
  'spear',
  'spider',
  'spring',
  'station',
  'stone',
  'storm',
  'strike',
  'swing',
  'tempest',
  'thunder',
  'tiger',
  'time',
  'tornado',
  'totality',
  'train',
  'tundra',
  'unicorn',
  'unicorn',
  'waterfall',
  'waves',
  'weasel',
  'whip'
];

let adjectives = [
  'ancient',
  'angry',
  'blood',
  'chief',
  'colossal',
  'corpulent',
  'crucial',
  'crushed',
  'damaged',
  'dangerous',
  'dazzling',
  'deadly',
  'deafening',
  'death',
  'defeated',
  'disastrous',
  'double',
  'dusty',
  'empty',
  'epic',
  'eternal',
  'fatal',
  'fateful',
  'flawless',
  'fragile',
  'fresh',
  'giant',
  'greedy',
  'gruesome',
  'heavy',
  'icy',
  'ignorant',
  'jolly good',
  'killer',
  'moldy',
  'pathetic',
  'powerful',
  'psychotic',
  'rightful',
  'rotten',
  'scorched',
  'secret',
  'seventh',
  'sordid',
  'tiny',
  'tranquil',
  'ugly',
  'undead',
  'weathered',
  'whispering',
  'wicked',
  'withered',
  'wretched'
];

let randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const funcs = {
  randomNoun() {
    return nouns[randomInt(0, nouns.length - 1)];
  },
  randomAdjective() {
    return adjectives[randomInt(0, adjectives.length - 1)];
  }
};

export default funcs;
