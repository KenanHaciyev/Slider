const render = (slidesArray, parentNode) => {
	slidesArray.forEach(slide => {
		const slideItem = `
        <div class="slide">
        <div class="slide__bg">
            <img class="slide__img" src=./images/${slide.path} alt="slide-name" ></img>
        </div>
        <div class="slide__content">
            <small class="slide__create">
                ${slide.create} <span class="author">${slide.author}</span>
            </small>
            <div class="slide__title">
                <span class="head-word">${slide.headWord}:</span> ${slide.description}
            </div>
            <small class="slide__tags">${slide.tags}</small>
        </div>
        </div>
    `;
		parentNode.innerHTML += slideItem;
	});
};

export default render;
