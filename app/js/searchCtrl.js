 // Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.
  $scope.dishes = [];
  $scope.search = function(query,type) {
  	$scope.status = "Searching...";
  	Dinner.DishSearch.get({query:query,type:type}, function(resdata){
    console.log(resdata.baseUri+resdata.results[0].image);
    $scope.dishes = resdata.results;
    $scope.status =" "
  }, function(resdata){window.alert("Error!")});

}
});