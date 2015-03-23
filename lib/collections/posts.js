Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc){
    // Allow only if logged in
    return !! userId;
  }
});


