// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore, $q) {
  
var apiKey = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
  var apiSearch = "/recipes/search?";

  var observerList = []; 



  var self=this;
  var dish; 
  var guest =1;
  var menu= [];  
  var menu1= [];   
  var listOfIngridense= []; 

    dish = this.dish; 
    guest = this.guest;
    var currentid = 1;

    this.listOfIngridense = listOfIngridense; 

  this.setNumberOfGuests = function(num) {
    guest = num;
    $cookieStore.put("guests", guest);
  }


  this.getNumberOfGuests = function() {
    guest= $cookieStore.get("guests");
    return guest;

  }


   
  this.getSelectedDish = function(type) {
  //Returns the dish that is on the menu for selected type  
    //return dish = menu.find(function(dish){ return dish.type == this.dish.type});
    //var x = this.dish.type;
    //var dishToBeFounded = this.getDish(x.id);

    for (var i = 0; i < menu.length; i++) {
      var dish1 = menu[i]
      if (type == dish1.type) {
        return dish1;
      }
      else {
        return "There is no dish with that type"
      }
    }
   }
  
  this.getFullMenu = function() {
  //Returns all the dishes on the menu.
  //this.cookieMenu();
  return menu;
  }

  
  this.getAllIngredients = function() {
  //Returns all ingredients for all the dishes on the menu.
  var allIngredienses=[];

    for (var d in menu) {
    var dish = menu[d];
    var id = dish.id;

    this.getDish(id, function(responce){
    console.log(id);

      for (var i in responce.extendedIngredients) {
        var item = responce.extendedIngredients[i].name;
        console.log(item);
        allIngredienses.push(item);
      }
    });
    }
  

  return allIngredienses;

  
  }

    this.getDishPrice = function(dish) {
    var total = 0;
    console.log(dish);
    console.log(dish.extendedIngredients);

    for(var i= 0; i< dish.extendedIngredients.length; i++) 
            {
              var ingredient = dish.extendedIngredients[i];
              total += ingredient.amount * guest;
            }
            return total;
  }


  this.getTotalMenuPrice = function() {
  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
      var totalCost=0; 
      var amountOfGuest= guest;
      var itemCost=0;
  

      for(var n in menu) // For ever dish in the menu.
      {
        var dish = menu[n];
        console.log(dish);

           // For ever price of ever ingridence for every guest.
              var itemCost= this.getDishPrice(dish);
              console.log(itemCost);
              totalCost= itemCost+totalCost;
              //console.log(itemCost);
              console.log(totalCost);
            }


      return totalCost; 
  }



  this.addDishToMenu = function(dish) {
  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  //var ids = JSON.parse($cookieStore.get("menu1"));
  //if  ids! {this.cookieMenu}

  var dishToBeAdded = dish;
    for (var d=0; d < dish.dishTypes.length; d++) {
      var types2 = dish.dishTypes[d]
        for (var i = 0; i < menu.length; i++) {
          var dishToBeFounded = menu[i]
            for (var t=0; t < dishToBeFounded.dishTypes.length; t++) {
              var types = dishToBeFounded.dishTypes[t]  
            
                    if (types == types2) {
                        menu.splice(i, 1);
                    }
                }
            }
          }
    menu.push(dish);
    var id1 = dish.id;
    console.log(id1);
    menu1.push(id1);
    $cookieStore.put("menu1", menu1);
    console.log($cookieStore);
  }


this.cookieMenu= function(){

     var ids = $cookieStore.get("menu1");
     console.log("hej", ids);
     var t = $q.defer();
    if (ids){
       console.log(ids);
       var l = [];
       for (var i=0; i<ids.length; i++) {
          var object = this.Dish.get({id: ids[i]}, function(resdata){
            console.log(resdata);
           
           return resdata;
         });
          var d = object.$promise.then(function(data){            
             l.push(data);
          });
          if(i== ids.length-1){
            t.resolve(l);
            $q.all(t).then(function(data){
              menu = data.promise;
              console.log(menu);

            });
          }
          console.log(menu);

       }
       console.log(t);
     }
}
    

  this.removeDishFromMenu = function(id) {
  //Removes dish from menu
  var dishToBeRemoved= this.Dish(id, function(data) {
      for (var i = 0; i < menu.length; i++) {
        var dishToBeFounded = menu[i]
            if (dishToBeFounded.id == data.id){
              menu.splice(i,1);}
      }
    $cookieStore.put("menu1", dish.id);
  })
  
    
             
  
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  
this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
  get: {
    headers: {
      'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    }
  }
});


this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
  get: {
    headers: {
       'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    }
  }
});

  this.cookieMenu();

  this.CurrentDish = function(id) {
    currentid = id;
  }

  this.GetCurrentDish= function() {
    return currentid;
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

console.log("sdf");



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  

  return this;
});