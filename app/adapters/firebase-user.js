import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
  /*

  This is for data that should be permissioned only for the owner,
  so we nest the data under the user id so the user must be signed
  in with that user to r/w the data

  Firebase security rules should look like:
  rules: {
    userData: {
      $userId: {
        read: "auth.uid === $userId",
        write: "auth.uid === $userId"
      }
    }
  }

  */
  pathForType(modelName) {
    let originalPath = this._super(modelName);
    return `userData/${this.get('session.uid')}/${originalPath}`;
  }
});
