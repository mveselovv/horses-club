document.addEventListener('DOMContentLoaded', function () {
	const mediaQuery = window.matchMedia('(max-width: 576px)');
	const marqueeSections = document.querySelectorAll('.marquee');
	const textDiscount = document.querySelector('.price__discount');
	const textDiscountSecond = document.querySelector('.price__discount-second');
	const participantsSection = document.querySelector('.participants');
	const participantsContainer = document.querySelector('.participants__container');
	const participantsPaginate = document.querySelector('.participants__paginate');
	const participantsHeader = document.querySelector('.participants__header');

	// Бегущая строка
	marqueeSections.forEach(section => {
		const marqueeList = section.querySelector('.marquee__list');
		const marqueeItems = section.querySelectorAll('.marquee__list-item');
		let marqueeWidth = 0;

		marqueeItems.forEach(item => {
			marqueeWidth += item.offsetWidth;
		});

		marqueeList.style.width = `${marqueeWidth}px`;
	});

	// Секция, где текст разбивается на части.
	const handleMediaQueryChange = (event) => {
		if (event.matches) {
			const textBlock = document.querySelector('.tournament__text-block');
			const image = document.querySelector('.tournament__image');
			textBlock.appendChild(image);
		} else {
			const container = document.querySelector('.tournament__invite');
			const textBlock = document.querySelector('.tournament__text-block');
			const image = document.querySelector('.tournament__image');
			container.insertBefore(image, textBlock);
		}
	};

	// Инициализация слайдера в секции этапов
	const sliderStages = (event) => {
		if (event.matches) {
			// Проверяем, не инициализирован ли уже слайдер
			const stagesList = document.querySelector('.stages__list');
			if (stagesList.classList.contains('swiper-container-initialized')) {
				return;
			}

			// Добавляем класс stages__list-slider к элементу stages__list
			stagesList.classList.add('stages__list-slider');

			// Создаем новый элемент div с классом swiper-wrapper
			const swiperWrapper = document.createElement('div');
			swiperWrapper.classList.add('swiper-wrapper');

			// Перемещаем все stages__item внутрь нового элемента swiper-wrapper
			const stagesItems = document.querySelectorAll('.stages__item');
			stagesItems.forEach(function (item) {
				item.classList.add('swiper-slide');
				swiperWrapper.appendChild(item);
			});


			// Удаляем все дочерние элементы из stages__list
			while (stagesList.firstChild) {
				stagesList.firstChild.remove();
			}

			// Добавляем новый элемент swiper-wrapper внутрь stages__list
			stagesList.appendChild(swiperWrapper);

			// Инициализируем Swiper
			new Swiper('.stages__list-slider', {
				slidesPerView: 1,
				spaceBetween: 20,
				height: 'auto',
				navigation: {
					prevEl: '.stages__prev',
					nextEl: '.stages__next',
					disabledClass: 'project-arrow__disabled'
				},
				pagination: {
					el: '.project__paginate .stages__bulls',
					bulletClass: 'project__paginate-bull',
					bulletActiveClass: 'project__paginate-bull-active'
				}
			});
		} else {
			// Удаляем класс stages__list-slider из элемента stages__list
			const stagesList = document.querySelector('.stages__list');
			stagesList.classList.remove('stages__list-slider', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

			// Удаляем классы swiper-slide у всех stages__item
			const stagesItems = document.querySelectorAll('.stages__item');
			stagesItems.forEach(function (item) {
				item.classList.remove('swiper-slide', 'swiper-slide-active', 'swiper-slide-next');
				item.removeAttribute('role')
				item.removeAttribute('aria-label')
				item.removeAttribute('style')
			});

			// Удаляем все дочерние элементы из stages__list
			while (stagesList.firstChild) {
				stagesList.firstChild.remove();
			}

			// Перемещаем все stages__item обратно внутрь stages__list
			stagesItems.forEach(function (item) {
				stagesList.appendChild(item);
			});
		}
	};

	// Перемещение пагинации в секции участников туранира
	const movePagination = (event) => {
		if (!event.matches) {
			participantsHeader.appendChild(participantsPaginate);
		} else {
			participantsContainer.appendChild(participantsPaginate);
		}
	};

	const priceChange = (event) => {
		if (event.matches) {
			textDiscount.innerHTML = '20 коп.';
			textDiscountSecond.innerHTML = '50 коп.';
		} else {
			textDiscount.innerHTML = '50 коп.';
			textDiscountSecond.innerHTML = '20 коп.';
		}
	};

	// Инициализация слайдера в секции участников турнира.
	if (participantsSection) {
		new Swiper('.participants__list', {
			slidesPerView: 1,
			autoplay: {
				delay: 4000,
			},
			height: 'auto',
			navigation: {
				prevEl: '.participants__prev',
				nextEl: '.participants__next',
				disabledClass: 'project-arrow__disabled'
			},
			pagination: {
				el: ".participants__fraction",
				type: "fraction",
			},
			breakpoints: {
				768: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 20
				},
			},
			on: {
				init() {
				  this.el.addEventListener('mouseenter', () => {
					 this.autoplay.stop();
				  });
		  
				  this.el.addEventListener('mouseleave', () => {
					 this.autoplay.start();
				  });
				}
			 },
		});
	}

	function scrollToBlock(event) {
		event.preventDefault(); // предотвращаем переход по ссылке

		const targetId = event.target.getAttribute('data-to'); // получаем атрибут href кнопки
		const targetBlock = document.querySelector(targetId); // находим целевой блок по id

		if (targetBlock) {
			window.scrollTo({
				top: targetBlock.offsetTop, // позиция блока от верхней границы страницы
				behavior: 'smooth' // плавная прокрутка
			});
		}
	}

	const buttons = document.querySelectorAll('.scroll-button'); // выбираем все кнопки

	buttons.forEach(button => {
		button.addEventListener('click', scrollToBlock); // добавляем обработчик события клика на каждую кнопку
	});

	// Инициализация и слежка за изменениями
	handleMediaQueryChange(mediaQuery);
	sliderStages(mediaQuery);
	movePagination(mediaQuery);
	priceChange(mediaQuery);
	mediaQuery.addEventListener('change', handleMediaQueryChange);
	mediaQuery.addEventListener('change', sliderStages);
	mediaQuery.addEventListener('change', movePagination);
	mediaQuery.addEventListener('change', priceChange);
});