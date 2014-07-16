'use strict';


//http://repl.it/VXf/13
var c = function (input) {console.log(input);}

angular.module('angelApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    // var scrub = function (inputObject, skillsHash) {
    //   var length = inputObject.jobs.length;
    //   while (length--) {
    //     var tags = inputObject.jobs[length].tags;
    //     var tagsLength = tags.length;
    //     while (tagsLength--) {
    //       if (tags[tagsLength].tag_type === "SkillTag") {
    //         if (skillsHash[tags[tagsLength].display_name]) {
    //           skillsHash[tags[tagsLength].display_name]++;
    //         } else {
    //           skillsHash[tags[tagsLength].display_name] = 1;
    //         }
    //       }
    //     }
    //   }
    // };

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

    $scope.results = [
      { name: 'Angular.JS', value: 3 },
      { name: 'Front-End Development', value: 2 },
      { name: 'jQuery', value: 4 },
      { name: 'CSS', value: 6 },
      { name: 'HTML', value: 6 },
      { name: 'SOA', value: 1 },
      { name: 'Engineering Management', value: 1 },
      { name: 'Technical Leadership', value: 1 },
      { name: 'Scalable Systems', value: 1 },
      { name: 'Ruby', value: 3 },
      { name: 'Team Building', value: 1 },
      { name: 'E-Commerce', value: 1 },
      { name: 'HTML5 & CSS3', value: 4 },
      { name: 'Javascript', value: 14 },
      { name: 'Python', value: 7 },
      { name: 'Mootools', value: 1 },
      { name: 'PostgreSQL', value: 2 },
      { name: 'PHP', value: 9 },
      { name: 'Famo.us', value: 1 },
      { name: 'Ruby on Rails', value: 6 },
      { name: 'User Experience Design', value: 1 },
      { name: 'Urbuntu', value: 1 },
      { name: 'Amazon AWS', value: 1 },
      { name: 'Unix', value: 3 },
      { name: 'Linux', value: 3 },
      { name: 'Slim Framework', value: 1 },
      { name: 'Underscore.js', value: 1 },
      { name: 'Smarty', value: 1 },
      { name: 'Backbone.js', value: 3 },
      { name: 'Mobile', value: 2 },
      { name: 'Polymer', value: 1 },
      { name: 'Jetty', value: 1 },
      { name: 'Twitter Bootstrap', value: 1 },
      { name: 'Go', value: 1 },
      { name: 'Scala', value: 2 },
      { name: 'Perl', value: 1 },
      { name: 'AWS', value: 2 },
      { name: 'Facebook API', value: 1 },
      { name: 'Twitter API', value: 1 },
      { name: 'Node.js', value: 4 },
      { name: 'MongoDB', value: 3 },
      { name: 'Java', value: 3 },
      { name: 'iOS Development', value: 1 },
      { name: 'iOS', value: 1 },
      { name: 'Data Scientist', value: 1 },
      { name: 'R', value: 1 },
      { name: 'HTML/CSS/PHP/MYSQL', value: 2 },
      { name: 'AJAX', value: 4 },
      { name: 'Software Design (OOP & Functional Styles)', value: 1 },
      { name: 'C, C++, Python, Shell scripting, Linux/Unix, Qt, OpenGL', value: 1 },
      { name: 'Shell Scripting', value: 1 },
      { name: 'Ruby\\Rails', value: 1 },
      { name: 'ORM', value: 1 },
      { name: 'OOP', value: 1 },
      { name: 'Mvc', value: 1 },
      { name: 'Zend Framework', value: 1 },
      { name: 'Git', value: 1 },
      { name: 'MySQL', value: 3 },
      { name: 'Go Language', value: 1 },
      { name: 'Memcached', value: 1 },
      { name: 'Cassandra', value: 1 },
      { name: 'Redis', value: 1 },
      { name: 'Agile Software Develoment', value: 1 },
      { name: 'SQL', value: 1 },
      { name: 'LAMP Development', value: 1 },
      { name: 'Symfony', value: 1 },
      { name: 'University Degree In The Field Of Computer Science', value: 1 },
      { name: 'Proven Leader With Demonstrated Success In Hiring And Growing A High Performing, Collaborative, And Results Oriented Technology Team',
        value: 1 },
      { name: 'Excellent Written And Oral Communication Skills And Strong Interpersonal Skills',
        value: 1 },
      { name: 'Passion For Using Technology To Improve Education And Help People Learn And Teach',
        value: 1 },
      { name: 'Experience Managing Web Application Development (Html5 Products A Plus)',
        value: 1 },
      { name: 'Scripting in Perl', value: 1 },
      { name: 'Bash Scripting', value: 1 },
      { name: 'RESTful Services', value: 2 },
      { name: 'Troubleshooting & Problem Solving', value: 1 },
      { name: 'Documentation', value: 1 },
      { name: 'Technical Support', value: 1 },
      { name: 'CMS', value: 1 },
      { name: 'Web Development', value: 1 },
      { name: 'Customer Service', value: 1 },
      { name: 'Web Design', value: 1 },
      { name: 'JSON', value: 1 },
      { name: 'Digital Media', value: 1 },
      { name: 'Linux Development', value: 1 },
      { name: 'Compilers', value: 1 },
      { name: 'GUI Development', value: 1 },
      { name: 'Web Applications', value: 1 },
      { name: 'REST APIs', value: 1 },
      { name: 'OAuth APIs', value: 1 },
      { name: 'Amazon EC2', value: 1 },
      { name: 'APIs', value: 1 },
      { name: 'Elastic Search ', value: 1 },
      { name: 'Apache Solr', value: 1 },
      { name: 'Semantic Search', value: 1 },
      { name: 'Search', value: 1 }
    ];

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    var chartObject = {
      max: Math.max()
    }

$(function () {

      // Radialize the colors
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    // Build the chart
$('#container').highcharts({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    },
    title: {
        text: 'Most in demand developer skills on Angel List'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Top 10 share',
        data: [
            ['Javascript',   14/64],
            ['PHP',       9/64],
            ['Python',    7/64],
            ['CSS',     6/64],
            ['HTML',   6/64],
            ['Ruby on Rails', 6/64],
            ['AJAX', 4/64],
            ['jQuery', 4/64],
            ['Node.js', 4/64],
            ['HTML5 & CSS3', 4/64]
        ]
    }]
});
});




  });