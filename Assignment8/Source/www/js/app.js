// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp=angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
      StatusBar.styleDefault();
    if(window.StatusBar) {
    }
  });
})
//Refrence: https://github.com/cfjedimaster/Cordova-Examples/tree/master/barcode

/*function auth()
{
   var login=document.getElementById('login');
 var password=document.getElementById('password');
    if(login=="admin"&&password="admin")
        {
            window.location="home.html";
        }
    else 
        alert("username and password incorrect")
}
*/
exampleApp.controller('ExampleController', function($scope, $http) {
 

 
});
