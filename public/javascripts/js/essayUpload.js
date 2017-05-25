$(function() {
	$('#addCategory').on('click',function(e) {
		$('#categoryBox').prepend("<input type='radio' id='java' name='javascript' class='categories'><label for='java'>java</label>");
	});
});

