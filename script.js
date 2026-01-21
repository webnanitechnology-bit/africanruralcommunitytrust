// Currently no custom JS needed.
// File included for future expansion if you want sticky effects or animations.
console.log("Navbar Loaded");
// Slider
let slides = document.querySelectorAll('.slide');
let index = 0;
function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[i].classList.add('active');
}
document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});
document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 5000);
//End of Slider

//ABOUT SECTION
document.querySelectorAll(".who-card").forEach(card => {
    card.addEventListener("click", () => {
        const targetId = card.getAttribute("data-target");
        const content = document.getElementById(targetId);
        const arrow = card.querySelector(".arrow");

        // Toggle dropdown
        content.classList.toggle("open");
        arrow.classList.toggle("rotate");
    });
});

// END ABOUT SECTION
// Not needed for hover zoom.
// Reserved if you want to add click features later.
 document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    faders.forEach(el => appearOnScroll.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.2
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(element => {
        appearOnScroll.observe(element);
    });
});

document.getElementById("contactForm").addEventListener("submit", function(e){
    alert("Your message is being sent...");
});

//Photo gallery
document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-img");
    const modalImage = document.getElementById("modalImage");
    const imageModal = new bootstrap.Modal(document.getElementById("imageModal"));

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            modalImage.src = img.src;
            imageModal.show();
        });
    });
});


// Experience-Card Stories
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  const button = card.querySelector(".toggle-btn");
  const label = button.querySelector("span");

  button.addEventListener("click", () => {
    const isExpanded = card.classList.contains("expanded");

    // ACCORDION MODE: close all cards
    cards.forEach(c => {
      c.classList.remove("expanded");
      c.querySelector(".toggle-btn span").textContent = "Read More";
    });

    // Open only the clicked card if it was closed
    if (!isExpanded) {
      card.classList.add("expanded");
      label.textContent = "Read Less";
    }
  });
});
//Bog
// Reserved for future enhancements (carousel, dynamic content, API, animations)
document.addEventListener("DOMContentLoaded", () => {
  console.log("Latest News Hero Loaded");
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("News section loaded");
});
