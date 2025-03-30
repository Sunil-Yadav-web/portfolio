// Tabs functionality
var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".tabcontent");

tabLinks.forEach(function (el) {
   el.addEventListener("click", openTabs);
});

function openTabs(el) {
   var btnTarget = el.currentTarget;
   var country = btnTarget.dataset.country;

   // Hide all tab content
   tabContent.forEach(function (el) {
      el.classList.remove("active");
   });

   // Deactivate all tab links
   tabLinks.forEach(function (el) {
      el.classList.remove("active");
   });

   // Show the target tab content
   document.querySelector("#" + country).classList.add("active");

   // Activate the clicked tab link
   btnTarget.classList.add("active");

   // Reinitialize the tilt effect for the newly shown content
   initTiltEffect();
}

// Tilt effect functionality
function initTiltEffect() {
   let containers = document.querySelectorAll('.tilt');

   containers.forEach((container) => {
      const height = container.clientHeight;
      const width = container.clientWidth;

      // Add event listeners
      container.addEventListener('mousemove', handleMove);
      container.addEventListener('mouseout', resetTransform);
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mouseup', handleMouseUp);

      function handleMove(e) {
         const xVal = e.layerX;
         const yVal = e.layerY;

         // Customizable rotation and scale values
         const rotationMultiplier = 10;
         const yRotation = rotationMultiplier * ((xVal - width / 2) / width);
         const xRotation = -rotationMultiplier * ((yVal - height / 2) / height);

         const transformString = `perspective(500px) scale(1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
         container.style.transform = transformString;
      }

      function resetTransform() {
         container.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
      }

      function handleMouseDown() {
         container.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
      }

      function handleMouseUp() {
         container.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)';
      }
   });
}

// Initialize tilt effect on page load
initTiltEffect();