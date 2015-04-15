'use strict';

angular.module('myApp.landingPageView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landingPageView', {
    templateUrl: 'landingPage/landingPageView.html',
    controller: 'landingPageCtrl',
    css: 'landingPage/landingPageView.css'
  });
}])

//.controller('landingPageCtrl', ['$scope', '$http',
//      function($scope, $http) {
//
//        var urlBase = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=rx56tnnzu7bad72p2g2qgfms&q=";
//        var urlExtension = "&page_limit=10&page=1&callback=JSON_CALLBACK";
//        //var searchTerm = "Jack";
//        //var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=rx56tnnzu7bad72p2g2qgfms&q=Jack&page_limit=1&callback=JSON_CALLBACK";
//        var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=rx56tnnzu7bad72p2g2qgfms&callback=JSON_CALLBACK";
//
//        //getMovies($scope.searchTerm);
//        this.searchTerm = $scope.searchTerm;
//        console.log(["boop"]);
//
//        $scope.getMovies = function(searchTerm) {
//          if(searchTerm != null){
//            url = urlBase + searchTerm + urlExtension;
//          };
//          $http.jsonp(url)
//              .success(function (data) {
//                console.log(["http getMovies success"]);
//                $scope.results = data.movies;
//              })
//              .error(function (error) {
//                $scope.error = "Request failed";
//                console.log(["http getMovies failure"]);
//              });
//        };
//
//        this.movieId = $scope.movieId;
//
//        $scope.getDetails = function(movieId) {
//          url = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + movieId+ ".json?apikey=rx56tnnzu7bad72p2g2qgfms&callback=JSON_CALLBACK";
//          $http.jsonp(url)
//              .success(function (data) {
//                console.log(["http getDetails success"]);
//                $scope.title = data.title;
//                $scope.synopsis = data.synopsis;
//                $scope.genre = data.genre;
//                $scope.rating = data.mpaa_rating;
//                $scope.directors = data.abridged_directors;
//                $scope.runtime = data.runtime;
//
//              })
//              .error(function (error) {
//                $scope.error = "Request failed";
//                console.log(["http getDetails failure"]);
//              });
//        }
//
//      }])
    .filter('trusted', ['$sce', function ($sce) {
      return function(url) {
        return $sce.trustAsResourceUrl(url);
      };
    }])
    .controller('landingPageCtrl', function($scope,movieListFactory, $location){
        $scope.data = {};
        this.searchTerm = $scope.searchTerm;
        var path = "/movieListView";

        $scope.updateMovieName = function(searchTerm){
            movieListFactory.setMovie(searchTerm);
            $location.path(path);
        };


        //console.log([movieListFactory.getMovie()]);
        //$scope.submitMovieName = function(){
        //    console.log([movieListFactory.getMovie()]);
        //    movieListFactory.callRottenTomatoes()
        //        .then(function(data) {
        //            $scope.results = data.movies;
        //        }, function(data){
        //            alert(data);
        //        })
        //}
    });