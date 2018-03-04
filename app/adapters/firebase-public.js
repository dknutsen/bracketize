import FirebaseAdapter from 'emberfire/adapters/firebase';

export default FirebaseAdapter.extend({
  /*

  Firebase security rules should look like:
  rules {
    ...
    publicData: {
      read: "*",
    },
    ...
  */
  pathForType(modelName) {
    let originalPath = this._super(modelName);
    return `publicData/${originalPath}`;
  }
});
