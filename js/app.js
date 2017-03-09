$(document).ready(function(){
	// GÉNÉRAL 

	function callQuest(quest){
		$('.quest').each(function(){
			if($(this).attr('id') == quest && !($(this).attr('class') == "quest queston")){
				$(this).toggleClass('queston');
			}if($(this).attr('id') != quest && $(this).attr('class') == "quest queston"){
				$(this).toggleClass('queston');
			}
		})
	}

	function randbet(min, max){
		return Math.floor((Math.random()*(max-min))+min);
	}

	// FIN GÉNÉRAL

	// debut BUDGET !!!!!!!!!!!!!!!!!!!!!!!!!!!!
	function Postits(name, prix, prisencharge, posx, posy){
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

	function melangepostits(e, celuila){
		posx = postitstabl[e].posx;
		posy = postitstabl[e].posy;
		rot = randbet(-10, 10)+"deg";
		$(celuila)
		.css('top', (randbet(posx, posx+$(window).width()/200))+"%")
		.css('left', (randbet(posy, posy+$(window).width()/150))+"%")
		.css('transform', "rotate("+rot+")");
		console.log('coucoupotit')
	}
	$('.postit').each(function(e){
		melangepostits(e, this);
	})

	$('.postit').on('click', function(){
		$(this).toggleClass('postitcheck');
		id = ($(this).attr('id')).slice(6);
		console.log($("#progressbudget").attr('style'))
		if(!prisencharge.includes(postitstabl[id].name)){
			prisencharge.push(postitstabl[id].name);
			$('#progressdepense').val($('#progressdepense').val()+postitstabl[id].prix);
		}else{
			prisencharge.splice(prisencharge.indexOf(postitstabl[id].name), 1);
			$('#progressdepense').val($('#progressdepense').val()-postitstabl[id].prix);
		}
		if(!nonpris.includes(postitstabl[id].name)){
			nonpris.push(postitstabl[id].name);
		}else{
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
		for (var i = 0; i<nonpris.length; i++) {
			$('#nonpris')
			.append($('<li/>')
				.text(nonpris[i]));
		}
		$('#progressbudget').css("width",nonpris.length*1.2+.2+"vw");
		$('#progressdepenses').css("width",prisencharge.length*1.2+.2+"vw");
		if(nonpris.length<2){
			$('#progressbudget').css("background-color", "red");
			$('#progressdepenses').css("background-color", "red");
		}else if(nonpris.length<4){
			$('#progressbudget').css("background-color", "orange");
			$('#progressdepenses').css("background-color", "orange");
		}else if(nonpris.length<6){
			$('#progressbudget').css("background-color", "green");
			$('#progressdepenses').css("background-color", "green");
		}
	})

	$('#verrif').on('click', function(){
		var rightres=0,wrongres=0;
		$('.postit').each(function(e){
			correc = postitstabl[e].prisencharge;
			if($(this).attr("class") == 'postit'){
				res = true;
			}else{
				res = false;
			}
			if(res == correc){
				// console.log('ok '+ postitstabl[e].name);
				rightres++;
			}else{
				// console.log('nope '+ postitstabl[e].name);
				wrongres++;
			}
		})
		console.log("vous avez "+Math.floor((rightres*100)/6)+"% de bonnes réponses");
	})
	// fin BUDGET !!!!!!!!!!!!!!!!!!!!!!!!!!!!

	// debut MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
	$('#dev').on('click', function(){
		callQuest("missions");
	})
	// fin MISSIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
})