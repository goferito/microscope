Template.commentSubmit.created = function(){
  Session.set({'commentSubmitErrors': {}});
};


Template.commentSubmit.helpers({
  errorClass: function(field){
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  },

  errorMessage: function(field){
    return Session.get('commentSubmitErrors')[field];
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template){
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    var errors = {};
    if(!comment.body){
      errors.body = "Plase write some content";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(err, commId){
      if(err) return Error.throw(err.reason);

      $body.val('');
      
    });
  }
});

