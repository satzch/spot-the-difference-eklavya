// Get the DOM elements
const original_img = document.getElementById("original");
const diff_img = document.getElementById("diff");

// Get the canvas contexts
const og_ctx = original_img.getContext("2d");
const df_ctx = diff_img.getContext("2d");

// Load the image
function loadImages() {
    const og_img = new Image();
    const df_img = new Image();

    og_img.src = game_data.images.image1;
    df_img.src = game_data.images.image2;

    og_img.onload = () => {
        original_img.width = og_img.naturalWidth;
        original_img.height = og_img.naturalHeight;
        og_ctx.drawImage(og_img, 0, 0);
    }

    df_img.onload = () => {
        diff_img.width = df_img.naturalWidth;
        diff_img.height = df_img.naturalHeight;
        df_ctx.drawImage(df_img, 0, 0);
    }
}

loadImages();
