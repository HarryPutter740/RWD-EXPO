let images = [
 "A1.jpeg",
 "A2.jpeg",
 "A3.jpeg"
];
let index = 0; // current image index
// Function to show image
function showImage() {
 document.getElementById("slider").src = images[index];
}
// Next button
function nextImage() {
 index++;
 if (index >= images.length) {
 index = 0; // loop back to first image
 }
 showImage();
}
// Previous button
function prevImage() {
 index--;
 if (index < 0) {
 index = images.length - 1; // go to last image
 }
 showImage();
}
// Show first image on page load
showImage();