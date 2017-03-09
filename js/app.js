
$(document).ready(function () {
	console.log("ready");



	/* ----- carnet ----- */
	var $mybook = $('#mybook');
	var $bttn_next = $('#next_page_button');
	var $bttn_prev = $('#prev_page_button');
	var $loading = $('#loading');
	var $mybook_images = $mybook.find('img');
	var cnt_images = $mybook_images.length;
	var loaded = 0;

	$bttn_next.hide();

	$mybook_images.each(function () {
		var $img = $(this);
		var source = $img.attr('src');
		$('<img/>').load(function () {
			++loaded;
			if (loaded == cnt_images) {
				$loading.hide();
				$bttn_next.show();
				$bttn_prev.hide();
				$mybook.show().booklet({
					name: null,
					width: 800,
					height: 500,
					speed: 600,
					direction: 'LTR',
					startingPage: 0,
					easing: 'easeInOutQuad',
					easeIn: 'easeInQuad',
					easeOut: 'easeOutQuad',

					closed: true,
					closedFrontTitle: null,
					closedFrontChapter: null,
					closedBackTitle: null,

					closedBackChapter: null,
					covers: false,

					pagePadding: 10,
					pageNumbers: true,

					hovers: false,
					overlays: false,
					tabs: false,
					tabWidth: 60,
					tabHeight: 20,
					arrows: false,
					cursor: 'pointer',

					hash: false,
					keyboard: true,
					next: $bttn_next,
					prev: $bttn_prev,

					menu: null,
					pageSelector: false,
					chapterSelector: false,

					shadows: true,
					shadowTopFwdWidth: 166,
					shadowTopBackWidth: 166,
					shadowBtmWidth: 50,

					before: function () { },
					after: function () { }
				});
			}
		}).attr('src', source);
	});


	/* ----- button carnet ---- */
	// $('#container-general').click(function () {
	// 	$(this).delegate('#bugdet', 'click', function () {
	// 		console.log('bonjour je suis toulouse')
	// 	})
	// })

	$(".book_wrapper").click(function () {
		if ($(".container-carnet").attr('class') == "container-carnet carnetleft") {
			$(".container-carnet").removeClass("carnetleft")
			$(".container-carnet").addClass("carnetmiddle")

		} else {
			$(".container-carnet").addClass("carnetleft")
			$(".container-carnet").removeClass("carnetmiddle")
		}
		// $(".container-carnet").click(function () {

		// 	if ($(".carnetmiddle").attr('class') == "container-carnet carnetmiddle") {
		// 		console.log("lol")
		// 		$(".container-carnet").removeClass("carnetmiddle")
		// 		$(".container-carnet").addClass("carnetleft")
		// 	}
		// })



		// else if ($(".container-carnet").attr('class') == "container-carnet carnetmiddle") {
		// 	$(".carnet").removeClass("carnetmiddle")
		// 	$(".carnet").addClass("carnetleft")
		// }

		// $(this).delegate('.carnet', 'click', function () {
		// 	if ($(".carnet").attr('class') == "carnet carnetleft") {
		// 		// $("#next_page_button").fadeIn('fast')

		// 		$(".carnet").removeClass("carnetleft")
		// 		$(".carnet").addClass("carnetmiddle")
		// 	} else if ($(".carnet").attr('class') == "carnet carnetmiddle") {

		// 		$(".carnet").removeClass("carnetmiddle")

		// 		$(".carnet").addClass("carnetleft")
		// 	}
		// })
	})


	function callQuest(quest) {
		$('.quest').each(function () {
			if ($(this).attr('id') == quest && !($(this).attr('class') == "quest queston")) {
				$(this).toggleClass('queston');
			} if ($(this).attr('id') != quest && $(this).attr('class') == "quest queston") {
				$(this).toggleClass('queston');
			}
		})
	}

	function randbet(min, max) {
		return Math.floor((Math.random() * (max - min)) + min);
	}

	// FIN GÉNÉRAL

	// debut BUDGET !!!!!!!!!!!!!!!!!!!!!!!!!!!!
	function Postits(name, prix, prisencharge, posx, posy) {
		this.name = name;
		this.prix = prix;
		this.prisencharge = prisencharge;
		this.posx = posx;
		this.posy = posy;
	}

	var postitstabl = [
		new Postits('Billet allé+retour', 20, true, 12, 10),
		new Postits('Manger', 10, true, 35, 10),
		new Postits('Dépenses quotidiennes', 5, false, 58, 10),
		new Postits('Téléphone', 10, true, 12, 30),
		new Postits('Transport sur place', 15, true, 35, 30),
		new Postits('Logement', 20, true, 58, 30)
	];
	var prisencharge = [];
	var nonpris = ["Billet allé+retour", "Manger", "Dépenses quotidiennes", "Téléphone", "Transport sur place", "Logement"];

	function melangepostits(e, celuila) {
		posx = postitstabl[e].posx;
		posy = postitstabl[e].posy;
		rot = randbet(-10, 10) + "deg";
		$(celuila)
			.css('top', (randbet(posx, posx + $(window).width() / 200)) + "%")
			.css('left', (randbet(posy, posy + $(window).width() / 150)) + "%")
			.css('transform', "rotate(" + rot + ")");
		console.log('coucoupotit')
	}
	$('.postit').each(function (e) {
		melangepostits(e, this);
	})

	$('.postit').click(function () {
		$(this).toggleClass('postitcheck');
		id = ($(this).attr('id')).slice(6);
		console.log($("#progressbudget").attr('style'))
		if (!prisencharge.includes(postitstabl[id].name)) {
			prisencharge.push(postitstabl[id].name);
			$('#progressdepense').val($('#progressdepense').val() + postitstabl[id].prix);
		} else {
			prisencharge.splice(prisencharge.indexOf(postitstabl[id].name), 1);
			$('#progressdepense').val($('#progressdepense').val() - postitstabl[id].prix);
		}
		if (!nonpris.includes(postitstabl[id].name)) {
			nonpris.push(postitstabl[id].name);
		} else {
			nonpris.splice(nonpris.indexOf(postitstabl[id].name), 1);
			// $('#progressbudget').css("width",$('#progressbudget').attr('width')-postitstabl[id].prix);
		}
		$('#prisencharge').html('<h3>Non pris en charge</h3>');
		for (var i = 0; i < prisencharge.length; i++) {
			$('#prisencharge')
				.append($('<li/>')
					.text(prisencharge[i]));
		}
		$('#nonpris').html('<h3>Pris en charge</h3>');
		for (var i = 0; i < nonpris.length; i++) {
			$('#nonpris')
				.append($('<li/>')
					.text(nonpris[i]));
		}
		$('#progressbudget').css("width", nonpris.length * 1.2 + .2 + "vw");
		$('#progressdepenses').css("width", prisencharge.length * 1.2 + .2 + "vw");
		if (nonpris.length < 2) {
			$('#progressbudget').css("background-color", "red");
			$('#progressdepenses').css("background-color", "red");
		} else if (nonpris.length < 4) {
			$('#progressbudget').css("background-color", "orange");
			$('#progressdepenses').css("background-color", "orange");
		} else if (nonpris.length < 6) {
			$('#progressbudget').css("background-color", "green");
			$('#progressdepenses').css("background-color", "green");
		}
	})

	$('#verrif').click(function () {
		var rightres = 0, wrongres = 0;
		$('.postit').each(function (e) {
			correc = postitstabl[e].prisencharge;
			if ($(this).attr("class") == 'postit') {
				res = true;
			} else {
				res = false;
			}
			if (res == correc) {
				// console.log('ok '+ postitstabl[e].name);
				rightres++;
			} else {
				// console.log('nope '+ postitstabl[e].name);
				wrongres++;
			}
		})
		console.log("vous avez " + Math.floor((rightres * 100) / 6) + "% de bonnes réponses");
	})
	// fin BUDGET !!!!!!!!!!!!!!!!!!!!!!!!!!!!

	// debut MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
	$('#dev').click(function () {
		callQuest("missions");
	})
	// fin MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
})