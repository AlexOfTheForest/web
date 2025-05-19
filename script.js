// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close');
  
    if (mobileMenuButton && mobileMenu && mobileMenuOverlay) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenuOverlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
      });
      
      mobileMenuOverlay.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenuOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
      
      if (mobileMenuCloseButton) {
        mobileMenuCloseButton.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
          mobileMenuOverlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        });
      }
    }
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize scroll observer for animations
    initScrollObserver();
    
    // Initialize review carousel
    initReviewCarousel();
    
    // Initialize menu categories first
    initMenuCategories();

    // Initialize contact section after popular dishes
    // Assuming a function named initKontakt exists
    if (typeof initKontakt === 'function') {
      initKontakt();
    }
    
    // Add body background color to match sections and remove black space
    document.body.style.backgroundColor = '#1a1a1a';
});
  
// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    
    if (!target) return;
    
    const href = target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        history.pushState(null, '', href);
      }
    }
  });
}
  
// Scroll observer for animations and active nav items
function initScrollObserver() {
  // Function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.7 && rect.bottom >= 0;
  }
  
  // Function to mark active nav item
  function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      if (isElementInViewport(section)) {
        section.classList.add('visible');
        currentSection = section.getAttribute('id') || '';
      }
    });
    
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && href === `#${currentSection}`) {
        item.classList.add('nav-active');
      } else {
        item.classList.remove('nav-active');
      }
    });
  }
  
  // Initialize visible sections
  function initVisibleSections() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (isElementInViewport(section)) {
        section.classList.add('visible');
      }
    });
    
    // Always make home section visible
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.classList.add('visible');
    }
    
    setActiveNavItem();
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', setActiveNavItem);
  
  // Initialize
  initVisibleSections();
}
  
