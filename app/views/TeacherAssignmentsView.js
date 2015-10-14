var TeacherAssignmentsEntry = Parse.Object.extend({
  className: "Assignment"
});

var TeacherAssignmentsEntryView = Parse.View.extend({

  tagName: "tr",
  template: _.template($('#teacherassignments-entry-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var TeacherAssignmentsView = Parse.View.extend({

  el: "#content-container",
  schedules: null,

  events: {
    'click #add-teacherassignments-button' : 'showAddTeacherAssignmentsModal',
    'click #cancel-add-teacherassignments-modal-button' : 'hideAddTeacherAssignmentsModal',
    'click #add-teacherassignments-modal-button' : 'addTeacherAssignments',
    'click #remove-teacherassignments-button' : 'removeTecherAssignments'
  },

  initialize: function() {
    this.fetchTeacherAssignments();
  },

  fetchTeacherAssignments: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[TeacherAssignmentsView] fetchTeacherAssignments');

    $('.activity-indicator-container').show();
    $('#teacherassignments-table').hide();

    var self = this;

    var query = new Parse.Query('TeacherAssignments');
    query.equalTo('users', Parse.User.current());

    query.find({
      success: function(teacherassignments) {
        debugLog('[TeacherAssignmentsView] fetchTeacherAssignments success!');

        $('.activity-indicator-container').fadeOut(1000);
        $('#teacherassignments-table').fadeIn(1000);

        self.loadTeacherAssignments(teacherassignments);
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  loadTeacherAssignments: function(teacherassignments) {
    debugLog('[TeacherAssignmentsView] loadTeacherAssignments');

    for (var i = 0; i < teacherassignments.length; i++)
    {
      var view = new TeacherAssignmentsEntryView({model: teacherassignments[i]});
      $("#teacherassignments-table").append(view.render().el);
    }
  },

  showAddTeacherAssignmentsModal: function() {
    debugLog('[TeacherAssignmentsView] showAddTeacherAssignmentsModal');

    $('#add-teacherassignments-modal').modal('show');
  },

  hideAddTeacherAssignmentsModal: function() {
    debugLog('[TeacherAssignmentsView] hideAddTeacherAssignmentsModal');

    $('#add-teacherassignments-modal').modal('hide');
  },

  addTeacherAssignments: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[TeacherAssignmentsView] addTeacherAssignments');

    var self = this;

    var title = $('#teacherassignments-title-input').val();
	var url = $('#teacherassignments-url-input').val();
	var assignmentdescription = $('#teacherassignments-description-input').val();
	
    var TeacherAssignments = Parse.Object.extend('TeacherAssignments');

    var query = new Parse.Query('TeacherAssignments');
    query.equalTo('title', title);

    query.first({
      success: function(theTeacherAssignments) {
        debugLog('[TeacherAssignmentsView] addTeacherAssignments success!');

        if (!theTeacherAssigments) {
          var TeacherAssignments = Parse.Object.extend('TeacherAssignments');
          theTeacherAssignments = new TeacherAssignments();
        }

        theTeacherAssignments.set('title', $('#teacherassignments-title-input').val());
		theTeacherAssignments.set('url', $('#teacherassignments-url-input').val());
		theTeacherAssignments.set('title', $('#teacherassignments-title-input').val());
        theTeacherAssignments.add('users', Parse.User.current());

        theTeacherAssignments.save(null, {
          success: function(success) {
            debugLog('[TeacherAssignmentsView] addTeacherAssignments success!');

            self.hideAddTeacherAssignmentsModal();
            location.reload();

            $(self.el).prepend($("#success-alert-template").html());

            $('#success-alert-label').text("Success! Your file has been successfully saved.");
          },
          error: function(error) {
            if (error)
              self.handleError(error);
          }
        });
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  removeTeacherAssignments: function(sender) {
    debugLog("[TeacherAssignemtsView] removeTeacherAssignments");

    $("#error-alert").remove();
    $("#success-alert").remove();

    var row = sender.currentTarget.parentNode.parentNode;
    var teacherassignmentsName = $(row).children('#teacherassignments-title-label').text();

    var self = this;

    var TeacherAssignments = Parse.Object.extend('TeacherAssignments');

    var query = new Parse.Query('TeacherAssignments');
    query.equalTo('title', title);

    query.first({
      success: function(theTeacherAssignments) {
        debugLog('[TeacherAssignmentsView] removeTeacherAssignments success!');

        if (theTeacherAssignments) {
          theTeacherAssignments.set('title', title);
          theTeacherAssignments.remove('users', Parse.User.current());

          theTeacherAssignments.save(null, {
            success: function(success) {
              debugLog('[TeacherAssignmentsView] addTeacherAssignments success!');

              row.remove();

              $(self.el).prepend($("#success-alert-template").html());

              $('#success-alert-label').text("Success! " + teacherassignmentsName + " has been successfully removed.");
            },
            error: function(error) {
              if (error)
                self.handleError(error);
            }
          });
        }
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  handleError: function(error) {
    debugLog("[TeacherAssignmentsView] handleError");

    switch(error.code) {
      default: {
        $(this.el).prepend($('#error-alert-template').html());

        $('#error-alert-label').text('Uh Oh! An unknown error occurred.');
      }
      break;
    }
  }
});

$(function() {
  new TeacherAssignmentsView();
});