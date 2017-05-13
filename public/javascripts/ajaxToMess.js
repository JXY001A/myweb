var userRequest = (function($) {
	// 1 用户注册请求
	function verificatAction() {
		$('#yanzheng').on('click', function(e) {
			var email = $('#email').val();
			if (email) {
				TimerSeconds($('#yanzheng'));
				$.get('/user/verification',{email:email}, function(data) {
					// TODO
				});
			} else {
				//当邮箱没有被输入时，点击获取验证码就会触发邮箱input框
				// 获取焦点同时失去焦点，使其显示'要求email必须要被填写的信息'
				$('#email').focus().blur();
			}
		});
		function TimerSeconds(verifDom){
			// 将图标拿掉
			verifDom.removeClass('icon-yanzhengma');
			var seconds = 90;
			verifDom.html(seconds+'s');
			var timer = setInterval(function(){
				seconds-=1;
				if (seconds ==0) {
					verifDom.addClass('icon-yanzhengma');
					clearInterval(timer);
					verifDom.html('');
				}else{
					verifDom.html(seconds+'s');
				}
			},1000)
		}
	}
	function singInAction($formDom) {
		$formDom.validator({
		    valid: function(form) {
		        $.ajax({
		        	type:'post',
		        	url:'/user/passwordMatch',
		        	data:{
		        		email:form.email.value,
		        		password:form.password.value
		        	},
		        	success:function(data){
		        		if (data=='success') {
		        			// 如果验证成功，就放开登陆限制
		        			form.submit();
		        		}else{
		        			$(form.password)
			        			.val('')
			        			.attr({
			        				placeholder: '密码错误'
			        			});
		        		}
		        	}
		        });
		    }
		});
	}
	return {
		verfCodeAction:verificatAction,
		singInAction:singInAction
	};
})(jQuery);