
//Поиск

const searchButton = document.querySelector('.search-header__input input');
const search = document.querySelector('.header__search');
const searchMobButton = document.querySelector('.header__search-mob');
const searchClose = document.querySelector('.search-header__close');

if (searchButton) {
    const shadow = document.querySelector('.header__shadow');
    searchButton.addEventListener("click", function (e) {
        search.classList.add('_active-search')
    });
    searchMobButton.addEventListener("click", function (e) {
        document.documentElement.classList.add('_search-open')
        document.documentElement.classList.add('lock')
    });
    searchClose.addEventListener("click", function (e) {
        search.classList.remove('_active-search');
        document.documentElement.classList.remove('_search-open');
        document.documentElement.classList.remove('lock');
    });
    shadow.addEventListener("click", function (e) {
        search.classList.remove('_active-search');
        document.documentElement.classList.remove('_search-open');
        document.documentElement.classList.remove('lock');
    });
    window.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.closest('.header__search') && !target.closest('.header__search-mob')) {
            search.classList.remove('_active-search');
            document.documentElement.classList.remove('_search-open');
        }
    });
}

//========================================================================================================================================================

//Фильтр 

const filters = '.filters';
const containerElements = document.querySelectorAll(filters);

containerElements.forEach(container => {
    const buttonsSelector = `.filter__navigation`;
    const buttonSelector = `${buttonsSelector} [data-filter]`;
    const buttonActiveClass = '_active';

    const itemsSelector = `.filter-content`;
    const itemSelector = `.filter-column`;
    const itemHiddenClass = '_hide';
    const itemFilterClassPrefix = 'filter__column_';

    const buttons = container.querySelectorAll(buttonSelector);
    if (!buttons.length) return;

    // Добавляем обработчики клика на кнопки фильтрации
    buttons.forEach(button => {
        button.addEventListener('click', onFilterButtonClick);
    });

    // Инициализация: имитируем клик на "Все"
    const allButton = container.querySelector(`${buttonSelector}[data-filter="all"]`);
    if (allButton) {
        allButton.click();
    }

    function onFilterButtonClick(event) {
        const currentTarget = event.currentTarget;
        const filter = currentTarget.dataset.filter;
        const activeItemClass = itemFilterClassPrefix + filter;

        const isProductsOthers = container.closest('.products-others') !== null;

        // Устанавливаем активный класс для кнопки
        container.querySelectorAll(buttonSelector).forEach(n => {
            n.classList.toggle(buttonActiveClass, n === currentTarget);
        });

        const itemsContainer = container.querySelector(itemsSelector);
        const items = itemsContainer.querySelectorAll(itemSelector);

        // Применяем фильтр
        if (filter === 'all') {
            if (!isProductsOthers) {
                // Скрываем все элементы
                items.forEach(item => item.classList.add(itemHiddenClass));

                // Показываем первые 8
                Array.from(items).slice(0, 8).forEach(item => {
                    item.classList.remove(itemHiddenClass);
                });
            } else {
                // Для .products-others показываем всё
                items.forEach(item => item.classList.remove(itemHiddenClass));
            }
        } else {
            // Обычная фильтрация
            items.forEach(item => {
                const shouldShow = item.classList.contains(activeItemClass);
                item.classList.toggle(itemHiddenClass, !shouldShow);
            });
        }
    }
});

//========================================================================================================================================================

//Избранное

const favourites = document.querySelectorAll('.favourites');

if (favourites) {
    favourites.forEach(favourite => {
        favourite.addEventListener("click", function (e) {
            e.preventDefault();
            favourite.classList.toggle('_active')
        });
    });

}

//========================================================================================================================================================

//скролл
function scroll() {

    let scrolls = document.querySelectorAll('.scroll');

    if (scrolls) {

        let speed = 2; // Скорость скролла.
        let left = 0;
        let top = 0;
        let drag = false;
        let coorX = 0;
        let coorY = 0;

        scrolls.forEach(scroll => {
            scroll.addEventListener('mousedown', function (e) {
                drag = true;
                coorX = e.pageX;
                coorY = e.pageY;
            });
            document.addEventListener('mouseup', function () {
                drag = false;
                left = scroll.scrollLeft;
                top = scroll.scrollTop;
            });
            scroll.addEventListener('mousemove', function (e) {
                if (drag) {
                    this.scrollLeft = left - (e.pageX - coorX) * speed;
                    this.scrollTop = top - (e.pageY - coorY) * speed;
                }
            });
        });

    }

};

