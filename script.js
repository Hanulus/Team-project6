// ========================================
// GOD LOVES THE TRINITY - RESTAURANT WEBSITE
// Assignment 6: Advanced JavaScript and DOM Manipulation
// Team: Newcomers (Chingiz, Sultan, Kaisar)
// Group: SE-2405
// ========================================

// ========================================
// CHINGIZ - HOME & MENU PAGES
// ========================================

// ===== DOM MANIPULATION: Greeting with User Input =====
// Location: Home page
function initGreeting() {
  const greetingContainer = document.querySelector('.bg-color-section');
  if (!greetingContainer || !window.location.pathname.includes('index.html') && window.location.pathname !== '/') return;
  
  // Create greeting elements
  const greetingDiv = document.createElement('div');
  greetingDiv.innerHTML = `
    <div style="margin-top: 30px; padding: 20px; background: #fff; border-radius: 8px;">
      <h3 id="greeting-text" style="color: #8B4513; margin-bottom: 15px;">Welcome to Divine Dining!</h3>
      <div style="display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap;">
        <input type="text" id="user-name-input" placeholder="Enter your name" 
               style="padding: 10px; border: 2px solid #DEB887; border-radius: 5px; min-width: 200px;">
        <button id="greeting-submit-btn" class="button-style">Personalize Greeting</button>
      </div>
    </div>
  `;
  greetingContainer.appendChild(greetingDiv);
  
  // Event listener for greeting
  const submitBtn = document.getElementById('greeting-submit-btn');
  const nameInput = document.getElementById('user-name-input');
  const greetingText = document.getElementById('greeting-text');
  
  submitBtn.addEventListener('click', function() {
    const userName = nameInput.value.trim();
    if (userName) {
      greetingText.textContent = `Welcome to Divine Dining, ${userName}! May your meal be blessed.`;
      greetingText.style.color = '#654321';
      playSound('success');
    } else {
      greetingText.textContent = 'Please enter your name to personalize your greeting!';
      greetingText.style.color = '#d32f2f';
    }
  });
  
  // Enter key support
  nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      submitBtn.click();
    }
  });
}

// ===== DYNAMIC STYLE CHANGES: Background Color Changer =====
// Location: Home page
function changeBackgroundColor() {
  const colors = [
    '#f5f5f0', // original beige
    '#e8f4f8', // light blue
    '#fff5e6', // light orange
    '#f0e6ff', // light purple
    '#e6ffe6', // light green
    '#ffe6f0', // light pink
    '#fff9e6'  // light yellow
  ];
  
  const currentColor = document.body.style.backgroundColor || 'rgb(245, 245, 240)';
  let newColor;
  
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === currentColor);
  
  document.body.style.backgroundColor = newColor;
  document.body.style.transition = 'background-color 0.5s ease';
  
  // Play sound on color change
  playSound('click');
}

const bgButton = document.getElementById('bg-color-btn');
if (bgButton) {
  bgButton.addEventListener('click', changeBackgroundColor);
}

// ===== EVENT HANDLING: Current Time Display Button =====
// Location: All pages (footer always visible)
function displayCurrentTime() {
  const timeButton = document.createElement('button');
  timeButton.textContent = 'Show Current Time';
  timeButton.className = 'button-style';
  timeButton.style.marginTop = '10px';
  
  const timeDisplay = document.createElement('div');
  timeDisplay.id = 'time-display-result';
  timeDisplay.style.marginTop = '10px';
  timeDisplay.style.fontSize = '1.1rem';
  timeDisplay.style.color = '#FFE4B5';
  timeDisplay.style.fontWeight = 'bold';
  
  const footer = document.querySelector('footer');
  if (footer) {
    const dateTimeP = footer.querySelector('.datetime-display');
    if (dateTimeP) {
      dateTimeP.appendChild(timeButton);
      dateTimeP.appendChild(timeDisplay);
    }
  }
  
  timeButton.addEventListener('click', function() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    timeDisplay.textContent = `Current Time: ${currentTime}`;
    timeDisplay.style.display = 'block';
    playSound('click');
  });
}

