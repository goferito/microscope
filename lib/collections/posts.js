Posts = new Mongo.Collection('posts');


Posts.allow({
  update: function(userId, post){
    return ownsDocument(userId, post);
  },
  remove: function(userId, post){
    return ownsDocument(userId, post);
  },
});


Posts.deny({
  update: function(userId, post, fieldNames){
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier){
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});


Meteor.methods({
  postInsert: function(postAttributes){
    check(this.userId, String);
    check(postAttributes, {
      url: String,
      title: String
    });

    var errors = validatePost(postAttributes);
    if(Object.keys(errors).length){
      throw new Meteor.Error('invalid-post',
                             'You must set a title and URL for your post');
    }

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if(postWithSameLink){
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username || 'unknown',
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});


validatePost = function(post){
  var errors = {};
  if(!post.title){
    errors.title = 'Please, write the fucking title';
  }

  if(!post.url){
    errors.url = 'Please, write the fucking url';
  }

  return errors;
};