scroll()

//========================================================================================================================================================

//календарь
const calendars = document.querySelectorAll(".calendars");
if (calendars.length > 0) {
    calendars.forEach(calendar => {
        const calendarMain = calendar.querySelector(".calendar__main");
        const calHeaderTitle = calendar.querySelector(".calendar__header span");
        const parentColumn = calendar.closest(".drop-down-button");
        const input = parentColumn.querySelector(".input-calendar");
        if (!input) {
            console.error("Элемент .input-calendar не найден.");
            return;
        }

        const months = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];

        // Текущая временная метка
        const todayTimestamp = Date.now() - (Date.now() % (24 * 60 * 60 * 1000));
        let selectedDate = null;

        // Функция получения количества дней в месяце
        const getNumberOfDays = (year, month) => {
            return new Date(year, month + 1, 0).getDate();
        };

        // Получение деталей дня
        const getDayDetails = (args) => {
            let date = args.index - args.firstDay;
            let dayOfWeek = (args.index % 7 + 7) % 7;
            let prevMonth = args.month - 1;
            let nextMonth = args.month + 1;
            let prevYear = args.year;
            let nextYear = args.year;

            if (prevMonth < 0) {
                prevMonth = 11;
                prevYear--;
            }
            if (nextMonth > 11) {
                nextMonth = 0;
                nextYear++;
            }

            let prevMonthDays = getNumberOfDays(prevYear, prevMonth);
            let currentMonthDays = getNumberOfDays(args.year, args.month);

            let displayDate, displayMonth, displayYear;
            if (date < 0) {
                // Дни предыдущего месяца
                displayDate = prevMonthDays + date + 1;
                displayMonth = prevMonth;
                displayYear = prevYear;
            } else if (date >= currentMonthDays) {
                // Дни следующего месяца
                displayDate = date - currentMonthDays + 1;
                displayMonth = nextMonth;
                displayYear = nextYear;
            } else {
                // Текущий месяц
                displayDate = date + 1;
                displayMonth = args.month;
                displayYear = args.year;
            }

            let timestamp = new Date(Date.UTC(displayYear, displayMonth, displayDate)).getTime();
            return {
                date: displayDate,
                day: dayOfWeek,
                month: displayMonth === args.month ? 0 : displayMonth < args.month ? -1 : 1,
                timestamp: timestamp
            };
        };

        // Получение деталей месяца
        const getMonthDetails = (year, month) => {
            let firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
            firstDay = firstDay === 0 ? 6 : firstDay - 1; // Неделя начинается с понедельника
            let numberOfDays = getNumberOfDays(year, month);
            let monthArray = [];
            for (let i = 0; i < 42; i++) { // Всегда 6 недель × 7 дней
                monthArray.push(getDayDetails({
                    index: i,
                    numberOfDays: numberOfDays,
                    firstDay: firstDay,
                    year: year,
                    month: month
                }));
            }
            return monthArray;
        };

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let monthDetails = getMonthDetails(year, month);

        const setCalBody = (monthDetails) => {
            calendarMain.innerHTML = "";
            monthDetails.forEach(day => {
                let div = document.createElement("div"),
                    span = document.createElement("span");
                div.classList.add("cell_wrapper");
                div.classList.add("cal_date");

                if (day.month === 0) {
                    div.classList.add("current");
                } else if (day.month === -1) {
                    div.classList.add("prev-month");
                } else if (day.month === 1) {
                    div.classList.add("next-month");
                }

                // Проверяем, является ли день сегодняшним
                if (day.timestamp === todayTimestamp && day.month === 0) {
                    div.classList.add("isCurrent");
                }

                // Добавляем класс disabled для прошедших дней
                if (day.timestamp < todayTimestamp) {
                    div.classList.add("disabled");
                    div.style.pointerEvents = "none";
                }

                span.classList.add("cell_item");
                span.innerText = day.date;
                div.setAttribute("data-timestamp", day.timestamp);
                div.appendChild(span);
                calendarMain.appendChild(div);
            });
        };

        const setHeader = (year, month) => {
            calHeaderTitle.innerHTML = `${months[month]} ${year}`;
        };

        const navigateMonth = (offset) => {
            month += offset;
            if (month === -1) {
                month = 11;
                year--;
            } else if (month === 12) {
                month = 0;
                year++;
            }
            monthDetails = getMonthDetails(year, month);
            setHeader(year, month);
            setCalBody(monthDetails);
        };

        setHeader(year, month);
        setCalBody(monthDetails);

        calendar.querySelectorAll(".calendar-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                let offset = btn.classList.contains("calendar__btn-prev") ? -1 : 1;
                navigateMonth(offset);
            });
        });

        // Логика выбора даты
        const clearSelection = () => {
            selectedDate = null;
            calendar.querySelectorAll(".cell_wrapper").forEach(cell => {
                cell.classList.remove("isSelected");
            });
        };

        const updateInputValue = (timestamp) => {
            const dateString = getDateStringFromTimestamp(timestamp);
            input.value = dateString;
            input.dataset[input.hasAttribute("data-start") ? "start" : "end"] = dateString;
        };

        const getDateStringFromTimestamp = (timestamp) => {
            let dateObject = new Date(timestamp);
            let year = dateObject.getUTCFullYear();
            let month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
            let day = String(dateObject.getUTCDate()).padStart(2, '0');
            return `${day}-${month}-${year}`;
        };

        // Функция закрытия календаря
        const closeCalendar = () => {
            const filterTabsButtons = document.querySelectorAll('.drop-down-button');
            const shadow = document.querySelector('.shadow');
            shadow.classList.remove("_active");
            document.documentElement.classList.remove('filter-open');
            filterTabsButtons.forEach((button) => button.classList.remove("_active"));
        };

        // Делегирование событий для кликов на даты
        calendarMain.addEventListener("click", (e) => {
            const target = e.target.closest(".cell_wrapper.current");
            if (!target || target.classList.contains("disabled")) {
                return;
            }

            const cellTimestamp = parseInt(target.getAttribute("data-timestamp"));
            if (!cellTimestamp) {
                return;
            }

            clearSelection();
            selectedDate = cellTimestamp;
            target.classList.add("isSelected");
            updateInputValue(selectedDate);

            // Закрытие календаря при клике на дату
            closeCalendar();
        });
    });
}


