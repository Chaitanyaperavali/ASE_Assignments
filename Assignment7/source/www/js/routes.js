angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('signIn', {
    url: '/page4',
    templateUrl: 'templates/signIn.html',
    controller: 'signInCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })
  
.state('home', {
    url: '/page9',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })


  .state('page2', {
    url: '/page10',
    templateUrl: 'templates/page2.html',
    controller: 'page2Ctrl'
  })
  
$urlRouterProvider.otherwise('/page4')

  

});