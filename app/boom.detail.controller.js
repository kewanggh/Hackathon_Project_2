(function() {
  'use strict';

  angular
    .module('Boom')
    .controller('BoomDetailController', BoomDetailController);

  BoomDetailController.$inject = ['BoomFactory', '$stateParams', 'toastr'];

  /* @ngInject */
  function BoomDetailController(BoomFactory, $stateParams, toastr) {
    var vm = this;

    getCurrentLyrics($stateParams.name, $stateParams.song);

    function getCurrentLyrics(name, song) {
      console.log(name, song);
      vm.name = name;
      vm.song = song;
      BoomFactory.getLyrics(name, song).then(
          function(response) {
            vm.Lyrics = response.data;
            toastr.success('We have found song with the name: ' + song + ', by: ' + name);
            console.log(vm.Lyrics);
            $stateParams.name = "";
            $stateParams.song = "";
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