// ===== KEYBOARD EVENT HANDLING: Navigation Menu =====
// Location: All pages
function initKeyboardNavigation() {
  const menuLinks = document.querySelectorAll('.navigation a');
  let currentIndex = -1;
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % menuLinks.length;
      menuLinks[currentIndex].focus();
      menuLinks[currentIndex].style.outline = '2px solid #8B4513';
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      currentIndex = (currentIndex - 1 + menuLinks.length) % menuLinks.length;
      menuLinks[currentIndex].focus();
      menuLinks[currentIndex].style.outline = '2px solid #8B4513';
    } else if (event.key === 'Enter' && currentIndex >= 0) {
      menuLinks[currentIndex].click();
    }
  });
  
  // Remove outline on blur
  menuLinks.forEach(link => {
    link.addEventListener('blur', function() {
      this.style.outline = '';
    });
  });
}

// ===== SWITCH STATEMENT: Time-based Greeting =====
// Location: All pages (footer)
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  let greeting;
  let icon;
  
  switch(true) {
    case (hour >= 5 && hour < 12):
      greeting = 'Good Morning';
      icon = '☀️';
      break;
    case (hour >= 12 && hour < 17):
      greeting = 'Good Afternoon';
      icon = '🌤️';
      break;
    case (hour >= 17 && hour < 22):
      greeting = 'Good Evening';
      icon = '🌆';
      break;
    default:
      greeting = 'Good Night';
      icon = '🌙';
  }
  
  return { greeting, icon };
}

function displayTimeGreeting() {
  const footer = document.querySelector('footer');
  if (footer) {
    const { greeting, icon } = getTimeBasedGreeting();
    const greetingP = document.createElement('p');
    greetingP.style.color = '#FFE4B5';
    greetingP.style.fontSize = '1.1rem';
    greetingP.style.marginTop = '10px';
    greetingP.textContent = `${icon} ${greeting}! Welcome to God loves the Trinity`;
    footer.insertBefore(greetingP, footer.firstChild);
  }
}

// ===== OBJECTS AND METHODS: Menu Items Management =====
// Location: Menu page
const menuDatabase = [
  {
    id: 1,
    name: 'Sacred Bruschetta',
    price: 8.99,
    category: 'Appetizers',
    description: 'Fresh tomatoes, basil, and mozzarella on toasted bread',
    vegetarian: true,
    displayInfo: function() {
      return `${this.name} - $${this.price.toFixed(2)}`;
    },
    getFormattedPrice: function() {
      return `$${this.price.toFixed(2)}`;
    }
  },
  {
    id: 2,
    name: 'Holy Hummus Platter',
    price: 7.50,
    category: 'Appetizers',
    description: 'Creamy hummus with olive oil, served with warm pita bread',
    vegetarian: true,
    displayInfo: function() {
      return `${this.name} - $${this.price.toFixed(2)}`;
    },
    getFormattedPrice: function() {
      return `$${this.price.toFixed(2)}`;
    }
  },
  {
    id: 3,
    name: 'Trinity Pasta',
    price: 16.99,
    category: 'Main Courses',
    description: 'Three-cheese pasta with herbs and garlic in cream sauce',
    vegetarian: true,
    displayInfo: function() {
      return `${this.name} - $${this.price.toFixed(2)}`;
    },
    getFormattedPrice: function() {
      return `$${this.price.toFixed(2)}`;
    }
  },
  {
    id: 4,
    name: 'Blessed Burger',
    price: 14.50,
    category: 'Main Courses',
    description: 'Angus beef patty with cheese, lettuce, tomato on brioche bun',
    vegetarian: false,
    displayInfo: function() {
      return `${this.name} - $${this.price.toFixed(2)}`;
    },
    getFormattedPrice: function() {
      return `$${this.price.toFixed(2)}`;
    }
  },
  {
    id: 5,
    name: 'Angel Food Cake',
    price: 6.99,
    category: 'Desserts',
    description: 'Light sponge cake with fresh berries and whipped cream',
    vegetarian: true,
    displayInfo: function() {
      return `${this.name} - $${this.price.toFixed(2)}`;
    },
    getFormattedPrice: function() {
      return `$${this.price.toFixed(2)}`;
    }
  }
];

