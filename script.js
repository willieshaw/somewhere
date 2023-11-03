// Copy to clipboard functionality and notification

document.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll("p");
    const headers = document.querySelectorAll("h1[data-section-id]");
    const notification = document.getElementById("notification");

    const copyToClipboard = (element, headerText) => {
        return function() {
            const fullText = element.textContent.split('\n').map(line => line.trim()).join('\n').trim();

            // Copy to clipboard
            const textarea = document.createElement("textarea");
            textarea.value = fullText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);

            // Display notification
            if (element.tagName === "P") {
                headerText = element.querySelector("strong") ? element.querySelector("strong").textContent : "Email";
                notification.textContent = headerText + " copied to clipboard";
            } else {
                notification.textContent = '"' + headerText + '" section copied to clipboard';
            }
            
            notification.style.display = "block";
            notification.style.opacity = "1";

            // Fade out notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = "0";
                setTimeout(() => {
                    notification.style.display = "none";
                }, 370); // Match the transition duration of the opacity
            }, 3000);
        };
    };

    paragraphs.forEach(paragraph => {
        paragraph.addEventListener("click", copyToClipboard(paragraph));
    });

    headers.forEach(header => {
        header.addEventListener("click", function() {
            const sectionId = header.getAttribute('data-section-id');
            const section = document.getElementById(sectionId);
            if (section) {
                copyToClipboard(section, header.textContent)();
            }
        });
        // Hover event listener
        header.addEventListener("mouseenter", function() {
            const sectionId = header.getAttribute('data-section-id');
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.color = 'red';
            }
        });

        // Mouse leave event listener
        header.addEventListener("mouseleave", function() {
            const sectionId = header.getAttribute('data-section-id');
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.color = ''; // Reset to default color
            }
        });
    });
});

// Scroll to anchor link pushed down to offset the logo

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80; // Offset value
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Get the modal
var modal = document.getElementById('imageModal');

// Get the modal image and the caption
var modalImg = document.getElementById("img01");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Intialize index
var currentIndex = 0;

// Assign an onclick event to every image in the stills-grid
var images = document.querySelectorAll('.stills-grid img');

images.forEach((image, index) => {
    image.onclick = function() {
      modal.style.display = "block";
      modalImg.src = this.src;
      currentIndex = index;
    };
  });

// currentIndex = (currentIndex + 1) % images.length;
// changeImage(currentIndex);

// Assign onclick event on the modal content to navigate through images
modalImg.onclick = function(event) {
  if (event.offsetX < this.clientWidth / 2) {
    // Previous image
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  } else {
    // Next image
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  }
  modalImg.src = images[currentIndex].src;
  modalImg.dataset.currentIndex = currentIndex;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modalImg, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Allow the user to close the modal with the Escape key
document.onkeydown = function(event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
}


window.onkeyup = function(event) {
    if (event.key === 'Escape') {
      modal.style.display = "none";
    } else if (event.key === 'ArrowRight') {
        currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    } else if (event.key === 'ArrowLeft') {
        currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    modalImg.src = images[currentIndex].src;
    modalImg.dataset.currentIndex = currentIndex;
  };

  