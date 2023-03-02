// Create a 2D array to store the values of the Ising model
let isingModel = [];

// Create a function to initialize the Ising model
function initializeIsingModel() {
    // Create a 2D array of zeros
    for (let i = 0; i < width; i++) {
        isingModel[i] = [];
        for (let j = 0; j < height; j++) {
            isingModel[i][j] = 0;
        }
    }
    // Randomly assign values of -1 or 1 to each element of the Ising model
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            isingModel[i][j] = random([-1, 1]);
        }
    }
}

// Create a function to draw the Ising model
function drawIsingModel() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (isingModel[i][j] == -1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * 10, j * 10, 10, 10);
        }
    }
}

// Create a function to update the Ising model using the Metropolis algorithm
function updateIsingModel() {
    // Select a random site
    let i = floor(random(width));
    let j = floor(random(height));

    // Calculate the energy of the site
    let energy = 0;
    if (i > 0) {
        energy += isingModel[i - 1][j];
    }
    if (i < width - 1) {
        energy += isingModel[i + 1][j];
    }
    if (j > 0) {
        energy += isingModel[i][j - 1];
    }
    if (j < height - 1) {
        energy += isingModel[i][j + 1];
    }
    energy *= -isingModel[i][j];

    // Calculate the probability of flipping the spin
    let probability = exp(-2 * energy);

    // Flip the spin with the probability
    if (random(1) < probability) {
        isingModel[i][j] *= -1;
    }
}

// Create the setup function
function setup() {
    createCanvas(400, 400);
    initializeIsingModel();
}

// Create the draw function
function draw() {
    background(127);
    drawIsingModel();
    updateIsingModel();
}