//========================================================================================================================================================

const shadow = document.querySelector('.shadow');
const closes = document.querySelectorAll('.close');

//Фильтр табы

const filterTabsButtons = document.querySelectorAll('.drop-down-button');

if (filterTabsButtons) {
    filterTabsButtons.forEach((button, i) => {
        const filterTabsCloseBtn = button.querySelector('.drop-down-titles');
        const filterTabsClose = document.querySelectorAll('.body-filter-tabs__close');

        const sBtntext = button.querySelector('.filter-tabs__subtitle');
        const sBtntitle = button.querySelector('.title-search-result .filter-tabs__title');
        const options = button.querySelectorAll('.options__input');

        const quantityButtons = button.querySelectorAll('.quantity-button');
        quantityButtons.forEach(quantityButton => {
            quantityButton.addEventListener("click", function (e) {
                const quantityInputs_1 = button.querySelector('.quantity-input-1');
                const quantityInputs_2 = button.querySelector('.quantity-input-2');

                const quantityTitle = button.querySelector('.filter-tabs__subtitle span');

                // Преобразуем значения input в числа, но позволяем 0
                const value_1 = parseFloat(quantityInputs_1.value) || 0; // Если пусто, используем 0
                const value_2 = parseFloat(quantityInputs_2.value) || 0; // Если пусто, используем 0

                // Рассчитываем общее количество
                const total = value_1 + value_2;

                // Обновляем текст в заголовке
                quantityTitle.innerHTML = total;

                // Дополнительные действия после клика
                button.classList.remove("_active");
                shadow.classList.remove("_active");
                document.documentElement.classList.remove('filter-open');
            });
        });


        options.forEach(option => {
            option.addEventListener("change", function (e) {
                // Получаем значение выбранного radio или текст метки
                const selectedText = option.labels[0]?.textContent || option.value;
                if (sBtntext) {
                    sBtntext.innerHTML = selectedText;
                }
                if (sBtntitle) {
                    sBtntitle.innerHTML = selectedText;
                }
                options.forEach(el => { el.classList.remove('_active'); });
                option.classList.add("_active");
                button.classList.remove("_active")
                shadow.classList.remove("_active");
                document.documentElement.classList.remove('filter-open')
            });
        });


        if (filterTabsCloseBtn) {
            filterTabsCloseBtn.addEventListener("click", function (e) {
                let elem_active = button.classList.contains("_active")
                filterTabsButtons.forEach(opt => {
                    opt.classList.remove('_active');
                })
                button.classList.toggle("_active", !elem_active)
                if (shadow) {
                    shadow.classList.add('_active')
                }
                document.documentElement.classList.add('filter-open')
            });
        }

        window.addEventListener('click', e => {
            const target = e.target
            if (!target.closest('.body-filter-tabs__simplebar') && !target.closest('.drop-down-titles') && !target.closest('.body-filter-tabs__title-mob')) {
                button.classList.remove("_active")
                if (shadow) {
                    shadow.classList.remove('_active')
                }
                document.documentElement.classList.remove('filter-open')
            }
        })

        if (filterTabsClose) {
            filterTabsClose.forEach(close => {
                close.addEventListener("click", function (e) {
                    button.classList.remove("_active")
                    if (shadow) {
                        shadow.classList.remove('_active')
                    }
                    document.documentElement.classList.remove('filter-open')
                });
            });
        }
    });
}

