//export default function randomWords() {
//  return true;
//}

let nouns = ["hate", "knowledge", "spring", "power", "secret", "government", "reaction", "tooth", "waves", "fall", "arm", "babies", "rose", "force", "earth", "sense", "destruction", "brother", "hook", "swing", "cellar", "stone", "cloth", "dispatch", "rain", "battle", "grouper", "burst", "mother", "whip", "powder", "committee", "angel", "demon", "church", "altar", "station", "suggestion", "road", "desert", "desire", "sleep", "time", "bird", "cage", "elephant", "spider", "motion", "selection", "farm", "connection", "needle", "wax", "dust", "prophet", "end", "tendency", "distance", "dirt", "throat", "spear", "arrow", "act", "drop", "cliff", "waterfall", "experience", "control", "noise", "train", "ball", "dog", "amount", "glove", "crayon", "base", "harbor", "sweater", "stage", "crow", "unicorn", "plunge", "tempest", "ship", "storm", "rage", "tundra", "covfefe", "weasel", "leopard", "eagle", "unicorn", "disaster", "fury"]; 

let adjectives = ["cluttered", "burly", "tiny", "clumsy", "ugly", "powerful", "messy", "permissible", "dull", "dusty", "thoughtful", "subsequent", "flawless", "quick", "dazzling", "upset", "kindly", "straight", "deafening", "colossal", "moaning", "oval", "probable", "stimulating", "gorgeous", "empty", "pathetic", "numerous", "wretched", "billowy", "tranquil", "thin", "wanting", "intelligent", "adorable", "snotty", "dizzy", "icy", "impolite", "rotten", "astonishing", "cute", "moldy", "sordid", "defeated", "chief", "steep", "ancient", "smart", "bite-sized", "bustling", "bright", "defective", "resolute", "fresh", "quickest", "dangerous", "narrow", "disastrous", "odd", "shut", "right", "fragile", "psychotic", "giant", "greedy", "illegal", "damaged", "ignorant", "testy", "symptomatic", "rightful", "abundant", "handy", "phobic", "vigorous", "good", "zombie", "fateful", "scorched", "fatal", "deadly", "square", "round", "killer", "blood", "crushed", "angry", "secret"];

let randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const funcs = {
  randomNoun() {
    return nouns[randomInt(0, nouns.length-1)];
  }, 
  randomAdjective() {
    return adjectives[randomInt(0, nouns.length-1)];
  }
};

export default funcs;
