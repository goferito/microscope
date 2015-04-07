Template.postEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Posts.update(currentPostId, {$set: postProperties}, function(err){

      // Show the error and abort
      if(err) return throwError(err.reason);

      // Show the error but route anyway
      if(result.postExists) throwError('This link has already been posted');

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
