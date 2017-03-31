dinnerPlannerApp.controller('showDinnerCtrl', function ($scope,Dinner) {

$scope.goBack = function(){window.history.back();};

	$scope.numberofguest = function(){return Dinner.getNumberOfGuests();};
	$scope.dishesInMenu =  function(){return Dinner.getFullMenu();};

	$scope.dishPrice = Dinner.getDishPrice;
	$scope.totalMenuPrice =function(){ return Dinner.getTotalMenuPrice();}
}); 