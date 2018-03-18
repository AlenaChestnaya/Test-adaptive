$(function() {
  var grid = $(".articles").isotope({});

  var buttons = $(".catalogue__nav-button");
  buttons.on("click", function() {
    var button = $(this);
    buttons.removeClass("catalogue__nav-button--current");
    button.addClass("catalogue__nav-button--current");
    var filterValue = button.attr("data-filter");
    grid.isotope({
      filter: filterValue
    });
  })
});

