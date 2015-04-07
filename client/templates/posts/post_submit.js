Template.postSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePost(post);
    if(Object.keys(errors).length){
      return Session.set('postSubmitErrors', errors);
    }

    Meteor.call('postInsert', post, function(err, result){

      // Show the error and abort
      if(err) return Errors.throw(err.reason);

      // Show the error but route anyway
      if(result.postExists) Errors.throw('This link has already been posted');

      Router.go('postPage', {_id: result._id});
    });
  }
});

Template.postSubmit.created = function(){
  Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
  errorMessage: function(field){
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function(field){
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

