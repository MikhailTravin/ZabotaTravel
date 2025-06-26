// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";
// Вспомогательные функции
import { isMobile, _slideUp, _slideDown, _slideToggle, FLS } from "../functions.js";
// Модуль прокрутки к блоку
import { gotoBlock } from "../scroll/gotoblock.js";
//================================================================================================================================================================================================================================================================================================================================

// Работа с полями формы. Добавление классов, работа с placeholder
export function formFieldsInit(options = { viewPass: false }) {
	// Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
	const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
	if (formFields.length) {
		formFields.forEach(formField => {
			if (!formField.hasAttribute('data-placeholder-nohide')) {
				formField.dataset.placeholder = formField.placeholder;
			}
		});
	}
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = '';
			}
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.add('_form-focus');
				targetElement.parentElement.classList.add('_form-focus');
			}
			formValidate.removeError(targetElement);
		}
	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.remove('_form-focus');
				targetElement.parentElement.classList.remove('_form-focus');
			}
			// Моментальная валидация
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement);
			}
		}
	});

	// Если включено, добавляем функционал "Показать пароль"
	if (options.viewPass) {
		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (targetElement.closest('[class*="__viewpass"]')) {
				let inputType = targetElement.classList.contains('_viewpass-active') ? "password" : "text";
				targetElement.parentElement.querySelector('input').setAttribute("type", inputType);
				targetElement.classList.toggle('_viewpass-active');
			}
		});
	}
}
// Валидация форм
export let formValidate = {
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem);
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('_form-error');
		formRequiredItem.parentElement.classList.add('_form-error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('_form-error');
		formRequiredItem.parentElement.classList.remove('_form-error');
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
		}
	},
	formClean(form) {
		form.reset();
		setTimeout(() => {
			let inputs = form.querySelectorAll('input,textarea');
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index];
				el.parentElement.classList.remove('_form-focus');
				el.classList.remove('_form-focus');
				formValidate.removeError(el);
			}
			let checkboxes = form.querySelectorAll('.checkbox__input');
			if (checkboxes.length > 0) {
				for (let index = 0; index < checkboxes.length; index++) {
					const checkbox = checkboxes[index];
					checkbox.checked = false;
				}
			}
			if (flsModules.select) {
				let selects = form.querySelectorAll('.select');
				if (selects.length) {
					for (let index = 0; index < selects.length; index++) {
						const select = selects[index].querySelector('select');
						flsModules.select.selectBuild(select);
					}
				}
			}
		}, 0);
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	}
}
/* Отправка форм */
export function formSubmit(options = { validate: true }) {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', function (e) {
				const form = e.target;
				formSubmitAction(form, e);
			});
			form.addEventListener('reset', function (e) {
				const form = e.target;
				// Оставляем очистку при ручном сбросе формы
				formValidate.formClean(form);
			});
		}
	}

	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
		if (error === 0) {
			const ajax = form.hasAttribute('data-ajax');
			if (ajax) { // Если режим ajax
				e.preventDefault();
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const formData = new FormData(form);

				form.classList.add('_sending');
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				});
				if (response.ok) {
					let responseResult = await response.json();
					form.classList.remove('_sending');
					formSent(form, responseResult);
				} else {
					alert("Ошибка");
					form.classList.remove('_sending');
				}
			} else if (form.hasAttribute('data-dev')) {	// Если режим разработки
				formSent(form);
			}
		} else {
			e.preventDefault();
			const formError = form.querySelector('._form-error');
			if (formError && form.hasAttribute('data-goto-error')) {
				gotoBlock(formError, true, 1000);
			}
		}
	}

	// Действия после отправки формы
	function formSent(form, responseResult = ``) {
		// Создаем событие отправки формы
		document.dispatchEvent(new CustomEvent("formSent", {
			detail: {
				form: form
			}
		}));

		// Показываем попап, если подключен модуль попапов 
		// и для формы указана настройка
		setTimeout(() => {
			if (flsModules.popup) {
				const popup = form.dataset.popupMessage;
				popup ? flsModules.popup.open(popup) : null;
			}
		}, 0);

		// Убираем очистку формы, если не нужно
		// formValidate.formClean(form); // 

		// Сообщаем в консоль
		formLogging(`Форма отправлена!`);
	}

	function formLogging(message) {
		FLS(`[Формы]: ${message}`);
	}
}
/* Модуь формы "колличество" */
export function formQuantity() {
	document.addEventListener("click", function (e) {
		let targetElement = e.target;

		// Проверяем, кликнули ли по кнопке увеличения/уменьшения количества
		if (targetElement.closest('.quantity__button')) {
			let inputField = targetElement.closest('.quantity').querySelector('input');
			let value = parseInt(inputField.value);

			// Если нажата кнопка "+", увеличиваем значение
			if (targetElement.classList.contains('quantity__button_plus')) {
				value++;
			}
			// Если нажата кнопка "-", уменьшаем значение
			else {
				value--; // Уменьшаем значение
				if (value < 0) value = 0; // Ограничиваем минимальное значение 0 вместо 1
			}

			// Обновляем значение в input
			inputField.value = value;
		}
	});
}
/* Модуль звездного рейтинга */
export function formRating() {
	const ratings = document.querySelectorAll('.rating');

	if (ratings.length > 0) {
		initRatings();
	}

	// Основная функция
	function initRatings() {
		let ratingActive, ratingValue;

		// "Бегаем" по всем рейтингам на странице
		for (let index = 0; index < ratings.length; index++) {
			const rating = ratings[index];
			initRating(rating);
		}

		// Инициализируем конкретный рейтинг
		function initRating(rating) {
			initRatingVars(rating);
			setRatingActiveWidth();

			if (rating.classList.contains('rating_set')) {
				setRating(rating);
			}
		}

		// Инициализация переменных
		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__activeline');
			ratingValue = rating.querySelector('.rating-input');
		}

		// Изменяем ширину активных звезд
		function setRatingActiveWidth() {
			if (ratingValue) {
				const ratingActiveWidth = ratingValue.value / 0.05;
				ratingActive.style.width = `${ratingActiveWidth}%`;
			}
		}

		if (ratingValue) {
			ratingValue.addEventListener('change', function () {
				setRatingActiveWidth();
			});
		}

		// Возможность указать оценку
		function setRating(rating) {
			const ratingItems = rating.querySelectorAll('.rating__star');

			for (let index = 0; index < ratingItems.length; index++) {
				const ratingItem = ratingItems[index];

				// При наведении на звезду (вперед)
				ratingItem.addEventListener("mouseenter", function (e) {
					initRatingVars(rating);

					// Рассчитываем новую ширину активной линии
					const hoveredIndex = index + 1;
					const linew = (hoveredIndex / ratingItems.length) * 100; // Ширина в процентах
					ratingActive.style.width = `${linew}%`;

					// Добавляем класс hovered для всех звезд до текущей
					for (let i = 0; i <= index; i++) {
						ratingItems[i].classList.add("hovered");
					}

					// Убираем класс hovered для последующих звезд
					for (let i = index + 1; i < ratingItems.length; i++) {
						ratingItems[i].classList.remove("hovered");
					}
				});

				// При убирании курсора с звезды (назад)
				ratingItem.addEventListener("mouseleave", function (e) {
					initRatingVars(rating);

					// Находим индекс последней звезды, на которую был сделан hover
					let lastHoveredIndex = -1;

					// Проверяем, какая из звезд имеет класс hovered
					for (let i = ratingItems.length - 1; i >= 0; i--) {
						if (ratingItems[i].classList.contains("hovered")) {
							lastHoveredIndex = i;
							break;
						}
					}

					// Если курсор полностью убран, возвращаем исходную ширину
					if (lastHoveredIndex === -1) {
						if (ratingValue) {
							setRatingActiveWidth(); // Возвращаем значение из input
						} else {
							ratingActive.style.width = '0%'; // Если значение не установлено
						}
					} else {
						// Если курсор убран с определенной звезды, уменьшаем ширину
						const linew = ((lastHoveredIndex + 1) / ratingItems.length) * 100;
						ratingActive.style.width = `${linew}%`;

						// Обновляем классы hovered
						for (let i = 0; i <= lastHoveredIndex; i++) {
							ratingItems[i].classList.add("hovered");
						}
						for (let i = lastHoveredIndex + 1; i < ratingItems.length; i++) {
							ratingItems[i].classList.remove("hovered");
						}
					}
				});

				// При клике на звезду
				ratingItem.addEventListener("click", function (e) {
					initRatingVars(rating);

					if (rating.dataset.ajax) {
						// Отправляем значение на сервер
						setRatingValue(ratingItem.value, rating);
					} else {
						// Обновляем значение рейтинга
						ratingValue.value = ratingItem.value;
						setRatingActiveWidth();
					}

					// Убираем класс hovered со всех звезд
					for (let i = 0; i < ratingItems.length; i++) {
						ratingItems[i].classList.remove("hovered");
					}
				});
			}
		}

		// Отправка значения рейтинга через AJAX
		async function setRatingValue(value, rating) {
			if (!rating.classList.contains('rating_sending')) {
				rating.classList.add('rating_sending');

				// Отправка данных на сервер
				let response = await fetch('rating.json', {
					method: 'GET',
				});

				if (response.ok) {
					const result = await response.json();
					const newRating = result.newRating;

					// Обновляем среднее значение рейтинга
					ratingValue.value = newRating;
					setRatingActiveWidth();
					rating.classList.remove('rating_sending');
				} else {
					alert("Ошибка");
					rating.classList.remove('rating_sending');
				}
			}
		}
	}
}
