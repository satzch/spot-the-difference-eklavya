// Get the DOM elements
const original_img = document.getElementById("original");
const diff_img = document.getElementById("diff");

const score = document.getElementById("score");

// Get the canvas contexts
const og_ctx = original_img.getContext("2d");
const df_ctx = diff_img.getContext("2d");
console.log(og_ctx)

let og_img;
let df_img;
let score_point = 0;
let total_differences = 0;

total_differences = game_data.differences.length;
updateScore();

/**
 * Loads and draws the images from the game_data object
 */
function loadImages() {
    og_img = new Image();
    df_img = new Image();

    og_img.src = game_data.images.image1;
    df_img.src = game_data.images.image2;

    og_img.onload = () => {
        drawImageOnCanvas(og_img, original_img, og_ctx);
    }

    df_img.onload = () => {
        drawImageOnCanvas(df_img, diff_img, df_ctx);
    }
}

loadImages();

/**
 * draws the image on canvas
 * @param {HTMLImageElement} img image to be drawn
 * @param {HTMLCanvasElement} canvas the canvas element on which the image will be drawn
 * @param {object} ctx the context of the canvas
 */
function drawImageOnCanvas(img, canvas, ctx) {

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    // if (img.naturalWidth > img.naturalHeight) {
    //     let img_width = canvas.width;
    //     let img_height = canvas.width * aspect_ratio;
    //     canvas.height = img_height;
    //     ctx.drawImage(img, 0, 0, img_width, img_height);
    // } 
}


/**
 * convert screen coordinates to canvas coordinates
 * @param {float} x screen x-coordinate
 * @param {float} y screen y-coordinate
 * @returns {Array<float>}
 */
function screenToCanvas(x, y) {
    let canvas_computed_style = window.getComputedStyle(original_img);
    let canvas_width = parseInt(canvas_computed_style.width, 10);
    let canvas_height = parseInt(canvas_computed_style.height, 10);

    let img_to_canvas_width_ratio = og_img.naturalWidth / canvas_width;
    let img_to_canvas_height_ratio = og_img.naturalHeight / canvas_height;

    return [x*img_to_canvas_width_ratio, y*img_to_canvas_height_ratio];
}

/**
 * handles the differnce check for the clicks on the images
 * @param {Event} e 
 */
function handleImgClick(e) {
    const [clickX, clickY] = screenToCanvas(e.offsetX, e.offsetY);
    console.log("Original:", e.offsetX, e.offsetY);
    console.log(clickX, clickY);

    for (let diff of game_data.differences) {
        if (checkBoundingBox(clickX, clickY, diff)) {
            console.log("Spotted");

            // remove the difference from the array
            game_data.differences.splice(game_data.differences.indexOf(diff), 1);

            // highlight the correctly found difference
            highlightDiff(diff);

            // increase the score
            score_point++;
            updateScore();
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
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "red";
    ctx.strokeRect(box.x, box.y, box.width, box.height);
}

/**
 * show the score on the UI dom for score
 */
function updateScore() {
    score.innerHTML = `${score_point} / ${total_differences}`;
}