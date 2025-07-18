// 1) SLIDE-IN/TOP & SLIDE-OUT/BOTTOM ANIMATION FOR TEXT
const texts = ["Code", "Mac", "or Xcode"];
const cyclingText = document.getElementById("cyclingText");
let currentIndex = 0;

function cycleText() {
  // Slide out through the bottom
  cyclingText.classList.add("slide-out-bottom");
  
  setTimeout(() => {
    // Update the text to the next variant
    cyclingText.innerText = texts[currentIndex];
    cyclingText.classList.remove("slide-out-bottom");
    
    // Slide in from the top
    cyclingText.classList.add("slide-in-top");
    setTimeout(() => {
      cyclingText.classList.remove("slide-in-top");
    }, 600);

    // Increment index to next text in array
    currentIndex = (currentIndex + 1) % texts.length;
  }, 500);
}

// Trigger cycleText every 6 seconds (6000 ms)
setInterval(cycleText, 6000);

// 2) "GET A DEMO" BUTTON NAVIGATION
const getDemoBtns = [
  document.getElementById("getDemoBtn"),
  document.getElementById("getDemoBtn2"),
];

// Navigate to 'calendar.html' when user clicks "Get a demo"
getDemoBtns.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "calendar.html";
    });
  }
});

// 3) WAITLIST FUNCTIONALITY
const joinWaitlistBtn = document.getElementById("joinWaitlistBtn");

// Initialize EmailJS
emailjs.init("GfZ24Y7qefe8eiOZ1");

if (joinWaitlistBtn) {
  joinWaitlistBtn.addEventListener("click", () => {
    const email = prompt("Enter your email to join the waitlist:");
    
    if (email && email.includes("@")) {
      // Store email in localStorage for backup
      const waitlistEmails = JSON.parse(localStorage.getItem("waitlistEmails") || "[]");
      waitlistEmails.push({
        email: email,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("waitlistEmails", JSON.stringify(waitlistEmails));
      
      // Send email to yourself
      sendEmailToOwner(email);
      
      alert(`Thank you! ${email} has been added to the waitlist. We'll notify you when Scaleify is ready!`);
      
      // Log to console for debugging
      console.log("Current waitlist emails:", waitlistEmails);
    } else if (email) {
      alert("Please enter a valid email address.");
    }
  });
}

// Function to send email to yourself (using EmailJS)
function sendEmailToOwner(userEmail) {
  emailjs.send("service_kmgaxu8", "template_00pw298", {
    user_email: userEmail,
    timestamp: new Date().toISOString()
  }).then(
    function(response) {
      console.log("Email sent successfully:", response);
    },
    function(error) {
      console.error("Email failed to send:", error);
    }
  );
}

// Function to save to Google Sheets (alternative option)
function saveToGoogleSheets(email) {
  // You can use Google Apps Script to create a web app that saves to sheets
  /*
  const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
  
  fetch(scriptURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      timestamp: new Date().toISOString()
    })
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
  */
}

// Function to view all waitlist emails (for testing)
function viewWaitlistEmails() {
  const emails = JSON.parse(localStorage.getItem("waitlistEmails") || "[]");
  console.log("All waitlist emails:", emails);
  return emails;
}

// Function to download emails as JSON file
function downloadWaitlistEmails() {
  const emails = JSON.parse(localStorage.getItem("waitlistEmails") || "[]");
  const dataStr = JSON.stringify(emails, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'waitlist-emails.json';
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// 4) WAVE IMAGE INTERACTIVITY
const waveImg = document.querySelector(".wave-img");

// A) Click-to-Flip
waveImg.addEventListener("click", () => {
  waveImg.classList.toggle("flipped");
});

// B) Mousemove Tilt
waveImg.addEventListener("mousemove", (e) => {
  const rect = waveImg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = (y / rect.height - 0.5) * 20;
  const rotateY = (x / rect.width - 0.5) * 20;
  waveImg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

waveImg.addEventListener("mouseleave", () => {
  waveImg.style.transform = "rotateX(0deg) rotateY(0deg)";
});
