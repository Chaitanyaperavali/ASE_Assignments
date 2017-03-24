/**
 * Created by chait on 05/02/2017.
 */
var homeController = angular.module('ase').controller('homeController', function ($scope, $http,$rootScope) {
        $scope.movieDetails = [];
        $scope.search = function () {
            var api_key = "8eab38607dae9687def5b02c8102bc82";
            var searchQuery = $scope.searchValue;
            $http.get("https://api.themoviedb.org/3/search/movie?api_key=" + api_key +
                "&page=1&include_adult=false&query=" + searchQuery)
                .then(function (response) {
                        if (response != null && response.data != null && response.data.results != undefined
                            && response.data.results != null && response.data.results.length>0) {
                            var j=0;
                            document.getElementById("err_msg").innerHTML = "";
                            $scope.movieDetails = [];
                                for (var i = 0; i < response.data.results.length; i++) {
                                    if (response.data.results[i].poster_path !== null) {
                                        $scope.movieDetails[j] = {
                                            "poster_path": "https://image.tmdb.org/t/p/w300/" + response.data.results[i].poster_path,
                                            "description": response.data.results[i].overview,
                                            "id": response.data.results[i].id,
                                            "original_title": response.data.results[i].original_title,
                                            "title": response.data.results[i].title,
                                            //"backdrop_path": "https://image.tmdb.org/t/p/w300/"+response.data.results[i].backdrop_path,
                                            "popularity": response.data.results[i].popularity,
                                            "vote_count": response.data.results[i].vote_count,
                                            "video": response.data.results[i].video,
                                            "vote_average": response.data.results[i].vote_average,
                                            "id": response.data.results[i].id
                                        }
                                        j++;
                                    }
                                    if(j==4){
                                        break;
                                    }
                                }
                        }
                        else{
                            document.getElementById("err_msg").innerHTML = "Please try different movie!!"
                        }
                    }, function (response) {
                        document.getElementById("err_msg").innerHTML = "Something went wrong...Please try again later!"
                    }
                );
        }
        $scope.getClickedEvent = function(id){
            $rootScope.clickParam = id;
        }
        $scope.init = function () {
            //console.log($scope.searchValue);
            $scope.searchValue = $rootScope.search;
            if ($scope.searchValue === undefined) {
                $scope.searchValue = "avengers";
            }
            $scope.search();
        }
        $scope.init();

    }
    )

    ;
