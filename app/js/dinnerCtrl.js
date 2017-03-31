// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {


  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.menu =function(){ return Dinner.getFullMenu();}
  
  //Dinner.cookieMenu();
  //console.log(Dinner.cookieMenu());

  //$scope.menu= Dinner.cookieMenu();

  $scope.dishPrice = Dinner.getDishPrice;

  $scope.totalMenuPrice =function(){ return Dinner.getTotalMenuPrice();}
 
  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});