## Happy Birthday

> <b>Edit the config.js settings to build a wonderfully creative birthday web page for someone you love. If you enjoy it, please fork or star!</b>

<img src="https://github.com/AJLoveChina/loveBalloon/blob/master/static/github-star.png" />

## TODO
* [x] Pair each line of wishes with an image
* [ ] Support rotating images

### config.js Notes
> Friendly reminder: end every sentence, image path, and button label with an **English comma**!
```text
var config = {
    // The sentences can be any length; add as many as you like.
    // Try to keep each sentence under 15 characters so the layout stays tidy.
    texts: [
        "For me",
        "My beloved cutie",
        "Today is your birthday",
        "This is our",
        "third birthday together",
        "Last year's birthday",
        "I still remember eating at Wang Po Skewers",
        "This year we'll eat something even better",
        "I'll feed my adorable little piggy until she's full",
        "Then I'll carry you away",
        "YAMI~~",
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
```


## Screenshot Demo
<img src="./assets/birthday-demo2.gif"/>

## Microphone Tips
- Allow microphone access when the candles light up so the page can detect the "blow".
- If access is denied or unavailable, the experience continues automatically after a short delay.

## Card & Gallery Flow
- After the candles go out, the Birthday Card button opens a modal you can style or personalise.
- The Continue button launches a scrolling gallery of 15 placeholder photos; replace the data URLs in code with your own images when you're ready.
- Once the gallery finishes scrolling, the message sequence plays automatically.
- The honoree's name appears beneath the Happy Birthday banner after you click “Add Color”; update the `<h1 id="honoree_name" class="honoree-name">` in `index.html` to change the wording or styling.
- The “Birthday Card” button opens the bundled card experience (`external/HappyBirthday/index.html`) in a new browser tab so the main flow stays intact.

## Gallery Images
- Drop your photos into the `./gallery/` folder; portrait shots are welcome.
- Update `config.js -> galleryImages` using objects that include the `src`, `width`, and `height` so each image keeps its native aspect ratio (e.g. `{ src: "./gallery/beach.jpeg", width: 960, height: 1280 }`).
- `.jpeg` and `.jpg` extensions both work. Empty slots are filled with colourful placeholders until you add more files.

## Netlify Deployment
1. Install dependencies (none required) and ensure the project root is the publish directory.
2. Upload or link this repository to Netlify; set the build command to `None` and publish directory to `.`.
3. The included `netlify.toml` adds a friendly `/birthday-card` redirect that points to the bundled card experience in `external/HappyBirthday/index.html`.

## Zhihu Tutorial
[https://zhuanlan.zhihu.com/p/85899661](https://zhuanlan.zhihu.com/p/85899661)

## Closing
If you like the project, follow [BaDu Aotian](https://github.com/ajlovechina)!  \
New templates for love notes, resumes, study notes, PDF books, and original deep-dive tech posts are added regularly. :heart:

* Zhihu: [BaDu Aotian](https://www.zhihu.com/people/AJLoveChina)
* GitHub: [BaDu Aotian](https://github.com/ajlovechina)

## QA
> How do I change the music?
> 
> Replace the `assets/hbd.mp3` file with your own MP3. Make sure the filename stays exactly the same!


## Links
* [Episode 1: Love Tree - Preserve every cherished moment (WeChat and QQ friendly)](https://github.com/AJLoveChina/LoveTree)
* [Episode 2: Customize the data to create a super creative birthday greeting (Happy Birthday)](https://github.com/AJLoveChina/birthday)
* [Episode 3: Along the Seine, balloons carry my love into your heart.](https://github.com/AJLoveChina/loveBalloon)
