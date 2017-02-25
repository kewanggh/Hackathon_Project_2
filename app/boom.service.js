(function() {
  'use strict';

  angular
    .module('Boom')
    .factory('BoomFactory', BoomFactory);

  BoomFactory.$inject = ['$http', '$q'];

  /* @ngInject */
  function BoomFactory($http, $q) {
    var service = {
      getMusic: getMusic,
      getYoutubeID: getYoutubeID,
      getLyrics: getLyrics
    };

    return service;

    function getMusic(song) {
      var defer = $q.defer();

      $http({
        method: 'GET',
        url: ('https://deezerdevs-deezer.p.mashape.com/search?q=' + song)
      }).then(function(response) {
        if (typeof response.data === 'object') {
          defer.resolve(response);
        } else {
          defer.reject('no data found :(');
        }
      }, function(error) {
        //catch statement
        console.log(error);
        defer.reject(error);
      });

      return defer.promise;
    }

    function getYoutubeID(song) {
      var defer = $q.defer();

      $http({
        method: 'GET',
        url: 'https://kashyap32-youtubetomp3-v1.p.mashape.com/' + song
      }).then(function(response) {
        if (typeof response.data === 'object') {
          defer.resolve(response);
        } else {
          defer.reject('no data found :(');
        }
      }, function(error) {
        //catch statement
        console.log(error);
        defer.reject(error);
      });

      return defer.promise;
    }

    function getLyrics(name, song) {
      var defer = $q.defer();

      $http({
        method: 'GET',
        url: ('https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/matcher.lyrics.get?q_artist=' + name + '&q_track=' + song)
      }).then(function(response) {
        if (typeof response.data === 'object') {
          defer.resolve(response);
        } else {
          defer.reject('no data found :(');
        }
      }, function(error) {
        //catch statement
        console.log(error);
        defer.reject(error);
      });

      return defer.promise;
    }



  }
})();
