'use strict';

angular.module('myApp.movieDetailsView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/movieDetailsView', {
        templateUrl: 'movieDetailsView/movieDetailsView.html',
        controller: 'movieDetailsCtrl',
        css: 'movieDetailsView/movieDetailsView.css'
      });
    }])
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])
    .controller('movieDetailsCtrl', function($scope,movieDetailsFactory, movieListFactory, $location){
        //console.log([movieDetailsFactory.getMovieId()]);
        $scope.movieDetails = {};
        $scope.movieList = {};

        $scope.submitMovieId = function(){
            movieDetailsFactory.callRottenTomatoesDetails()
                .then(function(data) {
                    $scope.movieDetails = data;
                }, function(data){
                    alert(data);
                });
        };

        $scope.submitMovieId();

        $scope.updateMovieId = function(movieId){
            movieListFactory.setMovieId(movieId);
            $location.path(path);
        };

        //search bar functions

        this.searchTerm = $scope.searchTerm;
        this.newSearchTerm = $scope.newSearchTerm;
        var path1 = "/movieListView";
        //this.movieId = $scope.movie.id;
        var path2 = "/movieDetailsView";

        $scope.submitMovieName = function(){
            movieListFactory.callRottenTomatoes()
                .then(function(data) {
                    $scope.movieList = data.movies;
                }, function(data){
                    alert(data);
                })
        };

        $scope.updateMovieName = function(searchTerm){
            movieListFactory.setMovie(searchTerm);
            $location.path(path1);
        };

        $scope.searchMovie = function(newSearchTerm){
            $scope.updateMovieName(newSearchTerm);
            $scope.submitMovieName();
        };

    });
