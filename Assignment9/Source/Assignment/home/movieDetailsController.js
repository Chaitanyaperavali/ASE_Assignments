/**
 * Created by chaitanya on 07/02/2017.
 */
var movieDetailsController = angular.module('ase').controller('movieDetailsController', function ($scope, $http, $location, $rootScope) {
    $scope.search = function () {
        $location.path("/home");
        $rootScope.search = $scope.searchValue;
    };
    $scope.movie = null;
    $scope.movieId = $rootScope.clickParam;
    $scope.movieSentiment = null;
    $scope.init = function () {
        $http.get("https://api.themoviedb.org/3/movie/" + $scope.movieId + "?api_key=8eab38607dae9687def5b02c8102bc82")
            .then(function (response) {
                if (response != null && response.data != null && response.data.overview != undefined) {
                    $scope.movie = {
                        "poster_path": "https://image.tmdb.org/t/p/w300/" + response.data.poster_path,
                        "description": response.data.overview,
                        "id": response.data.id,
                        "original_title": response.data.original_title,
                        "title": response.data.title,
                        "backdrop_path": "https://image.tmdb.org/t/p/w1280/" + response.data.backdrop_path,
                        "popularity": response.data.popularity,
                        "vote_count": response.data.vote_count,
                        "video": response.data.video,
                        "vote_average": response.data.vote_average,
                        "id": response.data.id
                    }
                    if ($scope.movie.description != null && $scope.movie.description != undefined) {
                        document.getElementById("table").style.display = "block";
                        $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                            "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                            "&outputMode=json&text=" + $scope.movie.description)
                            .then(function (response) {
                                if (response != null && response.data != null && response.data.docSentiment != null) {
                                    $scope.movieSentiment = {
                                        "type": response.data.docSentiment.type,
                                        "score": response.data.docSentiment.score
                                    };
                                }
                            }, function (response) {
                                console.log("some error occured in pulling data from ibm servers request");
                                document.getElementById("table").style.display = "none";
                            });
                    }
                }
            }, function (response) {
                console.log("some error occured in get request");
            });
    };
    $scope.init()
});