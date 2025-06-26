/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Thumbs, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Перечень слайдеров
// Проверяем, есть ли слайдер на стронице

if (document.querySelector('.popular-destinations__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.popular-destinations__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 24,
		speed: 400,
		touchRatio: 1,
		simulateTouch: true,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.popular-destinations__arrow-prev',
			nextEl: '.popular-destinations__arrow-next',
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 16,
			},
			390: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			479.98: {
				slidesPerView: 1.8,
				spaceBetween: 16,
			},
			767.98: {
				slidesPerView: 2.5,
				spaceBetween: 16,
			},
			991.98: {
				slidesPerView: 3.5,
				spaceBetween: 24,
			},
			1192: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.read-also__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.read-also__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 24,
		speed: 400,
		touchRatio: 1,
		simulateTouch: true,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.read-also__arrow-prev',
			nextEl: '.read-also__arrow-next',
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 16,
			},
			390: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			479.98: {
				slidesPerView: 1.8,
				spaceBetween: 16,
			},
			767.98: {
				slidesPerView: 2.5,
				spaceBetween: 16,
			},
			991.98: {
				slidesPerView: 3.5,
				spaceBetween: 24,
			},
			1192: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.sales__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.sales__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 24,
		speed: 400,

		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.sales__arrow-prev',
			nextEl: '.sales__arrow-next',
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 16,
			},
			390: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			479.98: {
				slidesPerView: 1.8,
				spaceBetween: 16,
			},
			767.98: {
				slidesPerView: 2.5,
				spaceBetween: 16,
			},
			991.98: {
				slidesPerView: 3.5,
				spaceBetween: 24,
			},
			1192: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.teams__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.teams__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 24,
		speed: 400,

		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.teams__arrow-prev',
			nextEl: '.teams__arrow-next',
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 16,
			},
			390: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			479.98: {
				slidesPerView: 1.8,
				spaceBetween: 16,
			},
			767.98: {
				slidesPerView: 2.5,
				spaceBetween: 16,
			},
			991.98: {
				slidesPerView: 3.5,
				spaceBetween: 24,
			},
			1192: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.reviews__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.reviews__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 24,
		speed: 400,

		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.reviews__arrow-prev',
			nextEl: '.reviews__arrow-next',
		},

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.1,
				spaceBetween: 16,
			},
			390: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			479.98: {
				slidesPerView: 1.5,
				spaceBetween: 16,
			},
			767.98: {
				slidesPerView: 2.5,
				spaceBetween: 24,
			},
			1192: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.left-product__images')) { // Указываем скласс нужного слайдера
	const thumbsSwiper = new Swiper('.images-product__thumb', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Thumbs, Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 6.5,
		spaceBetween: 4,
		speed: 400,
		preloadImages: true,
	});
	const mainThumbsSwiper = new Swiper('.images-product__slider', {
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Thumbs, Pagination],
		thumbs: {
			swiper: thumbsSwiper
		},
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 2,
		speed: 400,
		preloadImages: true,
		pagination: {
			el: ".images-product__pagination",
			type: "fraction",
		},
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.images-product__arrow-prev',
			nextEl: '.images-product__arrow-next',
		},
	});
}

