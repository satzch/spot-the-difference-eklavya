// Get the DOM elements
const original_img = document.getElementById("original");
const diff_img = document.getElementById("diff");

// Get the canvas contexts
const og_ctx = original_img.getContext("2d");
const df_ctx = diff_img.getContext("2d");
console.log(og_ctx)

/**
 * Loads and draws the images from the game_data object
 */
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

/**
 * handles the differnce check for the clicks on the images
 * @param {Event} e 
 */
function handleImgClick(e) {
    const clickX = e.offsetX;
    const clickY = e.offsetY;
    console.log(clickX, clickY);

    for (let diff of game_data.differences) {
        if (checkBoundingBox(clickX, clickY, diff)) {
            console.log("Spotted");
            highlightDiff(diff);
        }
    }
}

/**
 * returns true if (x, y) lies within the box dimensions, otherwise return false
 * @param {float} x x-coordinate of the point to be checked
 * @param {float} y y-coordinate of the point to be checked
 * @param {JSON} box the bounding box inside which the point must lie to return true
 * 
 * box dimensions structure: { x: 0, y: 0, width: 10, height: 10 }
 */
function checkBoundingBox(x, y, box) {
    return (box.x < x && box.x + box.width > x && box.y < y && box.y + box.height > y);
}

// add event listeners for the click checks
original_img.addEventListener("click", handleImgClick);
diff_img.addEventListener("click", handleImgClick);


/**
 * highlights the difference on both images
 * @param {JSON} box dimensions of the box containing the difference
 */
function highlightDiff(box) {
    drawBox(og_ctx, box);
    drawBox(df_ctx, box);
}


/**
 * draws a box with provided dimensions
 * @param {object} ctx context of the canvas on which the box will be drawn
 * @param {JSON} box the box dimensions
 */
function drawBox(ctx, box) {
    ctx.fillStyle = "red";
    ctx.fillRect(box.x, box.y, box.width, box.height);
}