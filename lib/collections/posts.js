Posts = new Mongo.Collection('posts');

Meteor.methods({
  postInsert: function(postAttributes){
    check(Meteor.userId(), String);
    check(postAttributes, {
      url: String,
      title: String
    });

    var user = Meteor.userId();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});

