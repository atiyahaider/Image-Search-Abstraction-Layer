$('#submit').click(function(e){
  e.preventDefault();

  if ($('#searchVal').val().trim() === '') {
    alert('Error: Please specify the image to be searched.');
  }
  else {
    let offset = $('#offset').val() || 1;
    let url = '/api/imagesearch/' + encodeURI($('#searchVal').val() + '?offset=' + offset);
    window.open(url);
  }
  
  $('form')[0].reset();
});

