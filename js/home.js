const images = [
    './img/candy_kingdom.png', 
    './img/Symphony.png', 
    './img/FastfoodLove.png',
    './img/DeepSeaPressure.png',
    './img/SocialButterfly.png'
  ];
  
  let currentIndex = 0;
  
  function changeImage() {
    const imageElement = document.getElementById('topImage');
  
    // Add the 'hidden' class to start the fade-out
    imageElement.classList.add('hidden');
  
    // Wait for the fade-out to complete (1 second, same as CSS transition duration)
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length; // Cycle through the images
      imageElement.src = images[currentIndex]; // Change the image source
      imageElement.classList.remove('hidden'); // Fade back in
    }, 1000); // Match the CSS transition time
  }
  
  // Change the image every 5 seconds
  setInterval(changeImage, 3000);

  
  
  