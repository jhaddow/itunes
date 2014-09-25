var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService){
  //This is setting up the default behavior of our ng-grid. The important thing to note is
  //the 'data' property. The value is 'songData'. That means ng-grid is looking for songData on $scope and is putting whatever songData is into the grid.
  //this means when you make your iTunes request, you'll need to get back the information, parse it accordingly, then set it to songData on the scope -> $scope.songData = ...
  $scope.filterOptions = {
      filterText: ''
    };


  $scope.gridOptions = { 
      data: 'songData',
      height: '110px',
      filterOptions: $scope.filterOptions,
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Song', displayName: 'Song'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'CollectionPrice', displayName: 'Collection Price'},

      ]
  };
  var data = [];
  $scope.songData = [];


    $scope.getSongData = function(){
      itunesService.getData($scope.artist, $scope.mediaType).
      then(function(results){
       $scope.songData = gleanData(results);
      })
    }

    $scope.updateSortInfo = function(){
      $scope.gridOptions.sortBy($scope.sortBy);
    }



  var gleanData = function(results){
    return results.map(function(ele){
      return {
        AlbumArt: ele.artworkUrl100,
        Artist: ele.artistName,
        Collection: ele.collectionName,
        CollectionPrice: ele.collectionPrice,
        Play: ele.previewUrl,
        Type: ele.kind,
        Song: ele.trackName
      };
    });
  }

});




