// $(function() {
//   var grid = $(".articles").isotope({});
//   $(".articles__item").css("position", "static");
//   var buttons = $(".catalogue__nav-button");
//   buttons.on("click", function() {
//     var button = $(this);
//     buttons.removeClass("catalogue__nav-button--current");
//     button.addClass("catalogue__nav-button--current");
//     var filterValue = button.attr("data-filter");
//     grid.isotope({
//       filter: filterValue
//     });
//   })
// });

$(function() {
  var buttons = $(".catalogue__nav-button");
  buttons.on("click", function() {
    var button = $(this);
    buttons.removeClass("catalogue__nav-button--current");
    button.addClass("catalogue__nav-button--current");
  })
});
