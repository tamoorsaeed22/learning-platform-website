// Sample course data
const courses = [
    {
        id: 1,
        title: "Introduction to Python Programming",
        instructor: "Dr. Sarah Johnson",
        rating: 4.7,
        students: 12500,
        price: 49.99,
        image: "images/maxresdefault.jpg",
        category: "computer-science"
    },
    {
        id: 2,
        title: "Machine Learning A-Z: Hands-On Python & R In Data Science",
        instructor: "Prof. David Wilson",
        rating: 4.8,
        students: 34200,
        price: 89.99,
        image: "images/1603194159125.png",
        category: "data-science"
    },
    {
        id: 3,
        title: "The Complete Financial Analyst Course 2023",
        instructor: "Jane Smith, MBA",
        rating: 4.6,
        students: 8700,
        price: 59.99,
        image: "images/R (2).png",
        category: "business"
    },
    {
        id: 4,
        title: "Digital Marketing Masterclass - 23 Courses in 1",
        instructor: "Mark Thompson",
        rating: 4.5,
        students: 15600,
        price: 69.99,
        image: "images/digital-marketing.jpg",
        category: "business"
    },
    {
        id: 5,
        title: "The Complete Web Developer Course 3.0",
        instructor: "Rob Percival",
        rating: 4.7,
        students: 28900,
        price: 79.99,
        image: "images/course-review-web-developer-zero-to-mastery-360.jpeg",
        category: "computer-science"
    },
    {
        id: 6,
        title: "Photography Masterclass: A Complete Guide to Photography",
        instructor: "Emma Davis",
        rating: 4.8,
        students: 9800,
        price: 49.99,
        image: "images/41ScJ9VufzL.jpg",
        category: "arts"
    },
    {
        id: 7,
        title: "The Complete Public Speaking Certification Program",
        instructor: "Dr. Michael Brown",
        rating: 4.6,
        students: 6700,
        price: 39.99,
        image: "images/OIP.jpeg",
        category: "personal-development"
    },
    {
        id: 8,
        title: "Spanish for Beginners: The Complete Method - Level 1",
        instructor: "Ana Rodriguez",
        rating: 4.9,
        students: 12300,
        price: 29.99,
        image: "images/51EtOGatccL._SL500_.jpg",
        category: "language"
    }
];

// DOM Elements
const courseGrid = document.getElementById('courseGrid');
const categoryCards = document.querySelectorAll('.category-card');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Display courses
function displayCourses(coursesToDisplay = courses) {
    courseGrid.innerHTML = '';
    
    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-details">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">${course.instructor}</p>
                <div class="course-meta">
                    <span class="course-rating"><i class="fas fa-star"></i> ${course.rating}</span>
                    <span class="course-students">(${course.students.toLocaleString()} students)</span>
                </div>
                <div class="course-price">$${course.price}</div>
            </div>
        `;
        courseGrid.appendChild(courseCard);
    });
}

// Filter courses by category
function filterCourses(category) {
    if (category === 'all') {
        displayCourses();
        return;
    }
    
    const filteredCourses = courses.filter(course => course.category === category);
    displayCourses(filteredCourses);
}

// Testimonial slider
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    currentTestimonial = (index + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayCourses();
    
    // Category filter
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            filterCourses(category);
            
            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
    
    // Testimonial navigation
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayCourses();
        return;
    }
    
    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) || 
        course.instructor.toLowerCase().includes(searchTerm)
    );
    
    displayCourses(filteredCourses);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});