// Review carousel
function initReviewCarousel() {
  const reviews = [
    {
      name: "Michael S.",
      stars: 5,
      text: "Sehr leckere Pizza und Döner! Das Essen ist immer frisch und die Lieferung schnell. Einer der besten in Leer."
    },
    {
      name: "Laura K.",
      stars: 5,
      text: "Viele Leute erwähnen, dass sie hier guten Döner, gut zubereitete Pizza und schmackhafte döne Kebab bestellen können."
    },
    {
      name: "Thomas B.",
      stars: 5,
      text: "Meine Lieblingspizzeria in Leer! Die Pizza ist immer perfekt und der Service ist freundlich und schnell."
    },
    {
      name: "Sarah M.",
      stars: 4,
      text: "Gute Auswahl an Gerichten und faire Preise. Die Lieferung war pünktlich und das Essen noch heiß."
    },
    {
      name: "Jan H.",
      stars: 5,
      text: "Tolle türkische Spezialitäten und die besten Döner in der Umgebung. Sehr zu empfehlen!"
    }
  ];
  
  const carouselContainer = document.getElementById('reviewCarousel');
  
  if (!carouselContainer) return;
  
  // Clear existing content
  carouselContainer.innerHTML = '';
  
  // Create review slides
  reviews.forEach((review, index) => {
    const slide = document.createElement('div');
    slide.className = `review-slide ${index === 0 ? 'active' : ''}`;
    slide.setAttribute('data-index', index);
    
    const starsHtml = Array(5).fill().map((_, i) => 
      `<svg class="star-icon" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="${i < review.stars ? 'currentColor' : 'none'}" stroke="${i < review.stars ? 'none' : 'currentColor'}" /></svg>`
    ).join('');
    
    slide.innerHTML = `
      <div class="review-header">
        <div class="review-avatar">${review.name.charAt(0)}</div>
        <div>
          <div class="review-name">${review.name}</div>
          <div class="review-stars">${starsHtml}</div>
          <p class="review-text">${review.text}</p>
        </div>
      </div>
    `;
    
    carouselContainer.appendChild(slide);

    // Clear animation style after it finishes
    slide.addEventListener('animationend', () => {
      slide.style.animation = '';
    });
  });
  
  // Create dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'review-dots';
  
  reviews.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `review-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('data-index', index);
    dotsContainer.appendChild(dot);
  });
  
  carouselContainer.appendChild(dotsContainer);
  
  // Auto rotate reviews
  let currentIndex = 0;
  
  setInterval(() => {
    const slides = carouselContainer.querySelectorAll('.review-slide');
    const dots = carouselContainer.querySelectorAll('.review-dot');

    // Get current and next slides
    const currentSlide = slides[currentIndex];
    const nextIndex = (currentIndex + 1) % reviews.length;
    const nextSlide = slides[nextIndex];

    // Animate out current slide
    currentSlide.classList.remove('active');

    // Animate in next slide
    nextSlide.classList.add('active');

    // Update active dot
    dots[currentIndex].classList.remove('active');
    dots[nextIndex].classList.add('active');

    // Update current index
    currentIndex = nextIndex;

  }, 5000); // Slow switching interval
}
  
// Menu categories
function initMenuCategories() {
  const menuCategories = [
    {
      name: "KEBAB",
      description: "Verschiedene Kebab-Variationen",
      color: "bg-red-600",
      image: "images/kebab.png",
      items: [
        {
          name: "01. Kebabburger",
          description: "mit Hackfleisch vom Drehspieß, gemischter Salat und Tzatziki",
          price: "6,50 €",
        },
        {
          name: "02. Kebabburger XXL",
          description: "mit Hackfleisch vom Drehspieß, gemischter Salat und Tzatziki",
          price: "8,50 €",
        },
        { name: "03. Hähnchenburger", description: "mit Hähnchen, gemischter Salat und Tzatziki", price: "6,50 €" },
        { name: "04. Hähnchenburger XXL", description: "mit Hähnchen, gemischter Salat und Tzatziki", price: "8,50 €" },
        { name: "05. Sucukburger", description: "mit Sucuk, gemischter Salat und Tzatziki", price: "7,00 €" },
        { name: "06. Salatburger", description: "mit gemischtem Salat und Tzatziki oder Hirtenkäse", price: "6,00 €" },
        {
          name: "07. Dürüm Kebab",
          description: "mit Hackfleisch vom Drehspieß, gemischter Salat und Tzatziki",
          price: "8,00 €",
        },
        {
          name: "08. Dürüm Hähnchen",
          description: "mit Hähnchen vom Drehspieß, gemischter Salat und Tzatziki",
          price: "8,00 €",
        },
        { name: "09. Dürüm Vegetarisch", description: "mit gemischtem Salat, Hirtenkäse oder Tzatziki", price: "7,50 €" },
        {
          name: "10. Lahmacun Kebab",
          description: "mit Hackfleisch vom Drehspieß, gemischter Salat und Tzatziki",
          price: "8,00 €",
        },
        {
          name: "11. Lahmacun Hähnchen",
          description: "mit Hähnchen vom Drehspieß, gemischter Salat und Tzatziki",
          price: "8,00 €",
        },
        {
          name: "12. Lahmacun Vegetarisch",
          description: "mit gemischtem Salat, Hirtenkäse oder Tzatziki",
          price: "7,50 €",
        },
        {
          name: "13. Kebab oder Hähnchenbox",
          description:
            "mit Hackfleisch vom Drehspieß oder Hähnchen, Pommes Frites, Krautsalat, Zwiebeln, Gurken, Tomaten, Eisbergsalat, Tomatensauce und Tzatziki",
          price: "7,00 €",
          highlight: true,
        },
      ],
    },
    {
      name: "FRISCHE SALATE",
      description: "Mit Joghurt- oder Cocktailsauce Größen: klein, groß ",
      color: "bg-green-600",
      image: "images/frische-salate.png",
      items: [
        {
          name: "15. Hähnchen Salat",
          description: "mit Hähnchen, Hirtenkäse, Ei, gemischter Salat und Salatdressing",
          price: "7,00 € / 9,00 €",
        },
        {
          name: "16. Kebab Salat",
          description: "mit Hackfleisch vom Drehspieß, Ei, gemischter Salat und Salatdressing",
          price: "7,00 € / 9,00 €",
        },
        {
          name: "17. Thunfisch Salat",
          description: "mit Thunfisch, Ei, gemischter Salat und Salatdressing",
          price: "6,50 € / 8,00 €",
        },
        {
          name: "18. Avanti Salat",
          description: "mit Putenschinken, Ei, Oliven, Peperoni (mild), Hirtenkäse, gemischter Salat, und Salatdressing",
          price: "7,50 € / 9,50 €",
        },
        {
          name: "19. Hirtensalat",
          description: "mit Hirtenkäse, Ei, Oliven, gemischter Salat und Salatdressing",
          price: "6,50 € / 8,50 €",
        },
        {
          name: "20. Gemischter Salat",
          description: "mit Hirtenkäse, gemischter Salat und Salatdressing",
          price: "6,00 € / 7,00 €",
        },
        {
          name: "21. Mozzarella Salat",
          description: "mit gemischtem Salat, Mozzarella, Oliven, Ei und Salatdressing",
          price: "7,00 € / 8,50 €",
        },
        {
          name: "22. Salat Hawaii",
          description: "mit gemischtem Salat, Putenschinken, Ananas, Gurken, Tomaten, Zwiebeln, Ei und Salatdressing",
          price: "7,00 € / 8,50 €",
        },
      ],
    },
    {
      name: "TELLERGERICHTE",
      description: "Verschiedene Tellergerichte mit Beilagen",
      color: "bg-white",
      image: "images/plattengerichte.png",
      items: [
        {
          name: "24. Kebab Teller",
          description: "mit Hackfleisch vom Drehspieß, Pommes Frites, gemischter Salat und Tzatziki",
          price: "10,00 €",
        },
        {
          name: "25. Hähnchen Teller",
          description: "mit Hähnchen vom Drehspieß, Pommes Frites, gemischter Salat und Tzatziki",
          price: "10,00 €",
        },
        {
          name: "26. Avanti Teller",
          description: "mit Hackfleisch vom Drehspieß, Hähnchen, Sucuk, 1 Fladenbrot, gemischter Salat und Tzatziki",
          price: "12,00 €",
        },
        {
          name: "27. Sucuk Teller",
          description: "mit Sucuk, 1 Fladenbrot, gemischter Salat und Tzatziki",
          price: "10,00 €",
        },
      ],
    },
    {
      name: "PIZZA",
      description: "Verschiedene Pizzen in drei Größen: klein (22 cm), groß (28 cm), XXL (40 cm)",
      color: "bg-red-600",
      image: "images/pizza.png",
      items: [
        {
          name: "28. Pizza Salami Funghi",
          description: "mit Tomatensauce, Käse, Salami, frischen Champignons und Oregano",
          price: "6,50 € / 9,00 € / 19,00 €",
          new: true,
        },
        {
          name: "29. Pizza Schinken Funghi",
          description: "mit Tomatensauce, Käse, Schinken, frischen Champignons und Oregano",
          price: "6,50 € / 9,00 € / 19,00 €",
          new: true,
        },
        {
          name: "30. Pizza Margherita",
          description: "mit Tomatensauce, Käse und Oregano",
          price: "5,00 € / 7,00 € / 15,00 €",
        },
        {
          name: "31. Pizza Salami",
          description: "mit Tomatensauce, Käse, Salami und Oregano",
          price: "6,00 € / 8,00 € / 17,50 €",
        },
        {
          name: "32. Pizza Schinken",
          description: "mit Tomatensauce, Käse, Putenschinken und Oregano",
          price: "6,00 € / 8,00 € / 17,50 €",
        },
        {
          name: "33. Pizza Thunfisch",
          description: "mit Tomatensauce, Käse, Thunfisch und Oregano",
          price: "6,00 € / 8,00 € / 17,50 €",
        },
        {
          name: "34. Pizza Tonno Cippola",
          description: "mit Tomatensauce, Käse, Thunfisch, Zwiebeln und Oregano",
          price: "6,50 € / 8,50 € / 18,50 €",
        },
        {
          name: "35. Pizza Döner/Hähnchen-Mix",
          description: "mit Tomatensauce, Käse, Hackfleisch vom Drehspieß, Hähnchen, Zwiebeln und Oregano",
          price: "6,50 € / 9,50 € / 21,50 €",
        },
        {
          name: "36. Pizza Funghi",
          description: "mit Tomatensauce, Käse, frischen Champignons und Oregano",
          price: "6,00 € / 8,00 € / 17,00 €",
        },
        {
          name: "37. Pizza Paprika",
          description: "mit Tomatensauce, Käse, Paprika und Oregano",
          price: "5,50 € / 7,50 € / 17,00 €",
        },
        {
          name: "38. Pizza Miran",
          description: "mit Tomatensauce, Käse, Zwiebeln, Thunfisch, Salami, Putenschinken und Oregano",
          price: "7,00 € / 9,50 € / 20,00 €",
        },
        {
          name: "39. Pizza Vegetaria",
          description:
            "mit Tomatensauce, Käse, Paprika, frischen Champignons, Zwiebeln, Hirtenkäse, Peperoni (mild), Oliven, Artischocken und Oregano",
          price: "6,50 € / 9,50 € / 20,00 €",
        },
        {
          name: "40. Pizza Hawaii",
          description: "mit Tomatensauce, Käse, Putenschinken, Ananas und Oregano",
          price: "6,00 € / 8,50 € / 18,50 €",
        },
        {
          name: "41. Pizza Sucuk",
          description: "mit Tomatensauce, Käse, Zwiebeln, Sucuk und Oregano",
          price: "6,00 € / 9,50 € / 22,00 €",
        },
        {
          name: "42. Pizza Mizgin",
          description: "mit Tomatensauce, Pizzakäse, Chester, Mozzarella, Hirtenkäse und Oregano",
          price: "6,50 € / 9,50 € / 21,00 €",
        },
        {
          name: "43. Pizza Manhattan",
          description: "mit Tomatensauce, Käse, Hackfleisch vom Drehspieß, Sauce Hollandaise, Chesterkäse und Oregano",
          price: "7,00 € / 9,50 € / 22,00 €",
        },
        {
          name: "44. Pizza Quatro Stangioni",
          description:
            "mit Tomatensauce, Käse, Salami, Artischocken, Putenschinken, Zwiebeln, frischen Champignons und Oregano",
          price: "7,00 € / 9,50 € / 22,00 €",
        },
        {
          name: "45. Pizza Roma",
          description: "mit Tomatensauce, Käse, Putenschinken, Salami, Frischen Champignons und Oregano",
          price: "6,50 € / 9,50 € / 20,00 €",
        },
        {
          name: "46. Pizza Salami Prosciutto",
          description: "mit Tomatensauce, Käse, Salami, Putenschinken und Oregano",
          price: "6,00 € / 9,00 € / 19,50 €",
        },
        {
          name: "47. Pizza Mais",
          description: "mit Tomatensauce, Käse,Mais und Oregano",
          price: "5,00 € / 7,50 € / 17,00 €",
        },
        {
          name: "48. Pizza 63 Ahmed",
          description: "mit Tomatensauce, Käse, Oliven, Peperoni (mild), Hirtenkäse, Salami, Zwiebeln und Oregano",
          price: "7,00 € / 10,00 € / 22,00 €",
        },
        {
          name: "49. Pizza Mozzarella",
          description: "mit Tomatensauce, Käse, Mozzarella, frischen Tomaten und Oregano",
          price: "6,00 € / 8,50 € / 18,50 €",
        },
        {
          name: "50. Pizza Kebab",
          description: "mit Tomatensauce, Käse, Hackfleisch vom Drehspieß, Zwiebeln und Oregano",
          price: "6,00 € / 9,00 € / 19,50 €",
        },
        {
          name: "51. Pizza Kebab Hollandaise",
          description: "mit Tomatensauce, Käse, Hackfleisch Drehspieß, Zwiebeln, Sauce Hollandaise und Oregano",
          price: "6,50 € / 9,50 € / 22,00 €",
        },
        {
          name: "52. Pizza Hänchen",
          description: "mit Tomatensauce, Käse, Hänchen, Zwiebeln und Oregano",
          price: "6,00 € / 9,00 € / 19,50 €",
        },
        {
          name: "53. Pizza Hänchen Hollandaise",
          description: "mit Tomatensauce, Käse, Hänchen, Zwiebeln, Sauce Hollandaise und Oregano",
          price: "6,50 € / 9,50 € / 22,00 €",
        },
        {
          name: "54. Pizza Leer",
          description: "mit Tomatensauce, Käse, Hackfleisch Drehspieß, Eisbergsalat, Salatsauce und Oregano",
          price: "6,50 € / 10,00 € / 22,00 €",
        },
        {
          name: "55. Pizza Krabben",
          description: "mit Tomatensauce, Käse, Krabben, Knoblauch und Oregano",
          price: "7,00 € / 9,50 € / 22,00 €",
        },
        {
          name: "56. Pizza Spinat",
          description: "mit Tomatensauce, Käse, Blattspinat, Ei, Knoblauch und Oregano",
          price: "7,00 € / 10,00 € / 22,00 €",
        },
        {
          name: "57. Pizza Dilo",
          description: "mit Tomatensauce, Käse, Krabben, Thunfisch, Peperoni(mild) und Oregano",
          price: "7,00 € / 10,00 € / 22,00 €",
        },
        {
          name: "58. Pizza Kadiro",
          description:
            "mit Tomatensauce, Käse, Salami, Putenschinken, Hackfleisch Drehspieß, Sucuk, Hähnchenfleisch, Sauce Hollandaise, mit KäseÜberbacken ",
          price: "8,00 € / 12,00 € / 25,00 €",
        },
        {
          name: "59. Pizza Vanessa",
          description: "mit Tomatensauce, Käse, Salami, Peperoni, Mais, Hirtenkäse, Sauce Hollandaise, Zwiebeln, Paprika",
          price: "7,50 € / 11,00 € / 24,00 €",
        },
        {
          name: "60. Pizza Loga",
          description: "mit Tomatensauce, Käse, Salami, Putenschinken, Champignons, Ei, Mais und Sauce Hollandaise",
          price: "7,00 € / 10,00 € / 22,00 €",
        },
        {
          name: "61. Pizza Dilan",
          description: "mit Tomatensauce, Käse, Peperoni, Paprika, Champignons, Zwiebel, Mais, Hirtenkäse, Sauce Hollandaise, Brokkoli",
          price: "7,50 € / 11,00 € / 24,00 €",
        },
        {
          name: "62. Pizza LA Urfa",
          description:
            "mit Tomatensauce, Käse, Salami, Putenschinken, Hackfleisch Drehspieß, Sucuk, Hähnschenfleisch, Zwiebeln, Mais, Sauce Hollandaise, mit KäseÜberbacken",
          price: "7,50 € / 12,00 € / 25,00 €",
        },
        {
          name: "63. Pizza Jheringsfehn",
          description: "mit Tomatensauce, Käse, Mais, Sucuk, Hähnschenfleisch, Paprika, Zwiebeln, und Sauce Hollandaise",
          price: "7,00 € / 10,50 € / 23,00 €",
        },
        {
          name: "64. Pizza Thore",
          description:
            "mit Tomatensauce, Käse, Hähnschenfleisch, Hackfleisch Drehspieß, Broccoli, Hirtenkäse, Paprika, Zwiebeln, Sauce Hollandaise",
          price: "7,50 € / 11,00 € / 25,00 €",
        },
        {
          name: "65. Pizza Nelly",
          description:
            "mit Tomatensauce, Käse, Salami, Putenschinken, Sucuk, Hirtenkäse, Paprika, Zwiebeln, Sauce Hollandaise",
          price: "7,50 € / 12,50 € / 26,00 €",
        },
        {
          name: "66. Pizza Kuce",
          description: "mit Tomatensauce, Käse, Thunfisch, Sucuk, Broccoli, Paprika, Mais, Sauce Hollandaise",
          price: "7,50 € / 11,00 € / 23,00 €",
        },
        {
          name: "67. Pizza Ayse",
          description: "mit Tomatensauce, Käse, frische Oliven, Hirtenkäse, und Joghurtsauce",
          price: "7,00 € / 10,00 € / 20,00 €",
        },
        {
          name: "68. Pizza Daniel",
          description: "mit Hackfleisch Drehspieß, Sucuk, Pilzen, und Sauce Hollandaise",
          price: "7,00 € / 10,50 € / 23,00 €",
        },
      ],
    },
    {
      name: "PIZZA SPECIAL",
      description: "Spezielle Pizzakreationen in drei Größen: klein (22 cm), groß (28 cm), XXL (40 cm)",
      color: "bg-red-600",
      image: "images/pizzaspecial.png",
      items: [
        {
          name: "69. Pizza Zagroz Spezial",
          description:
            "mit Tomatensauce, Käse, Salami, Putenschinken, Zwiebeln, frischen Champignons, Artischocken, Paprika, Thunfisch, Ananas und Oregano",
          price: "7,50 € / 12,00 € / 26,00 €",
        },
        {
          name: "70. Pizza Avanti Spezial",
          description:
            "mit Tomatensauce, Käse, Hackfleisch vom Drehspieß, Sucuk, Hähnschen, Peperoni (mild), Chesterkäse, Sauce Hollandaise und Oregano, scharf",
          price: "8,00 € / 11,50 € / 25,00 €",
        },
        {
          name: "71. Pizza Neslihan",
          description:
            "mit Tomatensauce, Käse, Blattspinat, Puttenschinken, Knoblauch, Mais, frischen Champignons, Artischocken, Oliven und Oregano",
          price: "8,00 € / 11,50 € / 25,00 €",
        },
        {
          name: "72. Pizza Urfa",
          description:
            "mit Tomatensauce, Käse, Sucuk, frischen Champignons, Zwiebeln, Peperoni (mild), Paprika und Oregano",
          price: "7,50 € / 10,50 € / 22,00 €",
        },
        {
          name: "73. Pizza Mira",
          description:
            "mit Tomatensauce, Käse, Hähnchen, Zwiebeln, frischen Champignons, Paprika, Broccoli, Peperoni (mild), Sauce Hollandaise und Oregano",
          price: "7,00 € / 11,00 € / 24,00 €",
        },
      ],
    },
    {
      name: "PIZZA CALZONE (GESCHLOSSEN)",
      description: "Gefüllte Pizzataschen mit verschiedenen Füllungen",
      color: "bg-white",
      image: "images/calzone.png",
      items: [
        {
          name: "95. Pizza Calzone Kebab",
          description: "mit Tomatensauce, Käse, Hackfleisch vom Drehspieß, Zwiebeln und Oregano, Krautsalat und Tzatziki",
          price: "9,50 €",
        },
        {
          name: "96. Pizza Calzone Hähnchen",
          description: "mit Tomatensauce, Käse Hähnchen, Zwiebeln und Oregano, Krautsalat und Tzatziki",
          price: "9,50 €",
        },
        {
          name: "97. Pizza Calzone Avanti",
          description:
            "mit Tomatensauce, Käse, Hackfleisch vom Drehspieß, Hähnchen, Zwiebeln, Sauce Hollandaise, Chesterkäse und Oregano",
          price: "10,00 €",
        },
        {
          name: "98. Pizza Calzone Loga",
          description: "mit Tomatensauce, Käse, Blattspinat, Putenschinken, Knoblauch, Mais, frischen Champignons und Oregano",
          price: "10,00 €",
        },
        {
          name: "99. Hawaii Calzone",
          description: "mit Tomatensauce, Käse, Putenschinken, Ananas",
          price: "9,50 €",
        },
        {
          name: "100. Bomba Calzone (scharf)",
          description: "mit Tomatensauce, Käse, Salami, Peperoni, scharf",
          price: "9,50 €",
        },
      ],
    },
    {
      name: "ROLLO",
      description: "Frisch zubereitete Rollos mit verschiedenen Füllungen",
      color: "bg-green-600",
      image: "images/rollo.png",
      items: [
        {
          name: "85. Kebab Rollo",
          description: "mit Hackfleisch vom Drehspieß, Käse, Krautsalat, Gurken, Tomaten, Zwiebeln, Tzatziki und Tomatensauce",
          price: "9,50 €",
        },
        {
          name: "86. Kebab Rollo Manhatten",
          description:
            "mit Hackfleisch vom Drehspieß, Käse, Hollandaise, Chesterkäse, Tomatensauce",
          price: "10,00 €",
        },
        {
          name: "87. Hähnchen Rollo",
          description: "mit Hähnchen, Käse, Krautsalat, Gurken, Tomaten, Zwiebeln, Tzatziki und Tomatensauce",
          price: "9,50 €",
        },
        {
          name: "88. Hähnchen Rollo Manhatten",
          description:
            "mit Hähnchen, Käse, Hollandaise, Chesterkäse und Tomatensauce",
          price: "10,00 €",
        },
        {
          name: "89. Rollo Vegetarisch",
          description: "mit Krautsalat, Gurken, Tomaten, Zwiebeln, Eisbergsalat, Hirtenkäse und Tomatensauce",
          price: "9,50 €",
        },
        {
          name: "90. Rollo Avanti Spezial",
          description:
            "mit Hackfleisch vom Drehspieß, Hähnchen, Käse, Krautsalat, Zwiebeln, Hirtenkäse, Peperoni (mild) und Tomatensauce",
          price: "10,50 €",
        },
        {
          name: "91. Rollo Loga",
          description: "mit Käse, Blattspinat, Putenschinken, Knoblauch, frischen Champignons und Tomatensauce",
          price: "9,50 €",
        },
        { name: "92. Hawaii-Rollo", description: "mit Tomatensauce, Käse, Putenschinken und Ananas", price: "9,50 €" },
      ],
    },
    {
      name: "AUFLÄUFE",
      description: "Überbackene Gerichte aus dem Ofen",
      color: "bg-red-600",
      image: "images/aufläufe.png",
      items: [
        {
          name: "105. Kebab überbacken",
          description: "mit Hackfleisch vom Drehspieß, Sahne sauce, KäseÜberbacken und 1 Fladenbrot",
          price: "9,00 €",
        },
        {
          name: "106. Kebab überbacken Spezial",
          description:
            "mit Hackfleisch vom Drehspieß, Zwiebeln, Sahne sauce, frischen Champignons, Paprika, Sauce Hollandaise, KäseÜberbacken und 1 Fladenbrot",
          price: "10,00 €",
        },
        {
          name: "107. Hähnchen überbacken",
          description: "mit Hähnchen , Sahne sauce, KäseÜberbacken und 1 Fladenbrot",
          price: "9,00 €",
        },
        {
          name: "108. Hähnchen überbacken Spezial",
          description:
            " mit Hähnchen, Zwiebeln, Sahne sauce, frische Champignons, Paprika, Sauce Hollandaise, KäseÜberbacken und 1 Fladenbrot",
          price: "10,00 €",
        },
      ],
    },
    {
      name: "BEILAGEN",
      description: "Verschiedene Beilagen und Extras",
      color: "bg-white",
      image: "images/beilagen.png",
      items: [
        { name: "110. Portion Pommes", description: "", price: "3,50 €" },
        { name: "111. Portion Hirtenkäse", description: "", price: "4,00 €" },
        { name: "112. Portion Kraut", description: "", price: "4,00 €" },
        { name: "113. Portion Peperoni (mild)", description: "", price: "4,00 €" },
        { name: "114. Portion Oliven", description: "", price: "4,00 €" },
        { name: "115. Portion Tzatziki", description: "klein: 2,00 € / groß: 3,50 €", price: "2,00 € / 3,50 €" },
        { name: "116. Portion Salatdressing Joghurt/Cocktail", description: "klein: 2,00 € / groß: 3,50 €", price: "2,00 € / 3,50 €" },
        { name: "117. Fladenbrot", description: "", price: "2,00 €" },
        { name: "118. Pizzabrötchen", description: "", price: "4,50 €" },
      ],
    },
    {
      name: "IMBISSGERICHTE",
      description: "Schnelle Gerichte für zwischendurch",
      color: "bg-green-600",
      image: "images/imbissgerichte.png",
      items: [
        { name: "122. Chickenburger", description: "Hähnschenschnitzel", price: "6,50 €" },
        { name: "123. Chicken-Cheeseburger", description: "Hähnschenschnitzel mit 2 Käsescheiben", price: "7,50 €" },
        { name: "124. Doppeldecker-Chickenburger", description: "mit 2 Hähnschenschnitzel", price: "10,00 €" },
      ],
    },
    {
      name: "SCHNITZEL",
      description: "Verschiedene Schnitzel-Variationen mit Beilagen",
      color: "bg-red-600",
      image: "images/schnitzel.png",
      items: [
        {
          name: "135. Hähnchenschnitzel, paniert",
          description: "2 Schnitzel mit Kräuterbutter und Pommes und Salat",
          price: "12,50 €",
        },
        { name: "136. Jägerschnitzel", description: "2 Schnitzel mit Pommes und Salat", price: "14,50 €" },
        { name: "137. Champignon-Rahm-Schnitzel", description: "2 Schnitzel mit Pommes und Salat", price: "14,50 €" },
        {
          name: "138. Avanti-Schnitzel",
          description: "2 Schnitzel mit Pommes, Broccoli, Paprika und Sahnesauce und Salat",
          price: "15,00 €",
        },
        {
          name: "139. Zwiebel-Schnitzel",
          description: "2 Schnitzel mit Pommes, Broccoli, Paprika, Zwiebeln, Sahne und Salat",
          price: "15,00 €",
        },
      ],
    },
    {
      name: "NUDELGERICHTE",
      description: "Verschiedene Pasta-Gerichte mit Rigatoni mit Käse überbacken = 1,00€ Aufpreis",
      color: "bg-white",
      image: "images/nudelgerichte.png",
      items: [
        { name: "140. Rigatoni Napoli", description: "mit Tomatensauce", price: "9,00 €" },
        { name: "141. Rigatoni Carbonara", description: "mit Putenschinken, Sahnesauce und Rührei)", price: "10,00 €" },
        { name: "142. Rigatoni Broccoli", description: "mit Sahne, Broccoli und Zwiebeln", price: "10,00 €" },
        { name: "143. Rigatoni Tonno", description: "mit Sahnesauce und Thunfisch", price: "10,00 €" },
        { name: "144. Rigatoni Sahneschinken", description: "mit Sahne und Putenschinken", price: "10,00 €" },
        {
          name: "145. Rigatoni Lena",
          description: "mit Hack- oder Hähnchenfleisch vom Drehspieß, Paprika und Zwiebeln, Sahne",
          price: "11,00 €",
        },
        { name: "146. Rigatoni Riviera", description: "mit Sahne, Krabben, Thunfisch und Knoblauch", price: "11,00 €" },
      ],
    },
    {
      name: "PLATTENGERICHTE",
      description: "Große Platten für mehrere Personen",
      color: "bg-green-600",
      image: "images/plattengerichte.png",
      items: [
        {
          name: "Avanti Platte",
          description:
            "mit Hackfleisch vom Drehspieß, Pommes Frites, Hähnchen, Sucuk, Krautsalat, Tomaten, Gurke, Zwiebeln, Eisbergsalat, Tzatziki, Tomatensoße und frischem Brot",
          price: "2 Personen: 40 € / 4 Personen: 60 €",
        },
      ],
    },
    {
      name: "GETRÄNKE",
      description: "Erfrischende Getränke",
      color: "bg-white",
      image: "images/getränke.png",
      items: [
        { name: "125. Coca Cola / Fanta / Sprite", description: "(0,33 ltr.)", price: "2,50 €" },
        { name: "126. Coca Cola / Fanta / Sprite", description: "(1 ltr.)", price: "4,00 €" },
        { name: "127. Vita-Malz", description: "(0,33 ltr.)", price: "3,00 €" },
        { name: "128. Wasser", description: "(0,33 ltr.)", price: "2,00 €" },
        { name: "129. Ayran", description: "", price: "2,00 €" },
      ],
    },
    {
      name: "BAGUETTES",
      description: "Frisch belegte Baguettes mit verschiedenen Füllungen",
      color: "bg-red-600",
      image: "images/baguettes.png",
      items: [
        {
          name: "75. Kebab Baguette",
          description: "mit Hackfleisch vom Drehspieß, Remoulade, Gurken und Eisbergsalat ",
          price: "8,00 €",
        },
        { name: "76. Hähnchen Baguette", description: "mit Hähnchen, Remoulade, Gurken und Eisbergsalat", price: "8,00 €" },
        {
          name: "77. Thunfisch Baguette",
          description: "mit Thunfisch, Remoulade, Gurken und Eisbergsalat",
          price: "8,00 €",
        },
        {
          name: "78. Salami Schinken Baguette",
          description: "mit Salami, Putenschinken, Remoulade, Gurken und Eisbergsalat",
          price: "8,50 €",
        },
        {
          name: "79. Avanti Special Baguette",
          description: "mit Hackfleisch vom Drehspieß, Hähnchen, Sauce Hollandaise, Chesterkäse, Remoulade,Gurken und Eisbergsalat",
          price: "8,50 €",
        },
        {
          name: "80. Salami Baguette",
          description: "mit Salami, Käse, EisbergSalat, Gurken und Remoulade",
          price: "8,00 €",
        },
        {
          name: "81. Hirtenkäse Baguette",
          description: "mit Hirtenkäse, Käse, Gurken, Eisbergsalat, Peperoni und Remoulade",
          price: "8,50 €",
        },
        {
          name: "82. Moritz Baguette",
          description: "mit Sucuk, Eisbergsalat und Remoulade",
          price: "8,50 €",
        },
      ],
    },
  ];
  
  const menuCategoriesContainer = document.getElementById('menuCategories');
  
  if (!menuCategoriesContainer) return;
  
  // Create menu categories
  menuCategories.forEach((category, index) => {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'menu-category';
    
    // Create category background
    const bgHtml = `
      <div class="category-bg">
        <div class="category-bg-overlay"></div>
        <img src="${category.image || 'placeholder.svg'}" alt="${category.name}" class="category-bg-image">
      </div>
    `;
    
    // Create category content
    const contentHtml = `
      <div class="category-content">
        <div class="category-header">
          <div class="category-line ${category.color === 'bg-red-600' ? 'bg-red-600' : category.color === 'bg-green-600' ? 'bg-green-600' : 'bg-white'}"></div>
          <h3 class="category-title">${category.name}</h3>
        </div>
        <p class="category-description">${category.description}</p>
        
        <div class="category-items" id="category-items-${index}">
          ${category.items.map(item => `
            <div class="menu-item ${item.highlight ? 'highlight' : ''}">
              <div class="item-header">
                <div class="item-name">
                  ${item.name}
                  ${item.new ? '<span class="item-new">NEU</span>' : ''}
                </div>
                <div class="item-price">${item.price}</div>
              </div>
              <div class="item-description">${item.description}</div>
            </div>
          `).join('')}
        </div>
        
        <button class="category-toggle" data-category="${index}" aria-expanded="false">
          <span class="toggle-text">Mehr anzeigen</span>
          <span class="toggle-icon chevron-right-small"></span>
        </button>
      </div>
    `;
    
    categoryElement.innerHTML = bgHtml + contentHtml;
    menuCategoriesContainer.appendChild(categoryElement);
  });
  
  // Add event listeners to toggle buttons
  const toggleButtons = document.querySelectorAll('.category-toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const categoryId = this.getAttribute('data-category');
      const categoryItems = document.getElementById(`category-items-${categoryId}`);
      
      if (categoryItems) {
        categoryItems.classList.toggle('visible');
        
        // Update toggle text
        const toggleText = this.querySelector('.toggle-text');
        if (toggleText) {
          if (categoryItems.classList.contains('visible')) {
            toggleText.textContent = 'Weniger anzeigen';
            this.setAttribute('aria-expanded', 'true');
          } else {
            toggleText.textContent = 'Mehr anzeigen';
            this.setAttribute('aria-expanded', 'false');
          }
        }
        
        // Update toggle icon
        const toggleIcon = this.querySelector('.toggle-icon');
        if (toggleIcon) {
          toggleIcon.classList.toggle('rotate-180');
        }
      }
    });
  });
}
  
// Add CSS class for rotation animation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .rotate-180 {
      transform: rotate(180deg);
    }
    
    .hidden {
      display: none !important;
    }
    
    .overflow-hidden {
      overflow: hidden;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    /* Popular dishes section styles */
    .beliebte-gerichte-section {
      padding: 2rem 0; /* Vertical padding only */
      background-color: #1a1a1a;
      color: #fff;
      margin: 2rem 0 0 0;
      width: 100vw; /* Set width to 100% of viewport width */
      position: relative; /* Needed for left/right to work relative to container, or could use absolute */
      left: 50%; /* Center the element */
      right: 50%; /* Center the element */
      margin-left: -50vw; /* Pull left by half the viewport width */
      margin-right: -50vw; /* Pull right by half the viewport width */
      box-sizing: border-box;
    }
    
    .section-header {
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .section-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .section-description {
      font-size: 1.1rem;
      opacity: 0.8;
    }
    
    .popular-dishes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem; /* Keep horizontal padding for content */
    }
    
    @media (max-width: 768px) {
      .popular-dishes-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 480px) {
      .popular-dishes-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .popular-dish-card {
      background-color: #2a2a2a;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease;
      position: relative;
    }
    
    .popular-dish-card:hover {
      transform: translateY(-5px);
    }
    
    .green-border::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: #38a169;
    }
    
    .white-border::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: #ffffff;
    }
    
    .red-border::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: #e53e3e;
    }
    
    .dish-image-container {
      position: relative;
      height: 200px;
      overflow: hidden;
    }
    
    .dish-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .dish-number {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      color: white;
      padding: 1rem;
      font-weight: bold;
      font-size: 1.2rem;
    }
    
    .dish-content {
      padding: 1rem;
    }
    
    .dish-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    
    .dish-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0;
    }
    
    .dish-price {
      color: #e53e3e;
      font-weight: bold;
      white-space: nowrap;
    }
    
    .dish-description {
      font-size: 0.9rem;
      opacity: 0.8;
      margin: 0;
    }
    
    /* Review carousel styles */
    .review-slide {
      display: none;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .review-slide.active {
      display: block;
      opacity: 1;
    }
    
    /* Menu category styles */
    .category-items {
      max-height: 300px;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    
    .category-items.visible {
      max-height: 5000px;
      transition: max-height 0.8s ease-in;
    }
  </style>
`);