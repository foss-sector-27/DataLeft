var a = Math.random();
$.ajax({
  url: "url that you never gonna find out",
  beforeSend: function( xhr ) {
	$('#loding').html('LOADING....');  
	}
})
  .done(function( data ) {
	$('#loading').html('');
	$('#usage').html(data.usage + ' ' + ' used');
	$('#days').html(data.days_left + ' '+ ' left');
	$('#status').html(data.status);
	$('#speed').html(data.speed);
  });
