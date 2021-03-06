// Item Controller-UI Controller - App - Storage Controller
const StorageCtrl = (function(){

  // Public meth
  return {
    storeItem: function(item){
      let items;
      // Check if any item in LS
      if(localStorage.getItem('items') === null){
        items = [];
        // Push new item
        items.push(item);
        //Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is in ls already
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item 
        items.push(item);

        // Re set LS
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items=[];
       
      } else {
        // Get what is in ls already
        items = JSON.parse(localStorage.getItem('items'));

      }
      return items;
    },
    updateItemsStorage: function(updatedItem){
      let items= JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items)); 
    },
    deleteItemFromStorage: function(id){

      let items= JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items)); 
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');
    }
  }
})();
// -1 Item Controller----------------------------------------------------------------------------------
const ItemCtrl = (function () {
  // we need to make item so == item constructor

  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  //Data structure / State-- data is default
  const data = {
    // items: [
    //   // { id: 0, name: 'Pizza', calories: 800 },
    //   // { id: 1, name: 'Cake', calories: 400 },
    //   // { id: 2, name: 'Eggs', calories: 300 }
    // ],
    items:  StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      // Create id
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1; // it adds 1 to the id of the item --[it calculates the index of the item]
      } else {
        ID = 0;
      }
      // Calories to numbers
      calories = parseInt(calories);

      // Create a new item
      newItem = new Item(ID, name, calories);
      // and push it to data structure -- which is an array
      data.items.push(newItem);

      return newItem;

    },
    // get item by id
    getItemById: function (id) {
      // loop through the items and match the id
      let found = null; // temporary var 
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    // update item
    updateItem: function (name, calories) {
      // calories to number
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: function (id) {
      // Get ids

      const ids = data.items.map(function (item) {
        return item.id;
      });

      // Get index 
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    // Clear all item
    clearAllItems: function () {
      data.items = [];
    },
    // Set current item
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function (item) {
      return data.currentItem;
    },
    // getting total calories
    getTotalCalories: function () {
      let total = 0;
      // loop through items and add cals
      data.items.forEach(function (item) {
        total += item.calories;
      });

      // Set total cal in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: function () {
      return data;
    }
  }
})();

//-2 UI Controller-------------------------------------------------------------------------------------
const UICtrl = (function () {
  // we have to make UI selector in case id= item-list changes so we just correct it here 
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  // Public methods-- for printing on the UI
  return {
    populateItemList: function (items) {
      let html = '';
      items.forEach(function (item) {
        html += `<li class = "collection-item" id="item-${item.id}">
      <strong>${item.name}: </strong><em>${item.calories} calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
    </li>`;
      });

      //Insert list to the dom
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    //to access a private method
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function (item) {
      // show item
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //create li element
      const li = document.createElement('li');
      // Add class 
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add html
      li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>`;
      //Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // now we get a node list  so we turn it to array
      listItems = Array.from(listItems); // now we have an array

      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      })
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list to an array
      listItems = Array.from(listItems);
      listItems.forEach(function (item) {
        item.remove()
      })
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';

    },
    showEditState: function () {

      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';

    },
    getSelectors: function () {
      return UISelectors;
    }

  }


})();
// App controller-------------------------------------------------------------------------------------
//
//-3 App Controller is app ctrl and this is the main controller--- we want to init the app

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function () {
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //-- Disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    // Back butt event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    // Clear event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Add item

  const itemAddSubmit = function (e) {
    //Get form item input from UI Controller
    const input = UICtrl.getItemInput();
    // Check for name and calories input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Store on local S  
      StorageCtrl.storeItem(newItem);
      // Clear form fields
      UICtrl.clearInput();

    }

    e.preventDefault();

  }

  // --- Click edit item
  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      //  console.log('test')
      // get list item id(item-0, item-1 )
      const listId = e.target.parentNode.parentNode.id;

      //Break into an array
      const listIdArr = listId.split('-');
      // Get the actual id
      const id = parseInt(listIdArr[1]);
      // Get item

      const itemToEdit = ItemCtrl.getItemById(id);
      // console.log(itemToEdit);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add item to form
      UICtrl.addItemToForm();

    }

    e.preventDefault();
  }
  //--- Update Item 
  const itemUpdateSubmit = function (e) {
    // Get item input-- reusing it
    const input = UICtrl.getItemInput();
    //Update Item 
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Add item to UI list
    UICtrl.addListItem(newItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update local storage
    StorageCtrl.updateItemsStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();
  }
  
 //----- Delete butt event 
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    //Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // delete local storage 
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    // Clear form fields
    UICtrl.clearInput();

    e.preventDefault();
  }
 //----- Clear items events
  const clearAllItemsClick = function () {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();
    // Get total calories

    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // remove from local storage
    StorageCtrl.clearItemsFromStorage();

    // Hide the li
     // Clear form fields
     UICtrl.hideList();

  }
  //-1 it's the new app - we want the app call get items from itemCtrl and then with UICtrl will put it in the list
  // public methods
  return {
    init: function () {

      // Clear starting state
      UICtrl.clearEditState();
      //Fetch items from data structure from itemCtrl 
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

// initialize App
App.init();