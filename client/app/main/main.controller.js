'use strict';


//http://repl.it/VXf/11
var c = function (input) {console.log(input);}

angular.module('angelApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    var scrub = function (inputObject, skillsHash) {
      var length = inputObject.jobs.length;
      while (length--) {
        var tags = inputObject.jobs[length].tags;
        var tagsLength = tags.length;
        while (tagsLength--) {
          if (tags[tagsLength].tag_type === "SkillTag") {
            if (skillsHash[tags[tagsLength].display_name]) {
              skillsHash[tags[tagsLength].display_name]++;
            } else {
              skillsHash[tags[tagsLength].display_name] = 1;
            }
          }
        }
      }
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.getJobs = function(){
      var length;
      $scope.skillsHash = {};
      // too long!
      // $http.jsonp('https://api.angel.co/1/jobs?page=1&callback=JSON_CALLBACK')
      // .success(function(data){
      //   length = data.last_page;
      //   scrub(data, $scope.skillsHash);
      //   while (length > 1) {
      //     length--;
      //     $http.jsonp('https://api.angel.co/1/jobs?page=' + length + '&callback=JSON_CALLBACK')
      //     .success(function(data) {
      //       scrub(data, $scope.skillsHash)
      //       c($scope.skillsHash);
      //     })
      //   }
      // });
      $http.jsonp('https://api.angel.co/1/jobs?page=1&callback=JSON_CALLBACK')
      .success(function(data){
        length = 10;
        scrub(data, $scope.skillsHash);
        while (length > 1) {
          length--;
          $http.jsonp('https://api.angel.co/1/jobs?page=' + length + '&callback=JSON_CALLBACK')
          .success(function(data) {
            scrub(data, $scope.skillsHash)
            c($scope.skillsHash);
          })
        }
      });
    }

    $scope.results = { 'Angular.JS': 3,
      'Front-End Development': 1,
      jQuery: 4,
      CSS: 3,
      HTML: 4,
      'Web Analytics': 1,
      'UI/UX Design': 2,
      'User Interface Design': 3,
      Databases: 1,
      'Web Development': 1,
      'Information Security': 1,
      'Software Development': 1,
      'User Experience Design': 7,
      'Information Technology': 1,
      'Web Design': 3,
      'Ruby on Rails': 4,
      'iOS Development / Objective-C (Cocoa Touch)': 2,
      'Mobile Application Development': 3,
      'Mobile Development': 2,
      'Objective C': 1,
      SOA: 1,
      'Engineering Management': 1,
      'Technical Leadership': 1,
      'Scalable Systems': 1,
      Ruby: 1,
      'Team Building': 2,
      'E-Commerce': 1,
      'Internet Browsing': 1,
      'iOS Development': 3,
      'HTML5 & CSS3': 5,
      Javascript: 10,
      Python: 3,
      Mootools: 1,
      PostgreSQL: 2,
      PHP: 3,
      'Sales and Marketing': 8,
      'Operations Management': 1,
      'Human Resources': 2,
      'Business Operations': 1,
      'Famo.us': 1,
      iOS: 2,
      'Adobe Illustrator': 2,
      'Adobe Photoshop': 2,
      'Adobe Creative Suite': 1,
      Fireworks: 1,
      'Mobile Application Design': 2,
      'Press Release Writing': 1,
      'Press and Corporate Communications': 1,
      'Marketing Management': 1,
      'Social Media Marketing': 3,
      'Product Marketing': 3,
      Marketing: 1,
      'Twitter Marketing': 1,
      'Facebook Advertising': 1,
      Urbuntu: 1,
      'Amazon AWS': 1,
      Unix: 1,
      Linux: 1,
      'Slim Framework': 1,
      'Underscore.js': 1,
      Smarty: 1,
      'Backbone.js': 3,
      Mobile: 2,
      Polymer: 1,
      Jetty: 1,
      'Twitter Bootstrap': 1,
      Go: 1,
      Scala: 2,
      Perl: 1,
      AWS: 1,
      'Facebook API': 1,
      'Twitter API': 1,
      'Node.js': 2,
      MongoDB: 2,
      Java: 2,
      'Process Flows/Wireframes': 1,
      'Contextual Inquiry': 1,
      Personas: 1,
      'User Research': 1,
      'Data Scientist': 1,
      R: 1,
      'Grid Systems': 1,
      Iconography: 1,
      Typography: 1,
      'Print Design': 1,
      'Data Visualization': 1,
      'Adobe Premiere': 1,
      Mockups: 1,
      Dribbble: 1,
      'Adobe After Effects': 1,
      'iPhone / iPad Development': 1,
      'Brand and Identity Design': 1,
      'HTML/CSS/PHP/MYSQL': 2,
      AJAX: 1,
      'Tech Savvy': 1,
      Leadership: 2,
      Entrepreneurship: 1,
      'Growth Hacking': 1,
      'Word of Mouth Marketing': 1,
      'Business Development': 4,
      'Customer Service': 1,
      Design: 1,
      'Graphic Design': 1,
      Payroll: 1,
      Accounting: 1,
      Finance: 1,
      'SaaS Design': 1,
      'Data Science': 1,
      Analytics: 1,
      'Enterprise Software': 1,
      SaaS: 1,
      'Big Data': 1,
      'Product Management': 2,
      'Machine Learning': 1,
      'Data Mining': 1,
      'Sales/Marketing and Strategic Partnerships': 1,
      'Online Marketing Strategy': 1,
      'Online Marketing': 1,
      'Mobile Advertising': 1,
      'Consumer Internet': 1,
      Distribution: 1,
      'Amazon Web Services': 1,
      'Project Management': 1,
      Wordpress: 1,
      'Product Development': 1,
      'Sales and Account Management': 1,
      Sales: 3,
      'Sales Development': 1,
      'Sales Strategy and Management': 1,
      'Office Management': 1,
      Interviewing: 1,
      Recruiting: 1
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });


  });