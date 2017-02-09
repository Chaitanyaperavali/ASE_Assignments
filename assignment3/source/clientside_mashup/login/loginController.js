/**
 * Created by chaitanya on 05/02/2017.
 */
var loginController = angular.module('ase3').controller('loginController', function ($scope, $http, $location,$timeout) {
    $scope.statusChangeCallback = function (response) {
        if (response.status === 'connected') {
            $scope.redirect();
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        } else {
            FB.login(function (response) {
                if (response.authResponse) {
                    console.log("access token: "+response.authResponse.accessToken);
                    console.log("expiresIn: "+response.authResponse.expiresIn);
                    console.log("signedRequest: "+response.authResponse.signedRequest);
                    console.log("userID: "+response.authResponse.userID);
                }
                if (response.status === 'connected') {
                    $scope.redirect();
                }
            });
        }
    }
    $scope.checkLoginState = function () {
        FB.getLoginStatus(function (response) {
            $scope.statusChangeCallback(response);
        });
    }
    $scope.loginFacebook = function () {
        //login with Facebook
        //Loading FB SDK asynchronsoly
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            console.log("i am loading asyncsly")
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function () {
            console.log("inside window async loading")
            FB.init({
                appId: '1722252558014261',
                cookie: true,  // enable cookies to allow the server to access
                               // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8'
            });
        };
        //to check login status
        $scope.checkLoginState();
    }
    $scope.redirect=function(){
        $timeout(function() {
            $location.path("/home");
        }, 0);

    }
    $scope.loginApplication = function (name, password) {
        console.log("inside login method")
        //var user = [name,password]
        if (typeof(name) !== undefined) {
            localStorage.setItem(name, password);
        }
        if (localStorage.length > 0 && localStorage.getItem(name) !== undefined && $scope.name != undefined) {
            $location.path('/home');
        }

    };
});