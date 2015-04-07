Template.meteorErrors.helpers({
  errors: function(){
    return Errors.collection.find();
  }
});

Template.meteorError.rendered = function(){
  var error = this.data;
  Meteor.setTimeout(function(){
    Error.collection.remove(error._id);
  }, 3000);
};

