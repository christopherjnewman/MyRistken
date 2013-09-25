$(function(){
	function checkHash(){
		//resets
		$(".nav-item-selected").removeClass('nav-item-selected');
		$(".modal").css('visibility', 'hidden');
		$(".content").css('display', 'none');
		$(".settings-menu-item-selected").removeClass('settings-menu-item-selected');
		$("#settings").addClass('hidden');
		$("#my-account").addClass('hidden');
		$("#my-applications").addClass('hidden');
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
			$("#dashboard-link").addClass('nav-item-selected');
			$("#nav").css('visibility', 'visible');
			$("#apps").css('display', 'block').removeClass('hidden').css('visibility', 'visible');
		}else if(location.hash == "#settings"){
			$("#settings-link").addClass('nav-item-selected');
			$("#nav").css('visibility', 'visible');
			$("#settings").css('display', 'block').removeClass('hidden');
			$("#my-applications").css('display', 'inline-block').removeClass('hidden');
			$("#my-applications-table").dataTable();
			$("#my-applications-link").addClass('settings-menu-item-selected');
			addToTable();
		}else if(location.hash == "#account"){
			$("#settings-link").addClass('nav-item-selected');
			$("#nav").css('visibility', 'visible');
			$("#settings").css('display', 'block').removeClass('hidden');
			$("#my-account").css('display', 'inline-block').removeClass('hidden');
			$("#my-account-link").addClass('settings-menu-item-selected');
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
	function tooltipResize(){
		var $t = $("#select-dealership.tooltip-expanded");
		var h = $(window).height() - $t.offset().top - 50;
		$t.height(h);
	}
	$(".app-wrapper").click(function(){
		if(!$(this).hasClass('app-open')){ //is closed and is about to be opened
			$(this).addClass('app-open');
			var type = "svg";
			if(!Modernizr.svg) //ie fallback
				type = "png";
			var $arrow = $(this).find(".app-arrow");
			$arrow.attr('src', 'up-arrow.' + type);
			//reset the width so that the new svg fits
			var width = $arrow.width();
			$arrow.width(0);
			setTimeout(function(){$arrow.width(width);}, 1); //it works, okay?!
			
			var id = $(this).attr('id');
			/*$(".app-wrapper").each(function(){
				if($(this).attr('id') != id){
					$(this).addClass('faded');
				}
			});*/
			if(id == "menu-app"){
				/*var left = $(this).offset().left - 40;
				var top = $(this).offset().top + $(this).outerHeight() + 30;
				$("#select-dealership").css('left', left + "px");
				$("#select-dealership").css('top', top + "px");*/
				$("#select-dealership").removeClass("hidden");
				setTimeout(function(){$("#select-dealership").addClass('tooltip-down');}, 50);
				setTimeout(function(){
					$("#select-dealership").addClass('tooltip-expanded');
					tooltipResize();
					$(window).resize(tooltipResize);
				}, 300);
			}
		}else{ //was open, about to be closed
			$(this).removeClass('app-open');

			var type = "svg";
			if(!Modernizr.svg) //ie fallback
				type = "png";
			var $arrow = $(this).find(".app-arrow");
			$arrow.attr('src', 'down-arrow.' + type);
			//reset the width so that the new svg fits
			var width = $arrow.width();
			$arrow.width(0);
			setTimeout(function(){$arrow.width(width);}, 1);
			var id = $(this).attr('id');
			/*$(".faded").each(function(){
				$(this).removeClass('faded');
			});*/
				$("#select-dealership").removeClass('tooltip-expanded');
				setTimeout(function(){$("#select-dealership").addClass('tooltip-down');}, 200);
				setTimeout(function(){$("#select-dealership").addClass("hidden");}, 300);
		}
	});
	function addToTable(){
		$(".delete-application").remove();
		$(".dataTable tbody tr").each(function(){
			$(this).append("<td class='delete-application'><img src='delete.png'></td>");
		});
		$(".dataTables_filter input")
	}
	$("#account-link").click(function(){
		if($("#account-tooltip").hasClass('hidden')){
			$("#account-tooltip").removeClass('hidden');
			setTimeout(function(){
				$(document).click(function() {
					$("#account-tooltip").addClass('hidden');
				    $(document).unbind('click');
				});
				$("#account-tooltip").click(function(e) {
				    e.stopPropagation(); // This is the preferred method.
				});
			}, 1); //1 ms delay so that $("#account-link").click() doesn't trigger  $(document).click() as well
		}else{
			$("#account-tooltip").addClass('hidden');
			$(document).unbind('click');
		}
	});
	$(".alert .close").click(function(){
		$(this).parent().remove();
	});
	$(".add-application").click(function(){
		if($("#new-application-modal").hasClass('hidden')){
			$("#new-application-modal").removeClass('hidden').css('visibility', 'visible');
			$("#shade").removeClass('hidden');
			setTimeout(function(){
				$(document).click(function() {
					$("#new-application-modal").addClass('hidden');
					$("#shade").addClass('hidden');
				    $(document).unbind('click');
				});
				$("#new-application-modal").click(function(e) {
				    e.stopPropagation(); // This is the preferred method.
				});
			}, 1); //1 ms delay so that $("#account-link").click() doesn't trigger  $(document).click() as well
		}
	});
});