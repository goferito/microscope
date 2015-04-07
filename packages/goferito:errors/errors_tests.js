Tinytest.add('Errors - collection', function (test) {
  test.equal(Errors.collection.find({}).count(), 0);

  Errors.throw('A new Error!');
  test.equal(Errors.collection.find({}).count(), 1);

  Errors.collection.remove({});
});

Tinytest.addAsync('Errors - template', function(test, done){
  Errors.throw('A new Error!');
  test.equal(Errors.collection.find({}).count(), 1);
  
  // Render the template
  UI.insert(UI.render(Template.meteorErrors), document.body);

  Meteor.setTimeout(function(){
    test.equal(Errors.collection.find({}).count(), 0);
    done();
  }, 3500);
});

