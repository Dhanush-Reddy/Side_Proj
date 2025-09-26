// BaDu Aotian October 10, 2019 https://github.com/AJLoveChina/birthday
var config = {
    // The sentences can be any length; add as many as you like.
    // Try to keep each sentence under 15 characters so the layout stays tidy.
    texts: [
        "Happy birthday  Dhorasani amma 🥳",
        "Last year Birthday inka kalla mundhe undhi",
        "Inko Birthday e lopu eh occhedhi",
        "Ee saari thakkuva iendhi em badhapadaku mowa",
        "Next year sambavam chedham",
        "Enjoy Yourday 🎂"

    ],
    /**
     * imgs is optional, but if you add entries please follow the format below.
     * "Text that matches exactly" : "Image path (images can live in the imgs folder)"
     * For example
     * "My beloved cutie": "./imgs/xiaokeai.jpg"
     *
     * If you skip an image, comment out the line with two leading slashes; for example,
     * the image for "Today is your birthday" below will not be displayed.
     * Tip: Square or nearly square images look best.
     */
    imgs: {
        "My beloved cutie": "./imgs/xiaokeai.png",
        // "Today is your birthday": "./imgs/birthday.jpg",
    },
    // Add gallery image paths (16:9 recommended). Replace the placeholders with your own files in the ./gallery folder.
    galleryImages: [
        { src: "./gallery/photo1.jpeg", width: 963, height: 1280 },
        { src: "./gallery/photo2.jpeg", width: 960, height: 1280 },
        { src: "./gallery/photo3.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo4.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo5.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo6.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo7.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo8.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo9.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo10.jpeg", width: 960, height: 1280 },
        { src: "./gallery/photo11.jpeg", width: 720, height: 1280 },
        { src: "./gallery/photo12.jpeg", width: 1224, height: 1539 },
        { src: "./gallery/photo13.jpeg", width: 900, height: 1581 },
        { src: "./gallery/photo14.jpeg", width: 1200, height: 1600 },
        { src: "./gallery/photo15.jpeg", width: 720, height: 1280 },
    ],
    // Button labels and key prompts; feel free to customize the wording.
    desc: {
        turn_on: "Turn On Lights",
        play: "Play Music",
        bannar_coming: "Add Color",
        balloons_flying: "Let the Balloons Fly",
        cake_fadein: "Where's the Cake?",
        light_candle: "Light the Candles",
        blow_hint: "Blow into the microphone to make a wish!",
        birthday_card: "Birthday Card",
        continue_gallery: "Continue",
        card_title: "Happy Birthday",
        story: "A MESSAGE FOR YOU",
    }
};
