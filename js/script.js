// Get the DOM elements
const original_img = document.getElementById("original");
const diff_img = document.getElementById("diff");


// Load the image
function loadImages() {
    original_img.src = game_data.images.image1;
    diff_img.src = game_data.images.image2;
}

loadImages();