//========================================================================================================================================================

//Фильтр поиска

const filterSearchButtons = document.querySelectorAll('.checkbox__column');

if (filterSearchButtons) {
    filterSearchButtons.forEach((button, i) => {
        const filterSearchArrow = button.querySelector('.checkbox__arrow');

        if (filterSearchArrow) {
            filterSearchArrow.addEventListener("click", function (e) {
                let elem_active = button.classList.contains("_active")
                filterSearchButtons.forEach(item => {
                    item.classList.remove('_active');
                })
                button.classList.toggle("_active", !elem_active)
            });
        }

    });
};

const checkboxContents = document.querySelectorAll(".filters-search__checkboxes");
if (checkboxContents) checkboxContents.forEach((content => {
    const checkboxMore = content.querySelector(".checkbox__more");
    const checkboxBlock = content.querySelectorAll(".checkbox__column");
    if (checkboxBlock.length > 5) content.classList.remove("hidden"); else content.classList.add("hidden");
    if (checkboxMore) checkboxMore.addEventListener("click", (function (e) {
        let elem_active = content.classList.contains("_showmore-active");
        checkboxContents.forEach((item => {
            item.classList.remove("_showmore-active");
        }));
        content.classList.toggle("_showmore-active", !elem_active);
    }));
}));

const checkboxBlocks = document.querySelectorAll(".checkbox__column");

if (checkboxBlocks) {
    checkboxBlocks.forEach(block => {
        const allCheckBox = block.querySelector(".main-checkbox-spoller");
        const otherCheckBoxes = block.querySelectorAll(".checkbox-spoller");

        if (allCheckBox && otherCheckBoxes.length > 0) {

            // При клике на главный чекбокс:
            allCheckBox.addEventListener("click", function () {
                // Переключаем класс _active у .checkbox__column
                block.classList.toggle("_active", allCheckBox.checked);

                // Устанавливаем состояние всех дочерних чекбоксов
                otherCheckBoxes.forEach(item => {
                    item.checked = allCheckBox.checked;
                });
            });

            // Обновляем главный чекбокс и возможно добавляем класс при изменении любого дочернего
            otherCheckBoxes.forEach(item => {
                item.addEventListener("click", function () {
                    const checkedBoxes = block.querySelectorAll(".checkbox-spoller:checked");
                    const isAllChecked = checkedBoxes.length === otherCheckBoxes.length;

                    allCheckBox.checked = isAllChecked;

                    // Добавляем класс _active, если выбран хотя бы один дочерний
                    if (!isAllChecked && checkedBoxes.length > 0) {
                        block.classList.add("_active");
                    } else if (isAllChecked === false && checkedBoxes.length === 0) {
                        block.classList.remove("_active");
                    }
                });
            });
        }
    });
}

const searchFilterButton = document.querySelector('.search__filter');

if (searchFilterButton) {
    searchFilterButton.addEventListener("click", function (e) {
        document.documentElement.classList.toggle('filter-search-active')
    });
    window.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.filters-search__content') && !target.closest('.title-mob') && !target.closest('.search__filter')) {
            document.documentElement.classList.remove('filter-search-active')
        }
    })

    if (closes) {
        closes.forEach(close => {
            close.addEventListener("click", function (e) {
                document.documentElement.classList.remove('filter-search-active')
            });
        });
    }
}

