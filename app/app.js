'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
      'ngRoute',
      'myApp.movieListView',
      'myApp.movieDetailsView',
      'myApp.landingPageView',
      'myApp.version'
    ])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .otherwise({redirectTo: '/landingPageView'});
    }])
    .factory('movieListFactory', function($http, $q){
        var service = {};
        var urlBase = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=rx56tnnzu7bad72p2g2qgfms&q=';
        var urlExtension = "&page_limit=10&page=1&callback=JSON_CALLBACK";
        var _movieName = '';
        var _finalUrl = '';

        var makeSearchUrl = function(){
            _movieName = _movieName.split(' ').join('+');
            _finalUrl = urlBase + _movieName + urlExtension;
            return _finalUrl;
        };

        service.setMovie = function(movieName){
            _movieName = movieName;
        };

        service.getMovie = function( ){
            return _movieName;
        };

        service.callRottenTomatoes = function(){
            makeSearchUrl();
            var deferred = $q.defer();
            $http({
                method: 'JSONP',
                url:_finalUrl
            }).success(function(data){
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('There was an error')
            })
            return deferred.promise;
        };

        return service;
    })
    .factory('movieDetailsFactory', function($http, $q){
        var service = {};
        var urlBase = "http://api.rottentomatoes.com/api/public/v1.0/movies/";
        var _movieId='';
        var urlExtension = ".json?apikey=rx56tnnzu7bad72p2g2qgfms&callback=JSON_CALLBACK";
        var _finalUrl = '';

        var makeDetailsUrl = function(){
            _finalUrl = urlBase + _movieId + urlExtension;
            return _finalUrl;
        };

        service.setMovieId = function(movieId){
            _movieId = movieId;
        };

        service.getMovieId = function(){
            return _movieId;
        };

        service.callRottenTomatoesDetails = function(){
            makeDetailsUrl();
            var deferred = $q.defer();
            $http({
                method: 'JSONP',
                url:_finalUrl
            }).success(function(data){
                deferred.resolve(data);
                console.log(["success in  app.js"]);
            }).error(function() {
                deferred.reject('There was an error')
                console.log(["error in app.js"]);
            });
            return deferred.promise;
        };

        return service;
    })
    //Used for pulling in different CSS pages for different views
    // This directive is from SO: http://stackoverflow.com/questions/15193492/how-to-include-view-partial-specific-styling-in-angularjs
    .directive('head', ['$rootScope','$compile',
        function($rootScope, $compile){
            return {
                restrict: 'E',
                link: function(scope, elem){
                    var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                    elem.append($compile(html)(scope));
                    scope.routeStyles = {};
                    $rootScope.$on('$routeChangeStart', function (e, next, current) {
                        if(current && current.$$route && current.$$route.css){
                            if(!angular.isArray(current.$$route.css)){
                                current.$$route.css = [current.$$route.css];
                            }
                            angular.forEach(current.$$route.css, function(sheet){
                                delete scope.routeStyles[sheet];
                            });
                        }
                        if(next && next.$$route && next.$$route.css){
                            if(!angular.isArray(next.$$route.css)){
                                next.$$route.css = [next.$$route.css];
                            }
                            angular.forEach(next.$$route.css, function(sheet){
                                scope.routeStyles[sheet] = sheet;
                            });
                        }
                    });
                }
            };
        }
    ]);