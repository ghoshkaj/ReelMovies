'use strict';

angular.module('myApp.movieListView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/movieListView', {
        templateUrl: 'movieListView/movieListView.html',
        controller: 'movieListCtrl',
        css: 'movieListView/movieListView.css'
      });
    }])
    //Allows images to be pulled from the API link
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])

    .controller('movieListCtrl', function($scope,movieListFactory,movieDetailsFactory, $location){

        $scope.movieDetails = {};
        $scope.movieList = {};

        $scope.submitMovieName = function(){
            movieListFactory.callRottenTomatoes()
                .then(function(data) {
                    $scope.movieList = data.movies;
                }, function(data){
                    alert(data);
                })
        };

        $scope.submitMovieName();

        this.searchTerm = $scope.searchTerm;
        this.newSearchTerm = $scope.newSearchTerm;
        var path1 = "/movieListView";
        //this.movieId = $scope.movie.id;
        var path2 = "/movieDetailsView";


        $scope.updateMovieName = function(searchTerm){
            movieListFactory.setMovie(searchTerm);
            $location.path(path1);
        };

        $scope.searchMovie = function(newSearchTerm){
            $scope.updateMovieName(newSearchTerm);
            $scope.submitMovieName();
        };

        //$scope.submitMovieName();

        $scope.updateMovieId = function(movieId){
            movieDetailsFactory.setMovieId(movieId);
            $location.path(path2);
        };

        $scope.submitMovieId = function(){

            movieListFactory.callRottenTomatoesDetails()
                .then(function(data) {
                    $scope.movieDetails = data.movies;
                }, function(data){
                    alert(data);
                })
        };
    });