//========================================================================================================================================================

//Прилипающий блок

const stickyBlock = document.querySelector('.right-product-sticky');

function sticky() {
    let header = document.querySelector('.header');
    const page = document.querySelector('.page');
    const floatingButton = document.querySelector('.floating-button');
    const footer = document.querySelector('.footer');

    const searchTop = document.querySelector('.search__top');
    const searchBottom = document.querySelector('.page__search-content');

    const searchButtons = document.querySelector('.search__buttons');

    const filterFloatingButton = document.querySelector('.filters-search__floating-btn');

    let hheader = window.getComputedStyle(header, false).height;
    hheader = Number(hheader.slice(0, hheader.length - 2));

    //Прилипащая кнопка фильтр чекбокс
    if (filterFloatingButton) {
        const checkboxInput = document.querySelectorAll('.checkbox__input');
        const filterContent = document.querySelector('.filters-search__content');

        // Ширина
        let wfilterContent = window.getComputedStyle(filterContent, false).width;
        wfilterContent = Number(wfilterContent.slice(0, wfilterContent.length - 2));

        // Высота
        let hfilterContent = filterContent.getBoundingClientRect().top;

        // Установка начальной позиции для кнопки
        filterFloatingButton.style.left = wfilterContent + 'px';
        filterFloatingButton.style.display = 'none'; // Сначала скрыть кнопку

        let timeoutId = null; // Переменная для хранения идентификатора таймера

        checkboxInput.forEach(input => {
            function checkboxClick() {
                if (document.documentElement.clientWidth > 991.98) { // Проверка ширины экрана

                    // Очищаем предыдущий таймер, если он существует
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    if (input.checked) {
                        // Расчет верхней позиции для кнопки
                        let top = input.getBoundingClientRect().top - hfilterContent - 25;
                        filterFloatingButton.style.top = top + 'px';
                        filterFloatingButton.style.display = 'block'; // Показать кнопку
                        // Скрыть кнопку через 10 секунд
                        timeoutId = setTimeout(() => {
                            filterFloatingButton.style.display = 'none';
                        }, 10000); // 10000 миллисекунд = 10 секунд
                    } else {
                        // Если чекбокс снят, скрыть кнопку
                        let top = input.getBoundingClientRect().top - hfilterContent - 25;
                        filterFloatingButton.style.top = top + 'px';
                        // Скрыть кнопку через 10 секунд
                        timeoutId = setTimeout(() => {
                            filterFloatingButton.style.display = 'none';
                        }, 10000); // 10000 миллисекунд = 10 секунд
                    }
                }
            }

            // Добавление обработчика события на изменение состояния чекбокса
            input.addEventListener('change', function () {
                checkboxClick();
            });
        });
    }

    if (searchBottom) {
        let hsearchTop = window.getComputedStyle(searchTop, false).height;
        hsearchTop = Number(hsearchTop.slice(0, hsearchTop.length - 2));

        searchBottom.style.paddingTop = hsearchTop + 'px';
    }

    if (searchButtons) {

        let hsearchButtons = window.getComputedStyle(searchButtons, false).height;
        hsearchButtons = Number(hsearchButtons.slice(0, hsearchButtons.length - 2));

        searchBottom.style.paddingTop = hsearchButtons + 'px';
    }

    if (floatingButton) {
        let hfloatingButton = window.getComputedStyle(floatingButton, false).height;
        hfloatingButton = Number(hfloatingButton.slice(0, hfloatingButton.length - 2));
        if (document.documentElement.clientWidth < 479.98) {
            footer.style.marginBottom = hfloatingButton + 'px';
        } else {
            footer.style.marginBottom = '0';
        }
    }

    if (stickyBlock) {
        if (document.documentElement.clientWidth > 991.98) {
            stickyBlock.style.top = hheader + 'px';
            if (searchBottom) {
                let hsearchTop = window.getComputedStyle(searchTop, false).height;
                hsearchTop = Number(hsearchTop.slice(0, hsearchTop.length - 2));
                let sum = hheader + hsearchTop;
                stickyBlock.style.top = sum + 'px';
            }
        } else {
            stickyBlock.style.top = '0';
        }
    }

    page.style.paddingTop = hheader + 'px';

}

