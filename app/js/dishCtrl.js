// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

	var id = $routeParams.dishId;
	console.log(id);


	Dinner.Dish.get({id:id}, function(resdata){
		$scope.status = "Searching...";
		$scope.dish = resdata;
		$scope.status =" "
		}, function(resdata){window.alert("Error!")}
	);

	$scope.confirm= function(dish){ 
		console.log(dish);
		Dinner.addDishToMenu(dish);
	}

	$scope.numberofguests = function(){
		return Dinner.getNumberOfGuests();
	}

	$scope.goBack = function(){window.history.back();};
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
}); 