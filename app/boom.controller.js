(function() {
  'use strict';

  angular
    .module('Boom')
    .controller('BoomController', BoomController);

  BoomController.$inject = ['toastr', 'BoomFactory', '$sce'];

  /* @ngInject */
  function BoomController(toastr, BoomFactory, $sce) {
    var vm = this;

    vm.search = search;
    vm.getDownloadLink = getDownloadLink;

    vm.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    function search(song) {
      if (song === "") {
        toastr.error("You must enter a song name!");
      } else {
        BoomFactory.getMusic(song).then(
            function(response) {
              vm.resultsObject = response.data;
              vm.results = vm.resultsObject.data;

              // vm.results.forEach(function(result) {
              //   console.log(result);
              //   BoomFactory
              //     .getYoutubeID(result.title)
              //     .then(function(response) {
              //       result.youtubeID = response.data;
              //       console.log('Got youtube ID for ' + result.youtubeID);
              //     })
              //     .catch(function(error) {
              //       console.error(error);
              //     });
              // });
              if (vm.results.length > 0) {
                toastr.success('We have found songs with the name: ' + song);
                console.log(vm.results);
                vm.downloadLink1 = "";
                vm.song = "";
              } else {
                toastr.error("no results found for song: " + song);
              }
            })
          .catch(function(error) {
            if (error.data) {
              toastr.error('There was a big problem: ' + error.data.message);
            } else {
              toastr.info('no data in my data!');
            }
            console.log(error);
          });
      }
    }

    function getDownloadLink(song) {
      BoomFactory.getYoutubeID(song).then(
          function(response) {
            vm.downloadLink = response.data;
            vm.downloadLink1 = (vm.downloadLink.data)[0].link;
            toastr.success('found it');
            console.log(vm.downloadLink1);

          })
        .catch(function(error) {
          if (error.data) {
            toastr.error('There was a big problem: ' + error.data.message);
          } else {
            toastr.info('no data in my data!');
          }
          console.log(error);
        });
    }

  }
})();
