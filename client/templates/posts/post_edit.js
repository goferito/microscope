Template.postEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePost(postProperties);
    if(Object.keys(errors).length){
      return Session.set('postSubmitErrors', errors);
    }

    Posts.update(currentPostId, {$set: postProperties}, function(err, result){

      // Show the error and abort
      if(err) return throwError(err.reason);

      Router.go('postPage', {_id: currentPostId});
    });

  },

  'click .delete': function(e){
    e.preventDefault();

    if(confirm("Delete this post?")){
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});

Template.postEdit.created = function(){
  Session.set('postSubmitErrors', {});
};

Template.postEdit.helpers({
  errorMessage: function(field){
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function(field){
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

