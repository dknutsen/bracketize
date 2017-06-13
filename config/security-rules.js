{
  "rules": {
    "userData": {
      "$userId": {
        ".read": "auth.uid === $userId",
        ".write": "auth.uid === $userId"
      }
    },
    "brackets": {
      ".read": "auth != null",
      "$bracket":{
        ".write": "auth != null && (newData.child('owner').val() === auth.uid || data.child('owner').val() === auth.uid)"
        // add validation rules?
        // add index?
      },
    },
    "contenders": {
      ".read": "auth != null",
      "$contender":{
        ".write": "auth != null && (newData.child('owner').val() === auth.uid || data.child('owner').val() === auth.uid)"
        // add validation rules?
        // add index?
      },
    },
    "matches": {
      ".read": "auth != null",
      "$match":{
        ".write": "auth != null"
        // add validation rules?
        // add index?
      },
    },
    "rounds": {
      ".read": "auth != null",
      "$round":{
        ".write": "auth != null && (newData.child('owner').val() === auth.uid || data.child('owner').val() === auth.uid)"
        // add validation rules?
        // add index?
      },
    },
    "votes": {
      ".read":"auth != null",
      "$vote":{
        ".write": "auth != null && (newData.child('owner').val() === auth.uid || data.child('owner').val() === auth.uid)"
        // add validation rules?
        // add index?
      },
    }
    
//    "users": {
//      "$user": {
//        ".read": "data.child('public').val() == true"
//      }
//    }    
  }
}
