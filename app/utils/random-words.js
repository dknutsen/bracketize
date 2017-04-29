export default function randomWords() {
  return true;
}

let nouns = ["hate", "knowledge", "spring", "power", "stop", "pocket", "government", "airplane", "popcorn", "reaction", "tooth", "relation", "waves", "fall", "woman", "arm", "babies", "rose", "pets", "force", "earth", "sense", "destruction", "taste", "plane", "brother", "effect", "hook", "caption", "cellar", "toe", "chalk", "tramp", "vacation", "cloth", "driving", "rain", "battle", "group", "burst", "mother", "education", "whip", "powder", "committee", "advertisement", "toes", "cherries", "church", "language", "station", "eggnog", "suggestion", "history", "furniture", "design", "road", "desire", "sleep", "calendar", "bird", "motion", "selection", "farm", "connection", "lunch", "wine", "needle", "arch", "wax", "dust", "minister", "end", "pump", "tendency", "head", "distance", "dirt", "throat", "recess", "rod", "man", "act", "experience", "control", "beginner", "low", "noise", "trains", "volleyball", "dog", "apparel", "amount", "glove", "crayon", "base", "harbor", "sweater", "stage", "crow"];

let adjectives = ["periodic", "tasteful", "cluttered", "burly", "miniature", "damp", "cowardly", "clumsy", "ugliest", "joyous", "wary", "sulky", "powerful", "messy", "gamy", "imported", "permissible", "actually", "puzzled", "woebegone", "luxuriant", "overjoyed", "dull", "acidic", "dusty", "bawdy", "thoughtful", "disagreeable", "versed", "subsequent", "flawless", "quick", "dazzling", "upset", "kindly", "ad hoc", "straight", "deafening", "colossal", "moaning", "oval", "probable", "stimulating", "well-off", "gorgeous", "empty", "sincere", "tawdry", "pathetic", "numerous", "wretched", "billowy", "tranquil", "thin", "wanting", "intelligent", "adorable", "snotty", "dizzy", "icy", "impolite", "rotten", "astonishing", "cute", "moldy", "sordid", "defeated", "chief", "steep", "ancient", "smart", "bite-sized", "bustling", "bright", "defective", "resolute", "fresh", "quickest", "dangerous", "narrow", "disastrous", "odd", "shut", "right", "fragile", "racial", "psychotic", "giant", "greedy", "illegal", "damaged", "ignorant", "testy", "symptomatic", "rightful", "abundant", "handy", "phobic", "vigorous", "good"];

let randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const funcs = {
  randomNoun() {
    return nouns[randomInt(0, nouns.length)];
  }, 
  randomAdjective() {
    return adjectives[randomInt(0, nouns.length)];
  }
};

export default funcs;
