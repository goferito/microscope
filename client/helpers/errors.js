
Errors = new Mongo.Collection(null);

throwError = function(msg){
  Errors.insert({msg: msg});
};
