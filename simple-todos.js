Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.body.helpers({
    // get tasks from Mongo Database
    tasks: function(){
      return Tasks.find({});
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      // prevent default browser submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      // Clear form
      event.target.text.value = "";
    }
  });

}
