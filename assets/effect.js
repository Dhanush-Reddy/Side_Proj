var navigationStage = 'initial';
var galleryStrip = null;

window.handleBackNavigation = function () {
    if (navigationStage === 'gallery' || navigationStage === 'story') {
        if (typeof window.resetToOptions === 'function') {
            window.resetToOptions();
        }
        return;
    }

    if (navigationStage === 'options') {
        navigationStage = 'initial';
    }

    if (window.history.length > 1) {
        window.history.back();
    } else {
        var fallback = window.location.origin ? window.location.origin + '/' : './';
        window.location.href = fallback;
    }
};

$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;
		var wishSequenceStarted = false;
		var blowAutoComplete = null;
		var storySequenceStarted = false;
		var galleryAnimating = false;
		var galleryPopulated = false;
		var restoreBalloonsAfterStory = false;

		function createPlaceholderData(label, color) {
			var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='1280' height='720'>" +
				"<rect width='100%' height='100%' fill='" + color + "' rx='40' ry='40'/>" +
				"<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='72' fill='white' font-family='Signika, sans-serif'>" + label + "</text>" +
			"</svg>";
			return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
		}

		function normalizeImageEntry(entry) {
			if (!entry) {
				return null;
			}
			if (typeof entry === 'string') {
				return { src: entry.trim() };
			}
			if (typeof entry.src === 'string') {
				var width = parseInt(entry.width, 10);
				var height = parseInt(entry.height, 10);
				return {
					src: entry.src.trim(),
					width: Number.isFinite(width) && width > 0 ? width : undefined,
					height: Number.isFinite(height) && height > 0 ? height : undefined
				};
			}
			return null;
		}

		function populateGallery() {
			if (galleryPopulated) {
				return;
			}
			var userImages = [];
			if (window.config && Array.isArray(window.config.galleryImages)) {
				userImages = window.config.galleryImages
					.map(normalizeImageEntry)
					.filter(function (entry) { return entry && entry.src.length > 0; });
			}
			var colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#955251', '#B565A7', '#009B77', '#DD4124', '#45B8AC', '#EFC050', '#5B5EA6', '#9B2335', '#DFCFBE', '#55B4B0'];
			var strip = $('#photo_gallery .photo-strip');
			strip.empty();
			var tileCount = Math.max(15, userImages.length);
			for (var i = 0; i < tileCount; i++) {
				var label = 'Photo ' + (i + 1);
				var placeholderColor = colors[i % colors.length];
				var data = userImages[i];
				var src = data ? data.src : createPlaceholderData(label, placeholderColor);
				var altText = data ? ('Gallery Photo ' + (i + 1)) : label;
				var item = $('<div/>', {
					class: 'photo-item'
				});
				if (data && data.width && data.height) {
					var ratio = (data.height / data.width) * 100;
					item.css('--photo-aspect', ratio.toFixed(4) + '%');
				} else {
					item.css('--photo-aspect', '56.25%');
				}
				var img = $('<img/>', {
					src: src,
					alt: altText,
					loading: 'lazy'
				});
				item.append(img);
				strip.append(item);
			}
			galleryPopulated = true;
		}

		function scheduleStoryReveal() {
			$('#story').hide();
			setTimeout(function(){
				$('#story').fadeIn('slow');
			}, 3000);
		}

		function showPostWishOptions(forceInstant) {
			navigationStage = 'options';
			wishSequenceStarted = true;
			var revealButtons = function(){
				$('#birthday_card, #continue_gallery').stop(true, true).fadeIn('slow');
				scheduleStoryReveal();
			};
			if (forceInstant) {
				$('#birthday_card, #continue_gallery').stop(true, true).show();
				scheduleStoryReveal();
			} else {
				$('#birthday_card, #continue_gallery').hide();
				setTimeout(revealButtons, 1200);
			}
		}

		function triggerWishSequence() {
			if (wishSequenceStarted) {
				return;
			}
			wishSequenceStarted = true;
			if (blowAutoComplete) {
				clearTimeout(blowAutoComplete);
				blowAutoComplete = null;
			}
			vw = $(window).width()/2;

			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
			$('#b1').attr('id','b11');
			$('#b2').attr('id','b22');
			$('#b3').attr('id','b33');
			$('#b4').attr('id','b44');
			$('#b5').attr('id','b55');
			$('#b6').attr('id','b66');
			$('#b7').attr('id','b77');
			$('#b11').animate({top:240, left: vw-350},500);
			$('#b22').animate({top:240, left: vw-250},500);
			$('#b33').animate({top:240, left: vw-150},500);
			$('#b44').animate({top:240, left: vw-50},500);
			$('#b55').animate({top:240, left: vw+50},500);
			$('#b66').animate({top:240, left: vw+150},500);
			$('#b77').animate({top:240, left: vw+250},500);
			$('.balloons').css('opacity','0.9');
			$('.balloons h2').fadeIn(3000);
			$('#blow_hint').fadeOut('slow');
			showPostWishOptions();
		}

		function resetTextMessages() {
			var texts = $('#texts-container p');
			texts.stop(true, true).hide();
			texts.first().show();
		}

		function resetToWishOptions() {
			if (blowAutoComplete) {
				clearTimeout(blowAutoComplete);
				blowAutoComplete = null;
			}
			if (galleryStrip && galleryStrip.length) {
				galleryStrip.stop(true, true);
				galleryStrip.scrollTop(0);
			}
			$('.photo-gallery').stop(true, true).fadeOut('fast');
			$('.message').stop(true, true).hide();
			resetTextMessages();
			$('#story').stop(true, true).hide();
			$('.cake').stop(true, true).fadeIn('fast');
			if (restoreBalloonsAfterStory) {
				$('.balloons').stop(true, true).fadeIn('slow');
				restoreBalloonsAfterStory = false;
			}
			storySequenceStarted = false;
			galleryAnimating = false;
			$('body').removeClass('gallery-active');
			showPostWishOptions(true);
		}

		window.resetToOptions = resetToWishOptions;

		function startPhotoGallery() {
			if (galleryAnimating || storySequenceStarted) {
				return;
			}
			galleryAnimating = true;
			populateGallery();
			navigationStage = 'gallery';
		if ($('.cake:visible').length) {
			$('.cake').stop(true, true).fadeOut('fast');
		}
			if ($('.balloons:visible').length) {
				restoreBalloonsAfterStory = true;
				$('.balloons').stop(true, true).fadeOut('fast');
			}
			$('body').addClass('gallery-active');
			closeCardModal(true);
			$('#birthday_card, #continue_gallery').fadeOut('slow');
			var gallery = $('#photo_gallery');
			var strip = gallery.find('.photo-strip');
			galleryStrip = strip;
			if (!strip.length) {
				galleryAnimating = false;
				startStorySequence();
				return;
			}
			strip.stop(true, true).scrollTop(0);
			gallery.fadeIn('slow', function(){
				var scrollArea = Math.max(0, strip[0].scrollHeight - strip.innerHeight());
				var duration = Math.max(12000, scrollArea * 40);
				strip.animate({ scrollTop: scrollArea }, duration, 'linear', function(){
					gallery.fadeOut('slow', function(){
						galleryAnimating = false;
						startStorySequence();
					});
				});
			});
		}

		function startStorySequence() {
			if (storySequenceStarted) {
				return;
			}
			storySequenceStarted = true;
			navigationStage = 'story';
			$('body').removeClass('gallery-active');
			$('#story').fadeOut('slow');
			$('.cake').fadeOut('fast').promise().done(function(){
				$('.message').fadeIn('slow');
			});

			var i;

			function msgLoop (i) {
				$("p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
				i=i+1;
				$("p:nth-child("+i+")").fadeIn('slow').delay(1000);
				if(i==50){
					$("p:nth-child(49)").fadeOut('slow').promise().done(function () {
						$('.cake').fadeIn('fast');
						if (restoreBalloonsAfterStory) {
							$('.balloons').fadeIn('slow');
						restoreBalloonsAfterStory = false;
					}
						$('body').removeClass('gallery-active');
					});
					
				}
				else{
					msgLoop(i);
				}			

			});
				// body...
			}
			
			msgLoop(0);
		}

		function closeCardModal(skipAnimation) {
			var modal = $('#birthday_card_modal');
			if (skipAnimation) {
				modal.stop(true, true).hide().css('display', 'none');
				$('body').removeClass('modal-open');
				return;
			}
			if (!modal.is(':visible')) {
				$('body').removeClass('modal-open');
				modal.css('display', 'none');
				return;
			}
			$('body').removeClass('modal-open');
			modal.fadeOut('slow', function(){
				modal.css('display', 'none');
			});
		}
		$(window).resize(function(){
			 vw = $(window).width()/2;
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
			$('#b11').animate({top:240, left: vw-350},500);
			$('#b22').animate({top:240, left: vw-250},500);
			$('#b33').animate({top:240, left: vw-150},500);
			$('#b44').animate({top:240, left: vw-50},500);
			$('#b55').animate({top:240, left: vw+50},500);
			$('#b66').animate({top:240, left: vw+150},500);
			$('#b77').animate({top:240, left: vw+250},500);
		});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		var honoree = $('#honoree_name');
		honoree.removeClass('hidden');
		honoree.hide().fadeIn('slow');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopOne() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$('#blow_hint').removeClass('text-danger').addClass('text-warning').fadeIn('slow');
		var button = $(this);
		button.fadeOut('slow');
		if (typeof startCandleBlowListener === 'function') {
			blowAutoComplete = setTimeout(function(){
				if (!wishSequenceStarted) {
					if (typeof stopCandleBlowListener === 'function') {
						stopCandleBlowListener();
					}
					$('.fuego').fadeOut('slow');
					triggerWishSequence();
				}
			}, 15000);
			startCandleBlowListener(function(){
				if (typeof stopCandleBlowListener === 'function') {
					stopCandleBlowListener();
				}
				$('.fuego').fadeOut('slow');
				triggerWishSequence();
			}).catch(function(error){
				if (blowAutoComplete) {
					clearTimeout(blowAutoComplete);
					blowAutoComplete = null;
				}
				console.error('Unable to access the microphone.', error);
				$('#blow_hint').removeClass('text-warning').addClass('text-danger').text('Microphone unavailable. Continuing automatically.');
				setTimeout(function(){
					if (typeof stopCandleBlowListener === 'function') {
						stopCandleBlowListener();
					}
					$('.fuego').fadeOut('slow');
					triggerWishSequence();
				}, 2000);
			});
		} else {
			setTimeout(function(){
				$('.fuego').fadeOut('slow');
				triggerWishSequence();
			}, 2000);
		}
	});
	
	$('#continue_gallery').click(function(){
		startPhotoGallery();
	});

	$('#birthday_card').click(function(){
		const cardUrl = 'external/HappyBirthday/index.html';
		if (window.localStorage) {
			window.localStorage.setItem('resumeFromCard', '1');
		}
		window.open(cardUrl, '_blank', 'noopener');
	});

	$('#close_card').click(function(event){
		event.preventDefault();
		event.stopPropagation();
		closeCardModal();
	});

	$('#birthday_card_modal').click(function(event){
		if (event.target === this) {
			closeCardModal();
		}
	});

	$('#story').click(function(){
		startStorySequence();
	});

	(function resumeFromCardIfNeeded(){
		if (window.localStorage && window.localStorage.getItem('resumeFromCard') === '1') {
			window.localStorage.removeItem('resumeFromCard');
			resetToWishOptions(true);
		}
	})();
});




//alert('hello');
