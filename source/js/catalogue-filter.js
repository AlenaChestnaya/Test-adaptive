var filteredClass = ".articles__item";
var filterButtonClass = ".catalogue__nav-button";
var showAllButtonClass = ".catalogue__nav-button--all";

$(function() {
  var buttons = $(filterButtonClass);
  buttons.on("click", function() {
    var button = $(this);
    buttons.removeClass("catalogue__nav-button--current");
    button.addClass("catalogue__nav-button--current");
    if (button.hasClass(showAllButtonClass)) {
      showAll();
    } else {
      var filterValue = button.attr("data-filter");
      makeFilter(filterValue);
    }
  })
});

function showAll() {
  $(filteredClass).fadeIn(200);
};

function makeFilter(className) {
  $(filteredClass).not(className).fadeOut(200);
  $(filteredClass + className).delay(200).fadeIn(200);
};
