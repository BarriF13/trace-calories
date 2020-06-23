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
    getItems: function(){
      return data.items;
    },
    logData: function(){
      return data;
    }
  }
})(); 

//-2 UI Controller
const UICtrl = (function(){

// we have to make UI selector in case id= item-list changes so we just correct it here 
const UISelectors = {
  itemList: '#item-list'
}


  
// Public methods-- for printing on the UI
return {
  populateItemList: function(items){
    let html = '';
    items.forEach(function(item){
      html += `<li class = "collection-item" id="item-${item.id}">
      <strong>${item.name}: </strong><em>${item.calories} calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
    </li>`;
    });

    //Insert list to the dom
    document.querySelector(UISelectors.itemList).innerHTML = html;
  }
}


})(); 

//-3 App Controller is app ctrl and this is the main controller--- we want to init the app

const App = (function(ItemCtrl, UICtrl){
  
    //-1 it's the new app - we want the app call get items from itemCtrl and then with UICtrl will put it in the list
   // public methods
    return {
      init: function(){
        //Fetch items from data structure from itemCtrl 
        const items = ItemCtrl.getItems();

        // Populate list with items
        UICtrl.populateItemList(items);
      }
    }
})(ItemCtrl, UICtrl); 

// initialize App
App.init();