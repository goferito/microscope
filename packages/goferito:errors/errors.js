
Errors = {
  // Client-only collection
  collection: new Mongo.Collection(null),

  throw: function(msg){
    Errors.collection.insert({msg: msg, seen: false});
  }
};