// ===== ARRAYS AND LOOPS: Display Menu Items =====
// Location: Menu page
function enhanceMenuPage() {
  if (!window.location.pathname.includes('menu.html')) return;
  
  const menuHeader = document.getElementById('menu-header');
  if (!menuHeader) return;
  
  // Create filter section
  const filterSection = document.createElement('div');
  filterSection.style.cssText = 'text-align: center; margin: 20px; padding: 20px; background: #fff; border-radius: 8px;';
  filterSection.innerHTML = `
    <h3 style="color: #8B4513; margin-bottom: 15px;">Filter Menu</h3>
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <button class="menu-filter-btn button-style" data-category="all">All Items</button>
      <button class="menu-filter-btn button-style" data-category="Appetizers">Appetizers</button>
      <button class="menu-filter-btn button-style" data-category="Main Courses">Main Courses</button>
      <button class="menu-filter-btn button-style" data-category="Desserts">Desserts</button>
      <button class="menu-filter-btn button-style" data-category="vegetarian">Vegetarian Only</button>
    </div>
    <div style="margin-top: 15px;">
      <input type="text" id="menu-search" placeholder="Search menu items..." 
             style="padding: 10px; border: 2px solid #DEB887; border-radius: 5px; width: 300px; max-width: 90%;">
    </div>
    <div id="menu-item-count" style="margin-top: 10px; color: #654321; font-weight: bold;"></div>
  `;
  
  menuHeader.parentNode.insertBefore(filterSection, menuHeader.nextSibling);
  
  // Update item count
  function updateItemCount(count) {
    const countDiv = document.getElementById('menu-item-count');
    countDiv.textContent = `Showing ${count} item${count !== 1 ? 's' : ''}`;
  }
  
  // Initial count
  const allMenuItems = document.querySelectorAll('.menu-item');
  updateItemCount(allMenuItems.length);
  
  // Filter functionality
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      filterMenu(category);
      playSound('click');
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('menu-search');
  searchInput.addEventListener('input', function() {
    searchMenu(this.value);
  });
  
  function filterMenu(category) {
    const menuSections = document.querySelectorAll('.menu-section');
    let visibleCount = 0;
    
    menuSections.forEach(section => {
      const items = section.querySelectorAll('.menu-item');
      let sectionHasVisible = false;
      
      items.forEach(item => {
        const itemName = item.querySelector('h3').textContent;
        const menuObj = menuDatabase.find(m => m.name === itemName);
        
        if (category === 'all') {
          item.style.display = 'flex';
          sectionHasVisible = true;
          visibleCount++;
        } else if (category === 'vegetarian') {
          if (menuObj && menuObj.vegetarian) {
            item.style.display = 'flex';
            sectionHasVisible = true;
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        } else {
          if (menuObj && menuObj.category === category) {
            item.style.display = 'flex';
            sectionHasVisible = true;
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        }
      });
      
      section.style.display = sectionHasVisible ? 'block' : 'none';
    });
    
    updateItemCount(visibleCount);
  }
  
  function searchMenu(query) {
    const menuItems = document.querySelectorAll('.menu-item');
    let visibleCount = 0;
    
    menuItems.forEach(item => {
      const name = item.querySelector('h3').textContent.toLowerCase();
      const desc = item.querySelector('p').textContent.toLowerCase();
      const searchTerm = query.toLowerCase();
      
      if (name.includes(searchTerm) || desc.includes(searchTerm)) {
        item.style.display = 'flex';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });
    
    updateItemCount(visibleCount);
  }
}

// ===== HIGHER-ORDER FUNCTIONS: Sort and Filter =====
// Location: Menu page
function addSortingFeature() {
  if (!window.location.pathname.includes('menu.html')) return;
  
  const filterSection = document.querySelector('#menu-header + div');
  if (!filterSection) return;
  
  const sortDiv = document.createElement('div');
  sortDiv.style.cssText = 'margin-top: 15px;';
  sortDiv.innerHTML = `
    <button id="sort-price-asc" class="button-style" style="margin: 5px;">Sort by Price (Low to High)</button>
    <button id="sort-price-desc" class="button-style" style="margin: 5px;">Sort by Price (High to Low)</button>
    <button id="sort-name" class="button-style" style="margin: 5px;">Sort Alphabetically</button>
  `;
  filterSection.appendChild(sortDiv);
  
  document.getElementById('sort-price-asc').addEventListener('click', () => {
    sortMenuItems('price', 'asc');
    playSound('click');
  });
  
  document.getElementById('sort-price-desc').addEventListener('click', () => {
    sortMenuItems('price', 'desc');
    playSound('click');
  });
  
  document.getElementById('sort-name').addEventListener('click', () => {
    sortMenuItems('name', 'asc');
    playSound('click');
  });
  
  function sortMenuItems(sortBy, order) {
    const menuSections = document.querySelectorAll('.menu-section');
    
    menuSections.forEach(section => {
      const items = Array.from(section.querySelectorAll('.menu-item'));
      
      const sorted = items.sort((a, b) => {
        if (sortBy === 'price') {
          const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
          const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
          return order === 'asc' ? priceA - priceB : priceB - priceA;
        } else {
          const nameA = a.querySelector('h3').textContent;
          const nameB = b.querySelector('h3').textContent;
          return nameA.localeCompare(nameB);
        }
      });
      
      sorted.forEach(item => section.appendChild(item));
    });
  }
}

// ===== ANIMATIONS: Menu Item Hover and Fade-in =====
// Location: Menu page
function addMenuAnimations() {
  if (!window.location.pathname.includes('menu.html')) return;
  
  const menuItems = document.querySelectorAll('.menu-item');
  
  // Fade-in animation on load
  menuItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });
  
  // Hover animations
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px)';
      this.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
      this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
  });
}

