// Copy to clipboard functionality and notification

document.addEventListener("DOMContentLoaded", function () {
    const paragraphs = document.querySelectorAll("p");
    const headers = document.querySelectorAll("h1[data-section-id]");
    const notification = document.getElementById("notification");

    const copyToClipboard = (element, headerText) => {
        return function () {
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
        header.addEventListener("click", function () {
            const sectionId = header.getAttribute('data-section-id');
            const section = document.getElementById(sectionId);
            if (section) {
                copyToClipboard(section, header.textContent)();
            }
        });
        // Hover event listener
        header.addEventListener("mouseenter", function () {
            const sectionId = header.getAttribute('data-section-id');
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.color = 'red';
            }
        });

        // Mouse leave event listener
        header.addEventListener("mouseleave", function () {
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
var modal = document.getElementById('myModal');
// Get the image and insert it inside the modal
var modalImg = document.getElementById("img01");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Variable to keep track of the current image index
var currentImageIndex = 0;
// Get the array of images
var images = document.querySelectorAll('.stills-grid img');

// Function to update the modal image
function updateModalImage(index) {
    currentImageIndex = index;
    modalImg.src = images[currentImageIndex].src;
    modalImg.onload = function () {
        var windowHeight = window.innerHeight;
        var imgHeight = modalImg.clientHeight;
        var margin = (windowHeight - imgHeight) / 2;
        modalImg.style.marginTop = margin > 0 ? margin + 'px' : '0px';
    };
}

// Iterate through the grid images and bind click event
images.forEach(function (image, index) {
    image.onclick = function () {
        modal.style.display = "block";
        updateModalImage(index);
    };
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// Add event listeners for arrow keys
window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        modal.style.display = "none";
    } else if (e.key === 'ArrowRight') {
        if (currentImageIndex < images.length - 1) {
            updateModalImage(currentImageIndex + 1);
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentImageIndex > 0) {
            updateModalImage(currentImageIndex - 1);
        }
    }
});

// Close the modal if the user clicks outside of the image
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Function to handle click on left/right half of the image
function onImageClick(event) {
    var xClick = event.clientX;
    var imgWidth = modalImg.clientWidth;
    var imgRect = modalImg.getBoundingClientRect();
    var imgLeftSide = imgRect.left;

    if (xClick - imgLeftSide < imgWidth / 2) {
        // Click on the left half
        if (currentImageIndex > 0) {
            updateModalImage(currentImageIndex - 1);
        }
    } else {
        // Click on the right half
        if (currentImageIndex < images.length - 1) {
            updateModalImage(currentImageIndex + 1);
        }
    }
}

// Bind click event to the image for navigation
modalImg.onclick = onImageClick;


// Variables to track touch start and end points
var touchStartX = 0;
var touchEndX = 0;

// Function to handle the start of a touch
function touchStart(event) {
    touchStartX = event.touches[0].clientX;
}

// Function to handle the end of a touch
function touchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipeGesture();
}

// Function to determine and handle swipe direction
function handleSwipeGesture() {
    if (touchEndX < touchStartX) {
        // Swiped left, go to next image
        if (currentImageIndex < images.length - 1) {
            updateModalImage(currentImageIndex + 1);
        }
    }
    if (touchEndX > touchStartX) {
        // Swiped right, go to previous image
        if (currentImageIndex > 0) {
            updateModalImage(currentImageIndex - 1);
        }
    }
}

// Add touch event listeners to the image
modalImg.addEventListener('touchstart', touchStart, false);
modalImg.addEventListener('touchend', touchEnd, false);


// Function to disable scrolling
function disableScrolling() {
    document.body.classList.add("no-scroll");
}

// Function to enable scrolling
function enableScrolling() {
    document.body.classList.remove("no-scroll");
}

// Call disableScrolling when the modal is opened
modal.addEventListener('show', disableScrolling);

// Call enableScrolling when the modal is closed
modal.addEventListener('hide', enableScrolling);



