dinnerPlannerApp.controller('printCtrl', function ($scope,Dinner) {
	
	$scope.numberofguest = function(){return Dinner.getNumberOfGuests();}
	$scope.menu = Dinner.getFullMenu();
	console.log("Hej");
	$scope.goBack = function(){window.history.back();};
	$scope.printing = function(){window.print();};


	
	
})
