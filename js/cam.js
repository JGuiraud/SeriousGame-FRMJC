	
console.log('coucou')
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    	video.src = window.URL.createObjectURL(stream);
    	video.play();
    });
}

 // Legacy code below: getUserMedia 
else if(navigator.getUserMedia) { // Standard
	navigator.getUserMedia({ video: true }, function(stream) {
		video.src = stream;
		video.play();
	}, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
	navigator.webkitGetUserMedia({ video: true }, function(stream){
		video.src = window.webkitURL.createObjectURL(stream);
		video.play();
	}, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
	navigator.mozGetUserMedia({ video: true }, function(stream){
		video.src = window.URL.createObjectURL(stream);
		video.play();
	}, errBack);
}
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

const Question = function(ques, res1, res2, res3, res4){
	this.ques = ques;
	this.res1 = res1;
	this.res2 = res2;
	this.res3 = res3;
	this.res4 = res4;
} 

var questions = [
new Question("Dans quel domaine souhaitez vous exercer votre mission ?",
	"Culture et loisirs", "Le sport et la jeunesse", "Sauvetage des licornes", "Solidarité"),
new Question("A votre avis que peut vous apporter le SVE, à travers cette mission ?",
	" Acquérir de nouvelles compétences et apprendre de nouvelles langues.", " Me faire de nouveaux amis pour mon facebook.", "Une expérience personnelle et professionnelle de terrain .", "Des rencontres nouvelles et échanger par l’entraide ."),
new Question("Vos amis disent de vous que vous êtes plutôt :", "Généreux et altruiste .", "Aventurier et courageux .", "Casanier et indépendant .", "La réponse D."),
new Question("Pendant une soirée, un étudiant Erasmus, que vous ne connaissez pas veut engager la conversation avec vous. Problème, vous ne comprenez pas un mot d’espagnol. Quelle est votre attitude ?", "Vous ne cherchez pas a faire d’efforts et l’abandonnez au bout de quelques minutes .", "Vous essayez de comprendre quelques mots et d’en apprendre un peu plus sur lui, malgré la barrière de la langue .", "Vous tentez de continuer la conversation en anglais , ou bien demandez a une personne de faire l’interprète .", "Joker"),
new Question("Vous avez l’occasion de partir faire un voyage dans un pays étranger :", "Vous faites quelques visites culturelles .", "Vous restez a l’hôtel pour profiter de la piscine .", "Vous essayez de vous immerger totalement dans la culture du pays et respectez les traditions locales .", "La réponse D"),
new Question("Seul, au beau milieu d’une île déserte :", "Vous cherchez un abri pour la nuit .", "Vous essayez de construire un radeau pour rejoindre le continent le 			plus proche .", "Vous paniquez et attendez les secours .", "50/50"),

];
var i = 0;
$('#dev').click(function(){
	var q = questions[i];
	$('#question').html(q.ques);
	$('#r1').html('<input type="radio">'+q.res1);
	$('#r2').html('<input type="radio">'+q.res2);
	$('#r3').html('<input type="radio">'+q.res3);
	$('#r4').html('<input type="radio">'+q.res4);
	i ++;
})
