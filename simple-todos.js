Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.body.helpers({
    // get tasks from Mongo Database
    tasks: function(){
      if (Session.get("hideCompleted")) {
        // if hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function(){
      return Session.get("hideCompleted");
    },
    incompleteCount: function(){
      return Tasks.find({checked: {$ne: true}}).count();
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
        createdAt: new Date(),
        owner: Meteor.userId(),             // _id of logged in user
        username: Meteor.user().username    // username of logged in user
      });

      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function(event){
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.body.events({
    "click .toggle-checked": function(){
      // Update DB - set checked property to opposite of current
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function(){
      Tasks.remove(this._id);
    }
  });

    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
    });

}
