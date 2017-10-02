var modelController = (function(){



})();

var uiController = (function(){

  var DOMstrings = {
    aboutme: '.about__me',
  };

  return{
    getDOMstrings: function(){
      return DOMstrings;
    }
  }

})();

var controller = (function(budgetCtrl, UICtrl){

  var setupEventListeners = function(){
    var DOMstrings = UICtrl.getDOMstrings();
    document.querySelector('.about__me').addEventListener('click', function(){
      var modal = document.querySelector('#about__me');  // assuming you have only 1
      modal.classList.add('is-active');

      modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        html.classList.remove('is-clipped');
      });
    });
    document.querySelector('#wolfram__pi').addEventListener('click', function(){
      var modal = document.querySelector('#wolfram__alpha');  // assuming you have only 1
      modal.classList.add('is-active');

      modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        html.classList.remove('is-clipped');
      });
    });
  };

  return{
    init: function() {
      console.log("App has started");
      setupEventListeners();
    }
  };

})(modelController, uiController);

controller.init();
