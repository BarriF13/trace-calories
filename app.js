// Item Controller-UI Controller - App - Storage Controller

// -1 Item Controller
const ItemCtrl = (function(){
// we need to make item so == item constructor

const Item = function (id, name , calories){
  this.id = id;
  this.name = name;
  this.calories = calories;
}
//Data structure / State-- data is default
  const data = {
    items: [
      {id:0, name:'Pizza', calories: 800},
      {id:1, name:'Cake', calories: 400},
      {id:2, name:'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  }





  // Public methods
  return {
    logData: function(){
      return data;
    }
  }
})(); 

//-2 UI Controller
const UICtrl = (function(){




  
// Public methods
return {

}


})(); 

//-3 App Controller is app ctrl and this is the main controller--- we want to init the app

const App = (function(ItemCtrl, UICtrl){
  
    //-1 it's the new app - we want the app call get items from itemCtrl and then with UICtrl will put it in the list




    // public methods
    return {
      init: function(){
        console.log('Initializing App...');
      }
    }
})(ItemCtrl, UICtrl); 

// initialize App
App.init();