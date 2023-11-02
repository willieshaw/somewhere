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
                headerText = element.querySelector("strong") ? element.querySelector("strong").textContent : "Text";
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


