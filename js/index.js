document.addEventListener('DOMContentLoaded', function () {

  const themeToggleButton = document.getElementById('theme-toggle-button');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
  } else {
    htmlElement.classList.add('dark');
  }

  themeToggleButton.addEventListener('click', function () {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightActiveLink() {
    let currentSectionId = '';

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    }

    for (let i = 0; i < navLinks.length; i++) {
      const link = navLinks[i];
      link.classList.remove('text-primary', 'border-b-2', 'border-primary', 'pb-1');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('text-primary', 'border-b-2', 'border-primary', 'pb-1');
      }
    }
  }

  highlightActiveLink();
  window.addEventListener('scroll', highlightActiveLink);

  const filterButtons = document.querySelectorAll('.portfolio-filter');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  for (let i = 0; i < filterButtons.length; i++) {
    const button = filterButtons[i];
    button.addEventListener('click', function () {
      const filterValue = button.getAttribute('data-filter');

      for (let j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove('active');
      }
      button.classList.add('active');

      for (let j = 0; j < portfolioItems.length; j++) {
        const item = portfolioItems[j];
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });
  }

  const scrollToTopButton = document.getElementById('scroll-to-top-button');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      scrollToTopButton.classList.remove('opacity-0', 'invisible');
      scrollToTopButton.classList.add('opacity-100', 'visible');
    } else {
      scrollToTopButton.classList.add('opacity-0', 'invisible');
      scrollToTopButton.classList.remove('opacity-100', 'visible');
    }
  });

  scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const carouselTrack = document.getElementById('testimonials-carousel');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const nextButton = document.getElementById('next-testimonial');
  const prevButton = document.getElementById('prev-testimonial');
  const indicators = document.querySelectorAll('.carousel-indicator');

  let currentIndex = 0;
  const maxIndex = indicators.length - 1;

  function updateCarousel() {
    const cardWidth = testimonialCards[0].offsetWidth;
    carouselTrack.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';

    for (let i = 0; i < indicators.length; i++) {
      const indicator = indicators[i];
      if (i === currentIndex) {
        indicator.classList.add('bg-accent');
        indicator.classList.remove('bg-slate-400', 'dark:bg-slate-600');
      } else {
        indicator.classList.remove('bg-accent');
        indicator.classList.add('bg-slate-400', 'dark:bg-slate-600');
      }
    }
  }

  nextButton.addEventListener('click', function () {
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateCarousel();
  });

  prevButton.addEventListener('click', function () {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
    updateCarousel();
  });

  for (let i = 0; i < indicators.length; i++) {
    const index = i;
    indicators[i].addEventListener('click', function () {
      currentIndex = index;
      updateCarousel();
    });
  }

  window.addEventListener('resize', updateCarousel);

  updateCarousel();

  const settingsToggle = document.getElementById('settings-toggle');
  const settingsSidebar = document.getElementById('settings-sidebar');
  const closeSettings = document.getElementById('close-settings');
  const fontOptions = document.querySelectorAll('.font-option');

  function openSidebar() {
    settingsSidebar.classList.remove('translate-x-full');
  }

  function closeSidebar() {
    settingsSidebar.classList.add('translate-x-full');
  }

  settingsToggle.addEventListener('click', openSidebar);
  closeSettings.addEventListener('click', closeSidebar);

  for (let i = 0; i < fontOptions.length; i++) {
    const option = fontOptions[i];
    option.addEventListener('click', function () {
      const selectedFont = option.getAttribute('data-font');

      for (let j = 0; j < fontOptions.length; j++) {
        fontOptions[j].classList.remove('active');
      }

      option.classList.add('active');

      document.body.classList.remove('font-tajawal', 'font-cairo', 'font-alexandria');
      document.body.classList.add('font-' + selectedFont);
    });
  }

  const themeColorsGrid = document.getElementById('theme-colors-grid');
  const defaultColor = '#6366f1';

  const themeColors = [
    '#38bdf8',
    '#14b8a6',
    '#6366f1',
    '#f59e0b',
    '#ec4899',
    '#10b981'
  ];

  for (let i = 0; i < themeColors.length; i++) {
    const color = themeColors[i];
    const colorButton = document.createElement('button');
    colorButton.setAttribute('type', 'button');
    colorButton.className = 'w-10 h-10 rounded-full hover:scale-110 transition-transform cursor-pointer';
    colorButton.style.backgroundColor = color;

    colorButton.addEventListener('click', function () {
      document.documentElement.style.setProperty('--primary', color);
    });

    themeColorsGrid.appendChild(colorButton);
  }

  const resetSettingsButton = document.getElementById('reset-settings');
  if (resetSettingsButton) {
    resetSettingsButton.addEventListener('click', function () {
      document.documentElement.style.setProperty('--primary', defaultColor);
    });
  }

  const customSelects = document.querySelectorAll('.custom-select');

  for (let i = 0; i < customSelects.length; i++) {
    const select = customSelects[i];
    const optionsList = select.nextElementSibling;
    const selectedText = select.querySelector('.selected-text');
    const options = optionsList.querySelectorAll('.custom-option');

    select.addEventListener('click', function () {
      const allOptionsLists = document.querySelectorAll('.custom-options');
      for (let j = 0; j < allOptionsLists.length; j++) {
        if (allOptionsLists[j] !== optionsList) {
          allOptionsLists[j].classList.add('hidden');
        }
      }

      optionsList.classList.toggle('hidden');
    });

    for (let k = 0; k < options.length; k++) {
      const option = options[k];
      option.addEventListener('click', function () {
        const value = option.getAttribute('data-value');
        selectedText.textContent = value;
        selectedText.classList.remove('text-slate-500', 'dark:text-slate-400');
        optionsList.classList.add('hidden');
      });
    }
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.custom-select-wrapper')) {
      const allOptionsLists = document.querySelectorAll('.custom-options');
      for (let i = 0; i < allOptionsLists.length; i++) {
        allOptionsLists[i].classList.add('hidden');
      }
    }
  });

});