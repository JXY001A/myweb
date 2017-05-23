$(function() {
	$('#addCategory').on('click',function(e) {
		var text = prompt('请填写分类标签');
		if (text) {
			$.ajax({
				url:'/blog/essay/addCategory',
				data:{categoryName:text},
				type:'post',
				success:function(data){
					$('#categoryBox').prepend("<input type='radio' id='"+data._id+"' name='category'value="+data._id +" class='categories'><label for='"+data._id+"'>"+data.name+"</label>");
				}
			});
		}else{
			alert('标签名不能为空');
		}
	});
});