window.addEventListener('resize', () => {
    sticky();
});

window.addEventListener('scroll', () => {
    sticky();
});

window.addEventListener('load', () => {
    sticky();
});

sticky();

//========================================================================================================================================================

//Выбор номера

const searchRoomButton = document.querySelector('.search-room__buttons');

if (searchRoomButton) {
    searchRoomButton.addEventListener("click", function (e) {
        document.documentElement.classList.add('search-room-open');
    });
    window.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.search-room__title-mob') && !target.closest('.search-room__buttons') && !target.closest('.body-filter-tabs__simplebar') && !target.closest('.drop-down-titles') && !target.closest('.body-filter-tabs__close')) {
            document.documentElement.classList.remove('search-room-open')
        }
    })
}

//========================================================================================================================================================

//Выбор поиск

const mainSearchButton = document.querySelector('.search__content');

if (mainSearchButton) {
    mainSearchButton.addEventListener("click", function (e) {
        document.documentElement.classList.add('search-active');
    });
    window.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.search__tabs') && !target.closest('.search__title-mob') && !target.closest('.search__content') && !target.closest('.body-filter-tabs__simplebar') && !target.closest('.drop-down-titles') && !target.closest('.body-filter-tabs__close')) {
            document.documentElement.classList.remove('search-active')
        }
    })
}

//========================================================================================================================================================

//Прикрепить фото

let input = document.querySelector('input[type="file"]');

if (input) {
    // Блок предпросмотра
    const preview = document.querySelector('.popup__previews');
    // Список файлов
    const fileList = [];

    // Вешаем функцию onChange на событие change у <input>
    input.addEventListener('change', onChange);

    function onChange() {
        // По каждому файлу <input>
        [...input.files].forEach(file => {
            // Создаём читателя
            const reader = new FileReader;
            // Вешаем событие на читателя
            reader.addEventListener('loadend', () => {
                // Элемент списка .preview
                const item = document.createElement('div');
                item.classList.add('popup__preview');
                // Картинка для предпросмотра
                const image = new Image;
                // URI картинки
                image.src = `data:${file.type};base64,${btoa(reader.result)}`;
                // Ссылка на исключение картинки из списка выгрузки
                const remove = document.createElement('div');
                remove.classList.add('popup__preview-close');
                remove.classList.add('_icon-close');
                // Элемент массива fileList
                const fileItem = {
                    name: file.name,
                    modified: file.lastModified,
                    size: file.size,
                    data: reader.result
                };
                // Добавляем элемент в список выгрузки
                fileList.push(fileItem);
                // Обработчик клика по ссылке исключения картинки
                remove.addEventListener('click', () => {
                    // Исключаем элемент с картинкой из списка выгрузки
                    fileList.splice(fileList.indexOf(fileItem), 1);
                    // Удаляем элемент списка (<li>) из <ul> 
                    item.classList.add('removing');
                    setTimeout(() => item.remove(), 100);
                });
                item.appendChild(remove);
                item.appendChild(image);
                preview.appendChild(item);
            });
            // Запускаем чтение файла
            reader.readAsBinaryString(file);
        });
        // Сбрасываем значение <input>
        input.value = '';
        // Создаем клон <input>
        const newInput = input.cloneNode(true);
        // Заменяем <input> клоном
        input.replaceWith(newInput);
        // Теперь input будет указывать на клона
        input = newInput;
        // Повесим функцию onChange на событие change у нового <input>
        input.addEventListener('change', onChange);
    }
}

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', restoreState);
document.querySelectorAll('.form_main_search').forEach(form => {
    form.addEventListener('submit', saveState);
});

function saveState() {
    document.querySelectorAll('.form_main_search').forEach(form => {
        const formId = form.id;

        // Сохраняем даты
        const dateInput = form.querySelector('input[id^="podbornum"]');
        if (dateInput) {
            const dates = {
                start: dateInput.getAttribute('data-start'),
                end: dateInput.getAttribute('data-end')
            };
            localStorage.setItem(`dates_${formId}`, JSON.stringify(dates));
        }

        // Сохраняем фильтры с data-атрибутами
        form.querySelectorAll('.filter-tabs__subtitle[data-filter-type]').forEach(item => {
            const filterType = item.getAttribute('data-filter-type');
            const key = `${formId}_${filterType}`;
            const value = item.textContent.trim();

            // Не сохраняем placeholder-текст
            if (!value.startsWith('Выберите')) {
                localStorage.setItem(key, value);
            }
        });
    });
}

