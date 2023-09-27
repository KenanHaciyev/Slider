import mockSliderContent from './modules/contentMock.js';
import render from './modules/render.js';

const slider = document.querySelector('.slider__content');
const prev = document.querySelector('.arrow-left');
const next = document.querySelector('.arrow-right');
const paginationItems = document.querySelectorAll('.pagination-item');
const totalWrapper = document.querySelector('.wrapper');
let currentIndex = 1;
let autoplay;

render(mockSliderContent, slider);
const slideList = document.querySelectorAll('.slide');

const setActiveOnClickPagination = (array, e) => {
	array.forEach((pagItem, i) => {
		pagItem.classList.remove('active');
		if (i + 1 === +e.target.textContent) {
			e.target.classList.add('active');
			//Update the currentIndex based on the clicked pagination item
			currentIndex = i * 3 + 1;
			hideSlides();
			showSlides(currentIndex);
		}
	});
};

const hideSlides = () => slideList.forEach(item => (item.style.display = 'none'));

const showSlides = i => {
	//Display the current slide and its neighbors
	slideList[i - 1].style.display = 'block';
	slideList[i].style.display = 'block';
	slideList[i + 1].style.display = 'block';

	paginationItems.forEach(item => item.classList.remove('active'));
	paginationItems[Math.floor(i / 3)].classList.add('active');
};

const showNextSlides = () => {
	if (currentIndex === slideList.length - 2) {
		currentIndex = 1; //return back if we at the last slides group
	} else {
		currentIndex += 3; // move to the next 3 slides
	}
	hideSlides();
	showSlides(currentIndex);
};

const showPreviousSlides = () => {
	if (currentIndex === 1) {
		currentIndex = slideList.length - 2;
	} else {
		currentIndex -= 3;
	}
	hideSlides();
	showSlides(currentIndex);
};

const startAutoplay = () => (autoplay = setInterval(showNextSlides, 4000));

const handleNextBtn = () => next.addEventListener('click', showNextSlides);

const handlePrevBtn = () => prev.addEventListener('click', showPreviousSlides);

//for stopping an autoplay when we click the buttons or when mouse is inside of slider
totalWrapper.addEventListener('mouseenter', () => clearInterval(autoplay));
totalWrapper.addEventListener('mouseleave', startAutoplay);

paginationItems.forEach(item => {
	item.addEventListener('click', e => setActiveOnClickPagination(paginationItems, e));
});

handleNextBtn();
handlePrevBtn();
hideSlides();
showSlides(currentIndex);
startAutoplay();
