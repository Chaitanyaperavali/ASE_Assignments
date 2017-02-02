/**
 * Created by chaitanya on 28/01/2017.
 */
var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "login.html",
        controller: "loginController"
    }).when("/register", {
        templateUrl: "register.html",
        controller: "registerController"
    }).when("/home", {
        templateUrl: "home.html",
        controller: "homeController"
    })
});

app.controller('loginController', function ($scope, $location) {
    console.log("inside login controller");
    $scope.saveDetails = function (name, password) {
        //var user = [name,password]
        if (typeof(name) !== undefined) {
            localStorage.setItem(name, password);
        }
        if (localStorage.length > 0 && localStorage.getItem(name) !== undefined && $scope.name != undefined) {
            //window.location = "#/home.html";
            $location.path('/home');
        }

    };


    $scope.toRegister = function () {
        //window.location = "/register.html";
        $location.path('/register');
    };
});

app.controller('registerController', function ($scope, $location) {
    if (typeof(name) !== undefined) {
        localStorage.setItem(name, password);
    }
    if (localStorage.length > 0 && localStorage.getItem(name) !== undefined) {
        $location.path('/home');
        //window.location = "#/home.html";

    }

});

app.controller('homeController', function ($scope, $location) {
    console.log("inside homeController");
    var mapOptions;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();
    var oApiKey = '3ef6eb1c850464374366bcadb77821b4';
    var map;
    var weatherResults;

    $scope.initialize = function () {
        console.log("inside initilize function");
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 3,
            center: pos
        }
        map = new google.maps.Map(document.getElementById('map-room'), mapOptions);
        //console.log(typeof(map));
        directionsDisplay.setMap(map);
    }

    $scope.calculateRoute = function () {
        var start = document.getElementById('start').value;
        var end = document.getElementById('end').value;
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
        });
    };


    var originPlaceId = null;
    var destinationPlaceId = null;
    var originWeatherString=null;
    var destinationWeatherString=null;
    $scope.autoCompletePlaces = function (map) {

        var originInput = document.getElementById('start');
        var destinationInput = document.getElementById('end');

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

        $scope.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        $scope.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
        var oLat = originAutocomplete.getPlace().geometry.location.lat();
        var oLong = originAutocomplete.getPlace().geometry.location.lng();
        var dLat = destinationAutocomplete.getPlace().geometry.location.lat();
        var dLong = destinationAutocomplete.getPlace().geometry.location.lng();
        originWeatherString = $scope.getWeatherData(oLat,oLong);
        destinationWeatherString = $scope.getWeatherData(oLat,oLong);

    }

    $scope.setupPlaceChangedListener = function (autocomplete, mode) {
        autocomplete.bindTo('bounds', map);
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }
            if (mode === 'ORIG') {

                originPlaceId = place.place_id;

            } else {

                destinationPlaceId = place.place_id;

            }
        });

    };
    google.maps.event.addDomListener(window, 'load', $scope.initialize());

    $scope.getWeatherData=function (lat,long) {
        var weather_data = JSON.parse('http:// api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=' + oApiKey);
        weatherResults.append("Weather For: " + weather_data.name + '<br/>');
        weatherResults.append("Current: " + weather_data.main.temp + '&deg;F<br/>');
        return weatherResults;
    }
});