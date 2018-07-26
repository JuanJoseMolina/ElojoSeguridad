// Service Worwer

if('serviceWorker' in navigator) {
		console.log('Puedes usar los servicesWorker en tu ordenar');

		navigator.serviceWorker.register('./sw.js')
				.then(res=> console.log('serviceWorker cargado Correctamente', res))
				.catch(err => console.log('serviceWorker No Cargado', err)) 



}else{
		console.log('no puedes');
	}


// Scroll Suavizado
$(document).ready(function(){
	
	$("#menu a").click(function(e) {
		e.preventDefault();

		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top
		});

		return false;
	});

});