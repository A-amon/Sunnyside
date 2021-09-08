
const headerButton = document.querySelector('.header__button')
const header = document.querySelector('.header')

/**
 * Handle .header__button click
 * > Toggle navbar 
 * > Hide body overflow
 */
const handleNavToggle = () => {
	header.classList.toggle('expanded')
	document.body.classList.toggle('no-scroll')

	const isExpanded = !(headerButton.getAttribute('aria-expanded') === 'true')

	headerButton.setAttribute('aria-label', `${isExpanded ? 'Close' : 'Open'} dropdown menu`)
	headerButton.setAttribute('aria-expanded', isExpanded)

	if (isExpanded) {
		header.addEventListener('keydown', handleHeaderKeyDown)
	}
	else {
		header.removeEventListener('keydown', handleHeaderKeyDown)
	}

	headerButton.focus()
}

/**
 * Handle header keydown event
 * @param  {object} event
 */
const handleHeaderKeyDown = (event) => {
	const code = event.code

	if (code === 'Escape') {
		handleNavToggle()
	}
	else {
		const headerItems = document.querySelectorAll('.header__item')
		const lastHeaderLink = headerItems[headerItems.length - 1].children[0]

		handleFocusTrap(event, headerButton, lastHeaderLink)
	}
}

/**
 * Handle focus trap
 * @param  {object} event
 * @param  {object} firstEl
 * @param  {object} lastEl
 */
const handleFocusTrap = (event, firstEl, lastEl) => {
	const { shiftKey, code } = event

	if (shiftKey && code === 'Tab') {
		if (document.activeElement === firstEl) {
			event.preventDefault()
			lastEl.focus()
		}
	}
	else if (!shiftKey && code === 'Tab') {
		if (document.activeElement === lastEl) {
			event.preventDefault()
			firstEl.focus()
		}
	}
}

/**
 * Observe .why__image intersection
 * Animate if intersect
 */
const setIntObserver = () => {
	const whyImages = document.querySelectorAll('.why__image')
	const options = {
		threshold: 0.5	// isIntersecting = true when 50%
	}

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const { target, isIntersecting } = entry

			if (isIntersecting) {
				target.classList.add('animate')
			}
			else if (!isIntersecting) {
				target.classList.remove('animate')
			}
		})
	}, options)

	whyImages.forEach(whyImage => observer.observe(whyImage))
}

headerButton.addEventListener('click', handleNavToggle)
setIntObserver()