// ========================================
// KAISAR - ABOUT US & CONTACT PAGES
// ========================================

// ===== ACCORDION FOR FAQs =====
// Location: About Us page
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
        otherItem.querySelector('.accordion-icon').textContent = '+';
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−';
        playSound('click');
      }
    });
  });
}

// ===== POPUP SUBSCRIPTION FORM =====
// Location: All pages
function openPopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    playSound('click');
  }
}

function closePopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function handleSubscription(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('popup-email');
  const email = emailInput.value.trim();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  playSound('success');
  alert(`Thank you for subscribing! Newsletter will be sent to ${email}`);
  emailInput.value = '';
  closePopup();
}

const subscribeBtn = document.getElementById('subscribe-btn');
const closeBtn = document.getElementById('close-popup');
const popupOverlay = document.getElementById('subscription-popup');
const popupForm = document.getElementById('subscription-form');

if (subscribeBtn) {
  subscribeBtn.addEventListener('click', openPopup);
}

if (closeBtn) {
  closeBtn.addEventListener('click', closePopup);
}

if (popupOverlay) {
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });
}

if (popupForm) {
  popupForm.addEventListener('submit', handleSubscription);
}

// ===== CONTACT FORM WITH CALLBACK =====
// Location: Contact page
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm || !window.location.pathname.includes('contact.html')) return;
  
  // Create success message div
  const successDiv = document.createElement('div');
  successDiv.id = 'contact-success-message';
  successDiv.style.cssText = `
    display: none;
    background: #4CAF50;
    color: white;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
  `;
  contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
  
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Simulate async submission with callback
    submitContactForm(formData, function(success, message) {
      if (success) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        successDiv.style.background = '#4CAF50';
        contactForm.reset();
        playSound('success');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successDiv.style.display = 'none';
        }, 5000);
      } else {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        successDiv.style.background = '#f44336';
      }
    });
  });
}

// Callback function for contact form submission
function submitContactForm(data, callback) {
  // Simulate network delay
  setTimeout(() => {
    if (data.name && data.email && data.message) {
      callback(true, `Thank you, ${data.name}! Your message has been sent successfully. We'll respond to ${data.email} within 24 hours.`);
    } else {
      callback(false, 'Please fill in all required fields.');
    }
  }, 1000);
}

// ========================================
// SULTAN - RESERVATIONS & GALLERY PAGES
// ========================================

