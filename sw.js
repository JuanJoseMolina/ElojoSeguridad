// Asisnar Nombre y versiond e cache

const CACHE_NAME = 'v1_Ojo_Seguridad';
// Ficheros a Cachear

var urlsToCache = [

	'./css/styles.css',
	
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',

	'./img/001-maintenance.png',
	'./img/004-security-camera.png',
	'./img/002-alarm.png',
	'./img/003-shield.png',
	
	'./img/El_Ojo.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	
	'./img/favicon.png',
	'./img/favicon-16.png',
	'./img/favicon-32.png',
	'./img/favicon-64.png',
	'./img/favicon-96.png',
	'./img/favicon-128.png',
	'./img/favicon-192.png',
	'./img/favicon-256.png',
	'./img/favicon-384.png',
	'./img/favicon-512.png',
	'./img/favicon-1024.png'

];

//Evento Install
// Se encarga de la instalacion del service Worker y guarda en la cache los archivos estaticos

self.addEventListener('install', e => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			  .then(cache=> {
					return cache.addAll(urlsToCache)
								.then(() => {
									self.skipWaiting();
								});
			  })
			  .catch(err => console.log('No se ha registrado el cache', err))
	);
});


//Evento activate
// que la app funciones sin conexion

self.addEventListener('activate', e => {
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys()
			  .then(cacheNames => {
			  	return Promise.all(
			  		cacheNames.map(cacheName => {

			  			if(cacheWhitelist.indexOf(cacheName) === -1){
			  				// Borra elemntos de la cache que no necesitamos
			  				return caches.delete(cacheName);
			  			}

			  		})
			  	);
			  })

			  .then(() => {
			  	// Activa la cache
			  	self.clients.claim();

			  })
	);	
});


//Evento Fetch

self.addEventListener('fetch', e=>{

	e.respondWith(
		caches.match(e.request)
			  .then(res => {
					if(res){
						// deuelvo daos desd cache
						return res;
					}
					return fetch(e.request);

			  })
	);

});