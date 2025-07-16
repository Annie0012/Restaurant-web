document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelector('.nav-links li');
    
    burger.addEventListener('click', function (){
        // Toggle Mobile Menu
        navLinks.classList.toggle('active');

        // Animate burger icon
        burger.classList.toggle('toggle');

        // Animate nav items
        navItems.forEach((item, index) =>{
            if (item.style.animation){
                item.style.animation = '';
            } else {
                item.style.animation = `\navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    //Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                navItems.forEach(item =>{
                    item.style.animation = '';
                });
            }

            // Scroll to target section
            const targetId = this.getAttribute('href');
            if(targetId !== '#'){
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }

        });
    });
    
    // Menu Category Switching
    const categorybtns = document.querySelectorAll('.categorybtn');
    const menuItemsContainer = document.getElementById('menu-items');

    // Menu data
    const menuData = {
        starters:[
            { name: 'Fried-Rice', price: '#3,500', description: 'Fried Rice topped with tomatoes, garlic, carrot, green peas and diced turkey'},
            { name: 'Fried-Rice', price: '#3,500', description: 'Fried Rice topped with tomatoes, garlic, carrot, green peas and diced turkey'},
            { name: 'Fried-Rice', price: '#3,500', description: 'Fried Rice topped with tomatoes, garlic, carrot, green peas and diced turkey'},
            { name: 'Fried-Rice', price: '#3,500', description: 'Fried Rice topped with tomatoes, garlic, carrot, green peas and diced turkey'},
            { name: 'Fried-Rice', price: '#3,500', description: 'Fried Rice topped with tomatoes, garlic, carrot, green peas and diced turkey'},
            { name: 'Fried-Rice', price: '#3,500', description: 'Fried Rice topped with tomatoes, garlic, carrot, green peas and diced turkey'}
        ],
        mains: [
            { name: 'Ofe Aku and White Rice', price: '#4500', description: 'White Rice with our deliciously made Ofe Aku topped with Iced Fish'},
            { name: 'Ofe Aku and White Rice', price: '#4500', description: 'White Rice with our deliciously made Ofe Aku topped with Iced Fish'},
            { name: 'Ofe Aku and White Rice', price: '#4500', description: 'White Rice with our deliciously made Ofe Aku topped with Iced Fish'},
            { name: 'Ofe Aku and White Rice', price: '#4500', description: 'White Rice with our deliciously made Ofe Aku topped with Iced Fish'},
            { name: 'Ofe Aku and White Rice', price: '#4500', description: 'White Rice with our deliciously made Ofe Aku topped with Iced Fish'},
            { name: 'Ofe Aku and White Rice', price: '#4500', description: 'White Rice with our deliciously made Ofe Aku topped with Iced Fish'}
        ],
        desserts: [
            { name: 'Chocolate Lava Cake', price: '$8.99', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream'},
            { name: 'Chocolate Lava Cake', price: '$8.99', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream'},
            { name: 'Chocolate Lava Cake', price: '$8.99', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream'},
            { name: 'Chocolate Lava Cake', price: '$8.99', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream'},
            { name: 'Chocolate Lava Cake', price: '$8.99', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream'},
            { name: 'Chocolate Lava Cake', price: '$8.99', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream'},
        ],
        drinks: [
            {name: 'House Wine', price: '#8,599', description: 'Glass of our signature red or white'},
            {name: 'House Wine', price: '#8,599', description: 'Glass of our signature red or white'},
            {name: 'House Wine', price: '#8,599', description: 'Glass of our signature red or white'},
            {name: 'House Wine', price: '#8,599', description: 'Glass of our signature red or white'},
            {name: 'House Wine', price: '#8,599', description: 'Glass of our signature red or white'},
            {name: 'House Wine', price: '#8,599', description: 'Glass of our signature red or white'},
        ]
    };

    // Function to display menu items
    function displayMenuItems(category) {
        menuItemsContainer.innerHTML = '';

        menuData[category].forEach(item =>{
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = `
                <h3>${item.name}</h3>
                <div class="price">${item.price}</div>
                <p class="description">${item.description}</p>
            `;
            menuItemsContainer.appendChild(menuItem);
        });
    }

    // Set active category and display item
    categorybtns.forEach(btn =>{
        btn.addEventListener('click', function(){
            // Remove active class from all buttons
            categorybtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get category from data attribute
            const category = this.getAttribute('data-category');

            //Display items for selected category
            displayMenuItems(category);
        });
    });

    // Initialize with starters category
    displayMenuItems('starters');

    // Form Submission
    const reservationForm = document.getElementById('reservation-form');
    const newsletterForm = document.getElementById('newsletter-form');

    // Reservation Form
    reservationForm.addEventListener('submit', function(e){
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Simple validation
        if (name && email && date && time){
            // In a real app, you would send this data to a server
            alert(`Thank you, ${name}! Your reservation for ${date} at ${time} has been received. We will send a confirmation to ${email}.`);

            // Reset form
            reservationForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Newsletter Form
    newsletterForm.addEventListener('submit', function(e){
        e.preventDefault();

        const email = this.querySelector('input').value;

        if (email){
            alert(`Thank you for subscribing with ${email}! You will receive our newsletter soon.`);
            this.reset();
        } else{
            alert('Please enter your email address.');
        }
    });

    // Gallery Lightbox (would require additional HTML/Css for full implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item =>{
        item.addEventListener('click', function(){
            // In a full implementation, this would open a lightbox with the larger image
            console.log('Opening image viewer for:', this.querySelector('img').alt);
        });
    });

    //Current year for footer
    document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} Trix Haven. All rights reserved`; 
});