// ===== RESERVATION FORM WITH VALIDATION =====
// Location: Reservations page
function validateReservationForm(event) {
  event.preventDefault();
  
  // Clear previous errors
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  let isValid = true;
  
  // Get form fields
  const name = document.getElementById('guest-name');
  const email = document.getElementById('guest-email');
  const phone = document.getElementById('guest-phone');
  const partySize = document.getElementById('party-size');
  const date = document.getElementById('reservation-date');
  const time = document.getElementById('reservation-time');
  
  // Validate Name
  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, 'Name must be at least 2 characters long');
    isValid = false;
  }
  
  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate Phone
  const phoneRegex = /^\d{10,}$/;
  const phoneDigits = phone.value.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length < 10) {
    showError(phone, 'Phone number must be at least 10 digits');
    isValid = false;
  }
  
  // Validate Party Size
  if (!partySize.value) {
    showError(partySize, 'Please select party size');
    isValid = false;
  }
  
  // Validate Date
  if (!date.value) {
    showError(date, 'Please select a date');
    isValid = false;
  } else {
    const selectedDate = new Date(date.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showError(date, 'Date cannot be in the past');
      isValid = false;
    }
  }
  
  // Validate Time
  if (!time.value) {
    showError(time, 'Please select a time');
    isValid = false;
  }
  
  // If all valid
  if (isValid) {
    playSound('success');
    const confirmMessage = `Reservation Details:
Name: ${name.value}
Email: ${email.value}
Party Size: ${partySize.value}
Date: ${date.value}
Time: ${time.value}

Your reservation has been submitted successfully! We will contact you shortly to confirm.`;
    
    alert(confirmMessage);
    event.target.reset();
  } else {
    playSound('error');
  }
}

function showError(inputElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#d32f2f';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '5px';
  errorDiv.textContent = message;
  
  inputElement.style.borderColor = '#d32f2f';
  inputElement.parentElement.appendChild(errorDiv);
  
  inputElement.addEventListener('input', function() {
    inputElement.style.borderColor = '';
    const error = inputElement.parentElement.querySelector('.error-message');
    if (error) error.remove();
  }, { once: true });
}

const reservationForm = document.querySelector('#booking-header + .about-content + .contact-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', validateReservationForm);
}

