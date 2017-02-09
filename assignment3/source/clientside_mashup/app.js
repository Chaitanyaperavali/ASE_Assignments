/**
 * Created by chaitanya on 05/02/2017.
 */

var ase3 = angular.module('ase3',['ngRoute']);

ase3.config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"login/login.html",
        controller:"loginController"
    }).when("/home",{
        templateUrl:"home/home.html",
        controller:"homeController"
    }).when("/movieDetails",{
        templateUrl:"home/movieDetails.html",
        controller:"movieDetailsController"
    })
});