if (document.querySelector('.images-products')) {
	document.querySelectorAll('.images-product').forEach(product => {
		const thumbContainer = product.querySelector('.images-product__thumb');
		const mainSliderContainer = product.querySelector('.images-product__slider');

		if (!thumbContainer || !mainSliderContainer) return;

		// Создаём слайдер миниатюр
		const thumbsSwiper = new Swiper(thumbContainer, {
			modules: [Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 6.5,
			spaceBetween: 4,
			speed: 400,
			preloadImages: true,
			breakpoints: {
				0: {
					slidesPerView: 3.2,
					spaceBetween: 4,
				},
				767.98: {
					slidesPerView: 5.5,
					spaceBetween: 4,
				},
				1192: {
					slidesPerView: 6.5,
					spaceBetween: 4,
				},
			},
		});

		// Создаём основной слайдер с привязкой к миниатюрам
		const mainSwiper = new Swiper(mainSliderContainer, {
			modules: [Thumbs],
			thumbs: {
				swiper: thumbsSwiper,
			},
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 16,
			speed: 400,
			preloadImages: true,
		});
	});
}

if (document.querySelector('.popup__slider')) { // Указываем скласс нужного слайдера
	document.querySelectorAll('.popup__slider').forEach(n => {
		const thumbsPopupSwiper = new Swiper(n.querySelector('.images-product__popup-thumb'), {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Thumbs, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 5.5,
			spaceBetween: 4,
			speed: 400,
			preloadImages: true,
		});
		const mainThumbsPopupSwiper = new Swiper(n.querySelector('.images-product__slider-popup'), {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Thumbs, Pagination],
			thumbs: {
				swiper: thumbsPopupSwiper
			},
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 2,
			speed: 400,
			preloadImages: true,
			pagination: {
				el: n.querySelector(".slider-popup-pagination"),
				type: "fraction",
			},
			// Кнопки "влево/вправо"
			navigation: {
				prevEl: n.querySelector('.slider-popup-arrow-prev'),
				nextEl: n.querySelector('.slider-popup-arrow-next'),
			},
		});
	});
}

if (document.querySelector('.products__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.products__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 16,
		speed: 400,

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.2,
				spaceBetween: 16,
			},
			390: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			479.98: {
				slidesPerView: 1.8,
				spaceBetween: 16,
			},
			767.98: {
				slidesPerView: 2.5,
				spaceBetween: 16,
			},
			991.98: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1192: {
				slidesPerView: 3,
				spaceBetween: 16,
			},
		},
		// События
		on: {

		}
	});
}

if (document.querySelector('.timeline__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.timeline__slider', { // Указываем скласс нужного слайдера
		observer: true,
		observeParents: true,
		slidesPerView: 3.2,
		spaceBetween: 0,
		speed: 400,
		preloadImages: true,

		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.1,
			},
			600: {
				slidesPerView: 1.5,
			},
			767.98: {
				slidesPerView: 2,
			},
			991.98: {
				slidesPerView: 3.2,
			},
		},
	});
}

if (document.querySelector('.sertificates__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.sertificates__slider', { // Указываем скласс нужного слайдера
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 24,
		speed: 400,
		preloadImages: true,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.sertificates__arrow-prev',
			nextEl: '.sertificates__arrow-next',
		},
		// Брейкпоинты
		breakpoints: {
			0: {
				slidesPerView: 1.2,
			},
			600: {
				slidesPerView: 2.2,
			},
			767.98: {
				slidesPerView: 3,
			},
			991.98: {
				slidesPerView: 4,
			},
		},
	});
}

if (document.querySelector('.about-teams__slider')) { // Указываем скласс нужного слайдера
	// Создаем слайдер
	new Swiper('.about-teams__slider', { // Указываем скласс нужного слайдера
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 24,
		speed: 400,
		preloadImages: true,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.about-teams__arrow-prev',
			nextEl: '.about-teams__arrow-next',
		},
	});
}

if (document.querySelector(".tabs-left-product__slider")) {
	const tabsSlider = new Swiper(".tabs-left-product__slider", {
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: "auto",
		spaceBetween: 0,
		speed: 400,
		navigation: {
			prevEl: ".tabs-left-product__arrow-prev",
			nextEl: ".tabs-left-product__arrow-next"
		}
	});
	const activeSlide = document.querySelector(".tabs-left-product__slide ._tab-active").closest(".swiper-slide");
	if (activeSlide) {
		const slides = Array.from(document.querySelectorAll(".tabs-left-product__slide"));
		const activeIndex = slides.indexOf(activeSlide);
		tabsSlider.slideTo(activeIndex);
	}
	const links = document.querySelectorAll(".tabs-left-product__title");
	if (links) links.forEach((link => {
		link.addEventListener("click", (function (e) {
			links.forEach((l => l.classList.remove("_tab-active")));
			this.classList.add("_tab-active");
		}));
	}));
}