$(function() {
  $('#helpIcon').click(function() {
    $('#menu').removeClass('openNav');
    $('#navDiv').removeClass('openNav');

    $('#help').toggleClass('openNav');
    $('#helpDiv').toggleClass('openNav');
    $('#helpIcon').toggleClass('openNav');
  });
});

$(function() {
  $('#soundIcon').click(function() {
    $('#soundIcon').toggleClass('openNav');
    $('#soundIcon').toggleClass('fa-play-circle');
    $('#soundIcon').toggleClass('fa-stop-circle');
  });
});
