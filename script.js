const rollBtn = document.querySelector(".spinBtn")

const icon_height = 79;
const num_icons = 9;
const time_per_icon = 100;
let fruit_indexes = [0, 0, 0];

/* Fruit index values:
* banana = 0 ; 7 = 1 ; cherry = 2
* grape = 3 ; orange = 4 ; bell = 5 ;
* bar = 6 ; lemon = 7 ; melon = 8
*  */

let slotsMoney = 2000

const roll = (reel, offset = 0) => {
    // Calculation for rotation
    const icon = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
    // Variables to get current background position
    // getComputedStyle gets element's CSS styles
    // parseFloat(style) returns a number (instead of string like 10px) of background position Y
    const style = getComputedStyle(reel);
    const backgroundPositionY = parseFloat(style["backgroundPositionY"])

    // Creating Promise

    return new Promise((resolve, reject) => {
        // Animating reel by giving it transition property
        reel.style.transition = `background-position-y ${8 + icon * time_per_icon}ms`;
        reel.style.backgroundPositionY = `${backgroundPositionY + icon * icon_height}px`

        // Resolving promise by giving back icon value
        setTimeout(() => {
            resolve(icon%num_icons)
        }, 8 + icon * time_per_icon)
    })

};

function rollAll() {
    // Select reels
    const reelsList = document.querySelectorAll('.slots > .reel');

    // Promise.all waits until all promises resolve, then returns result as an array
    // [...reelsList] converts from NodeList into array. Worth remembering
    Promise
        .all( [...reelsList].map((reel, index) => roll(reel, index)) )
        .then((result) => {
            result.forEach((icon, index) => fruit_indexes[index] = (fruit_indexes[index] + icon)%num_icons);
            console.log(fruit_indexes)
        })
}

rollBtn.onclick = () => rollAll();