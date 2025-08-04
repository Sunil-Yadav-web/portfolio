const overlays = document.querySelector('.overlays');
const nav_list = document.querySelectorAll('.project-1 ul li');


// Function to activate the overlay
const activateOverlay = (list) => {
	let position = list.getBoundingClientRect();
	overlays.classList.add('active');
	overlays.style.left = position.x + 'px';
	overlays.style.top = position.y + 'px';
	overlays.style.height = position.height + 'px';
	overlays.style.width = position.width + 'px';
};

// Function to deactivate the overlay
const deactivateOverlay = () => {
	overlays.classList.remove('active');
};

// Add event listeners for both mouse and touch events
nav_list.forEach((list) => {
	// Mouse events
	list.addEventListener('mouseover', () => activateOverlay(list));
	list.addEventListener('mouseout', deactivateOverlay);

	// Touch events
	list.addEventListener('touchstart', () => activateOverlay(list));
	list.addEventListener('touchend', deactivateOverlay);
});

// Handle window resize to ensure overlay position is correct
window.addEventListener('resize', () => {
	if (overlays.classList.contains('active')) {
		const activeListItem = document.querySelector('.project-1 ul li:hover');
		if (activeListItem) {
			activateOverlay(activeListItem);
		}
	}
});