function restoreState() {
    document.querySelectorAll('.form_main_search').forEach(form => {
        const formId = form.id;

        // Восстанавливаем даты
        const savedDates = JSON.parse(localStorage.getItem(`dates_${formId}`));
        const dateInput = form.querySelector('input[id^="podbornum"]');
        if (savedDates && dateInput) {
            dateInput.setAttribute('data-start', savedDates.start);
            dateInput.setAttribute('data-end', savedDates.end);
            dateInput.value = `${savedDates.start} – ${savedDates.end}`;
        }

        // Восстанавливаем фильтры
        form.querySelectorAll('.filter-tabs__subtitle[data-filter-type]').forEach(item => {
            const filterType = item.getAttribute('data-filter-type');
            const key = `${formId}_${filterType}`;
            const savedValue = localStorage.getItem(key);

            if (savedValue) {
                item.textContent = savedValue;
            }
        });
    });
}

// Отслеживание динамических изменений
document.body.addEventListener('click', e => {
    const target = e.target.closest('.filter-tabs__subtitle, input[id^="podbornum"]');
    if (target) {
        setTimeout(() => {
            // Удаляем placeholder при выборе значения
            if (target.classList.contains('filter-tabs__subtitle')) {
                if (target.textContent.trim().startsWith('Выберите')) {
                    target.textContent = '';
                }
            }
            saveState();
        }, 0);
    }
});

//========================================================================================================================================================

//Ответ организации
const organizationalResponseMore = document.querySelectorAll('.organizational-response__more');

if (organizationalResponseMore) {
    organizationalResponseMore.forEach(more => {
        more.addEventListener('click', function (e) {
            const responseBlock = this.closest('.organizational-response');
            const content = responseBlock.querySelector('.organizational-response__content');
            const spans = this.querySelectorAll('span');

            content.classList.toggle('_active');

            // Переключаем видимые тексты
            spans[0].style.display = content.classList.contains('_active') ? 'none' : 'inline';
            spans[1].style.display = content.classList.contains('_active') ? 'inline' : 'none';
        });
    });
}

//========================================================================================================================================================
const ratings = document.querySelectorAll('[data-rating]');
if (ratings) {
    ratings.forEach(rating => {
        const ratingValue = +rating.dataset.ratingValue
        const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5
        formRatingInit(rating, ratingSize)
        ratingValue ? formRatingSet(rating, ratingValue) : null
        document.addEventListener('click', formRatingAction)
    });

    function formRatingAction(e) {
        const targetElement = e.target;
        if (targetElement.closest('.rating-hover__input')) {
            const currentElement = targetElement.closest('.rating-hover__input');
            const ratingValue = +currentElement.value
            const rating = currentElement.closest('.rating-hover')
            const ratingSet = rating.dataset.rating === 'set'
            ratingSet ? formRatingGet(rating, ratingValue) : null;
        }
    }
    function formRatingInit(rating, ratingSize) {
        let ratingItems = ``;
        for (let index = 0; index < ratingSize; index++) {
            index === 0 ? ratingItems += `<div class="rating-hover__items">` : null
            ratingItems += `
				<label class="rating-hover__item">
					<input class="rating-hover__input" type="radio" name="rating" value="${index + 1}">
				</label>`
            index === ratingSize ? ratingItems += `</div">` : null
        }
        rating.insertAdjacentHTML("beforeend", ratingItems)
    }
    function formRatingGet(rating, ratingValue) {
        const resultRating = ratingValue;
        formRatingSet(rating, resultRating);
    }
    function formRatingSet(rating, value) {
        const ratingItems = rating.querySelectorAll('.rating-hover__item');
        const resultFullItems = parseInt(value);
        const resultPartItem = value - resultFullItems;

        rating.hasAttribute('data-rating-title') ? rating.title = value : null

        ratingItems.forEach((ratingItem, index) => {
            ratingItem.classList.remove('rating-hover__item--active');
            ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null;

            if (index <= (resultFullItems - 1)) {
                ratingItem.classList.add('rating-hover__item--active');
            }
            if (index === resultFullItems && resultPartItem) {
                ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`)
            }
        });
    }
}