// ===== GALLERY IMAGE VIEWER WITH THUMBNAILS =====
// Location: Gallery page
function initGalleryViewer() {
  if (!window.location.pathname.includes('gallery.html')) return;
  
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  
  // Create lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'gallery-lightbox';
  lightbox.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2000;
    justify-content: center;
    align-items: center;
  `;
  
  lightbox.innerHTML = `
    <span id="close-lightbox" style="position: absolute; top: 20px; right: 40px; color: white; font-size: 40px; cursor: pointer; font-weight: bold;">&times;</span>
    <span id="prev-image" style="position: absolute; left: 20px; color: white; font-size: 40px; cursor: pointer; user-select: none;">&#10094;</span>
    <span id="next-image" style="position: absolute; right: 20px; color: white; font-size: 40px; cursor: pointer; user-select: none;">&#10095;</span>
    <img id="lightbox-image" style="max-width: 90%; max-height: 90%; border-radius: 8px; box-shadow: 0 0 30px rgba(255,255,255,0.3);">
    <div id="image-caption" style="position: absolute; bottom: 40px; color: white; font-size: 1.2rem; background: rgba(0,0,0,0.7); padding: 10px 20px; border-radius: 5px;"></div>
  `;
  
  document.body.appendChild(lightbox);
  
  // Get all gallery images
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentImageIndex = 0;
  
  // Add click handlers to gallery items
  galleryItems.forEach((item, index) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      currentImageIndex = index;
      showImage(index);
      playSound('click');
    });
  });
  
  function showImage(index) {
    const item = galleryItems[index];
    const img = item.querySelector('img');
    const caption = item.querySelector('.caption');
    
    document.getElementById('lightbox-image').src = img.src;
    document.getElementById('image-caption').textContent = caption ? caption.textContent : '';
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  document.getElementById('close-lightbox').addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  });
  
  // Previous image
  document.getElementById('prev-image').addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage(currentImageIndex);
    playSound('click');
  });
  
  // Next image
  document.getElementById('next-image').addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    showImage(currentImageIndex);
    playSound('click');
  });
  
  // Keyboard navigation for gallery
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        document.getElementById('prev-image').click();
      } else if (e.key === 'ArrowRight') {
        document.getElementById('next-image').click();
      } else if (e.key === 'Escape') {
        document.getElementById('close-lightbox').click();
      }
    }
  });
  
  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      document.getElementById('close-lightbox').click();
    }
  });
}

// ===== GALLERY ANIMATIONS =====
// Location: Gallery page
function addGalleryAnimations() {
  if (!window.location.pathname.includes('gallery.html')) return;
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Staggered fade-in animation
  galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, index * 80);
  });
  
  // Enhanced hover effect
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) rotate(2deg)';
      this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0deg)';
      this.style.zIndex = '1';
    });
  });
}

// ========================================
// SHARED FUNCTIONALITY (ALL TEAM MEMBERS)
// ========================================

// ===== SOUND EFFECTS =====
// Create audio objects (using data URIs for click sounds)
const sounds = {
  click: null,
  success: null,
  error: null
};

// Initialize sounds
function initSounds() {
  // Simple beep sound using Web Audio API
  sounds.click = createBeep(200, 0.1, 'sine');
  sounds.success = createBeep(400, 0.2, 'sine');
  sounds.error = createBeep(150, 0.2, 'square');
}

function createBeep(frequency, duration, type) {
  return function() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };
}

function playSound(soundName) {
  if (sounds[soundName]) {
    sounds[soundName]();
  }
}

// ===== DATE AND TIME DISPLAY =====
// Location: All pages (footer)
function updateDateTime() {
  const now = new Date();
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  const formattedDate = now.toLocaleString('en-US', options);
  
  const dateTimeElement = document.getElementById('current-datetime');
  if (dateTimeElement) {
    dateTimeElement.textContent = formattedDate;
  }
}

// Update time every second
if (document.getElementById('current-datetime')) {
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// ===== CARD ANIMATIONS =====
// Location: Home page
function addCardAnimations() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card, index) => {
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Animate in
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
}

// ===== SMOOTH SCROLL TO TOP BUTTON =====
// Location: All pages
function addScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #8B4513;
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    transition: background 0.3s, transform 0.3s;
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    playSound('click');
  });
  
  // Hover effect
  scrollBtn.addEventListener('mouseenter', function() {
    this.style.background = '#654321';
    this.style.transform = 'scale(1.1)';
  });
  
  scrollBtn.addEventListener('mouseleave', function() {
    this.style.background = '#8B4513';
    this.style.transform = 'scale(1)';
  });
}

// ===== LOADING ANIMATION =====
// Location: All pages
function showLoadingAnimation() {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
  `;
  
  loader.innerHTML = `
    <div style="text-align: center;">
      <div style="border: 8px solid #DEB887; border-top: 8px solid #8B4513; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
      <p style="margin-top: 20px; color: #8B4513; font-size: 1.2rem; font-weight: bold;">Loading Divine Dining...</p>
    </div>
  `;
  
  // Add spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(loader);
  
  // Hide loader when page is loaded
  window.addEventListener('load', function() {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  });
}

// ========================================
// INITIALIZE ALL FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🍽️ God loves the Trinity - Restaurant Website Loaded');
  console.log('Team: Newcomers (Chingiz, Sultan, Kaisar)');
  console.log('Group: SE-2405');
  
  // Initialize sounds
  initSounds();
  
  // Show loading animation
  showLoadingAnimation();
  
  // Common features (all pages)
  initKeyboardNavigation();
  displayTimeGreeting();
  displayCurrentTime();
  addScrollToTop();
  addCardAnimations();
  
  // Chingiz - Home & Menu pages
  initGreeting();
  enhanceMenuPage();
  addSortingFeature();
  addMenuAnimations();
  
  // Kaisar - About Us & Contact pages
  if (document.querySelector('.accordion-item')) {
    initAccordion();
  }
  initContactForm();
  
  // Sultan - Reservations & Gallery pages
  initGalleryViewer();
  addGalleryAnimations();
  
  console.log('✅ All features initialized successfully!');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Console log for debugging
function logFeature(featureName, author) {
  console.log(`✓ ${featureName} initialized by ${author}`);
}

// Get current page name
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page;
}

// Check if element exists
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

// Log current page on load
console.log(`Current page: ${getCurrentPage()}`);

// ========================================
// END OF SCRIPT
// ========================================
