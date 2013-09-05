$(function(){
	function checkHash(){
		if(location.hash == "#forgot"){
			$(".modal").css('visibility', 'hidden');
			$("#forgot-modal").css('visibility', 'visible');
		}else if(location.hash == "#checkemail"){
			$(".modal").css('visibility', 'hidden');
			$("#check-email-modal").css('visibility', 'visible');
		}else if(location.hash == "#newpassword"){
			$(".modal").css('visibility', 'hidden');
			$("#new-password-modal").css('visibility', 'visible');
		}else if(location.hash == "#newpasswordsuccess"){
			$(".modal").css('visibility', 'hidden');
			$("#new-password-success-modal").css('visibility', 'visible');
		}else if(location.hash == "#dash"){
			$(".modal").css('visibility', 'hidden');
			$(".dash").css('visibility', 'visible');
		}else{
			$("#login-modal").css('visibility', 'visible');
		}
	}
	checkHash();
	window.onhashchange = checkHash;
	$("#login-modal").addClass('login-modal-centered');
	$(window).load(function(){
		var i = 200;
		$(".app").each(function(){
			console.log(i);
			var $app = $(this);
			setTimeout(function(){$app.addClass('app-down');}, i);
			i += 70;
		});
	});
	$("#sign-in-btn").click(function(){
		var t = this;
		$(this).addClass('btn-loading');
		setTimeout(function(){
			$(t).removeClass('btn-loading');	
			$("#username-input").addClass('input-wrong');
			$("#password-input").addClass('input-wrong');
			setTimeout(function(){
				$("#username-input").removeClass('input-wrong');
				$("#password-input").removeClass('input-wrong');
			},1100);
		},1100);
	});
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function() {
		        return $(this).attr('src').replace('.svg', '.png');
		    });
	}
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		  }
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  $(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
			  input.val('');
			}
		  })
		});
	}

});
