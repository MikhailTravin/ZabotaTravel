//Яндекс карта

const mapProductLocation = document.querySelector('#location-map');
if (mapProductLocation) {
	if (typeof ymaps !== 'undefined') {
		ymaps.ready(() => initLocationMap());
	} else {
		console.warn("Yandex Maps API не загружено для карты #location-map");
	}

	function initLocationMap() {
		try {
			var myMapLocation = new ymaps.Map('location-map', {
				center: [43.902283, 42.716374],
				zoom: 16,
				controls: ['zoomControl'],
				behaviors: ['drag']
			}, {
				searchControlProvider: 'yandex#search'
			});

			var myPlacemarkLocation = new ymaps.Placemark(myMapLocation.getCenter(), {
				latitude: 43.902283,
				longitude: 42.716374,
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/icons/map-location.svg',
				iconColor: '#ec6608',
				iconImageSize: [28, 36],
				iconImageOffset: [0, 0],
			});

			myMapLocation.geoObjects.add(myPlacemarkLocation);
		} catch (error) {
			console.error("Ошибка при инициализации карты #location-map:", error);
		}
	}
}

const map = document.querySelector('#map');
if (map) {
	if (typeof ymaps !== 'undefined') {
		ymaps.ready(() => initMainMap());
	} else {
		console.warn("Yandex Maps API не загружено для карты #map");
	}

	function initMainMap() {
		try {
			var myMap = new ymaps.Map('map', {
				center: [44.036938, 43.069484],
				zoom: 8,
				controls: ['zoomControl'],
				behaviors: ['drag']
			}, {
				searchControlProvider: 'yandex#search'
			});

			// Создаем метку с кастомной иконкой
			const placemark1 = new ymaps.Placemark([43.918688, 42.701534], {}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/icons/location.svg',
				iconImageSize: [28, 36],
				iconImageOffset: [-14, -36] // Смещение для центрирования
			});

			const placemark2 = new ymaps.Placemark([44.036938, 43.069484], {}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/icons/location.svg',
				iconImageSize: [28, 36],
				iconImageOffset: [-14, -36]
			});

			myMap.geoObjects.add(placemark1).add(placemark2);
		} catch (error) {
			console.error("Ошибка при инициализации карты #map:", error);
		}
	}
}