export const createModal = () => {

  return `
  <html>

  <head>
    <style>

    @keyframes solve3-check-anim {
      0% {
        display: none;
        opacity: 0;
      }
      1% {
        display: block;
        opacity: 0;
        transform: scale(0);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

      .s3-001-solve3-modalWrapper {
        width: 280px;
        height: 410px;
        background-color: #ffffff;
        padding: 0px;
        z-index: 10000;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
      }
  
      .s3-001-solve3-background-image {
        width: 100%;
        height: 100%;
        transform: rotate(180deg);
        transform-origin: 50% 50%;
        /* background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27100%25%27%20height%3D%27100%25%27%20viewBox%3D%270%200%20800%20400%27%3E%3Crect%20fill%3D%27%23FAFAFA%27%20width%3D%27800%27%20height%3D%27400%27%2F%3E%3Cdefs%3E%3CradialGradient%20id%3D%27a%27%20cx%3D%27396%27%20cy%3D%27281%27%20r%3D%27514%27%20gradientUnits%3D%27userSpaceOnUse%27%3E%3Cstop%20%20offset%3D%270%27%20stop-color%3D%27%23BCBCBC%27%2F%3E%3Cstop%20%20offset%3D%271%27%20stop-color%3D%27%23FAFAFA%27%2F%3E%3C%2FradialGradient%3E%3ClinearGradient%20id%3D%27b%27%20gradientUnits%3D%27userSpaceOnUse%27%20x1%3D%27400%27%20y1%3D%27148%27%20x2%3D%27400%27%20y2%3D%27333%27%3E%3Cstop%20offset%3D%270%27%20%20stop-color%3D%27%23FFFFFF%27%20stop-opacity%3D%270%27%2F%3E%3Cstop%20offset%3D%271%27%20%20stop-color%3D%27%23FFFFFF%27%20stop-opacity%3D%270.5%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20fill%3D%27url%28%23a%29%27%20width%3D%27800%27%20height%3D%27400%27%2F%3E%3Cg%20fill-opacity%3D%270.4%27%3E%3Ccircle%20fill%3D%27url%28%23b%29%27%20cx%3D%27267.5%27%20cy%3D%2761%27%20r%3D%27300%27%2F%3E%3Ccircle%20fill%3D%27url%28%23b%29%27%20cx%3D%27532.5%27%20cy%3D%2761%27%20r%3D%27300%27%2F%3E%3Ccircle%20fill%3D%27url%28%23b%29%27%20cx%3D%27400%27%20cy%3D%2730%27%20r%3D%27300%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'); */
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27100%25%27%20height%3D%27100%25%27%20viewBox%3D%270%200%20800%20400%27%3E%3Crect%20fill%3D%27%23FFFFFF%27%20width%3D%27800%27%20height%3D%27400%27%2F%3E%3Cdefs%3E%3CradialGradient%20id%3D%27a%27%20cx%3D%27396%27%20cy%3D%27281%27%20r%3D%27514%27%20gradientUnits%3D%27userSpaceOnUse%27%3E%3Cstop%20%20offset%3D%270%27%20stop-color%3D%27%23BBBBBB%27%2F%3E%3Cstop%20%20offset%3D%271%27%20stop-color%3D%27%23FFFFFF%27%2F%3E%3C%2FradialGradient%3E%3ClinearGradient%20id%3D%27b%27%20gradientUnits%3D%27userSpaceOnUse%27%20x1%3D%27400%27%20y1%3D%27148%27%20x2%3D%27400%27%20y2%3D%27333%27%3E%3Cstop%20offset%3D%270%27%20%20stop-color%3D%27%23FFFFFF%27%20stop-opacity%3D%270%27%2F%3E%3Cstop%20offset%3D%271%27%20%20stop-color%3D%27%23FFFFFF%27%20stop-opacity%3D%270.5%27%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20fill%3D%27url%28%23a%29%27%20width%3D%27800%27%20height%3D%27400%27%2F%3E%3Cg%20fill-opacity%3D%270.3%27%3E%3Ccircle%20fill%3D%27url%28%23b%29%27%20cx%3D%27267.5%27%20cy%3D%2761%27%20r%3D%27300%27%2F%3E%3Ccircle%20fill%3D%27url%28%23b%29%27%20cx%3D%27532.5%27%20cy%3D%2761%27%20r%3D%27300%27%2F%3E%3Ccircle%20fill%3D%27url%28%23b%29%27%20cx%3D%27400%27%20cy%3D%2730%27%20r%3D%27300%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');    
        background-position: center bottom;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        border-radius: 15px;
        position: absolute;
      }
  
      .s3-001-solve3-closeButton {
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        opacity: 0.1;
        color: rgb(0, 0, 0);
        -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        padding: 0px 0px 0px 0px;
        z-index: 10000;
      }
  
      .s3-001-solve3-modalHeaderWrapper{
        position: relative;
      }
      .s3-001-solve3-modalHeader {
        width: 100%;
        height: 100%;
        display: table;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: flex;
      }
  
      .s3-001-solve3-modalLogoCell {
        display: table-cell;
        vertical-align: middle;
        width: 45px;
        cursor: pointer;

      }
  
      .s3-001-solve3-logo {
        width: 40px;
        margin-top: 6px;
      }
  
      .s3-001-solve3-headingWrapper {
        text-align: left;
        padding: 20px 0px 20px 0px;
      }
  
      .s3-001-solve3-heading {
        line-height: 1px;
        margin-top: 15px;
        margin-left: 10px;
      }
  
      .s3-001-solve3-headingMain {
        line-height: 0px;
        font-weight: bold;
        font-size: 22px;
        color: black;
        opacity: 0.7;
        margin-top: 10px;
      }
  
      .s3-001-solve3-headingSub {
        line-height: 0.1px;
        color: black;
        opacity: 0.7;
        font-size: 12.5px;
      }
  
      .s3-001-solve3-captchaImageWrapper {
        padding: 5px 25px 0px 25px;
        position: relative;
      }
  
      .s3-001-solve3-captcha-images {
        width: 200px;
        height: 250px;
        background-color: rgb(63, 15, 90);
        border-radius: 10px;
      }
  
      .s3-001-solve3-sliderWrapper {
        font-size: 13px;
        margin-top: 25px;
      }
  
      .s3-001-solve3-puzzle-complete {
        width: 180px;
        opacity: 0.6;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: absolute;
        left: 54%;
        margin: 0;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
      }
  
      .s3-001-solve3-slider {
        -webkit-appearance: none;
        /* Override default CSS styles */
        appearance: none;
        width: 210px;
        height: 20px;
        /* Specified height */
        background: CornflowerBlue;
        background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, .2) 20px, rgba(255, 255, 255, .2) 40px);
        /* Grey background */
        /* Remove outline */
        outline: none;
        opacity: 0.5;
        /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s;
        /* 0.2 seconds transition on hover */
        transition: opacity .2s;
        border-radius: 25px;
        position: absolute;
        left: 50%;
        margin: 0;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        box-shadow: 0px 0px 5px 1px rgba(3, 3, 3, 0.4);
      }
  
      /* Mouse-over effects */
      .s3-001-solve3-slider:hover {
        opacity: 0.6;
        /* Fully shown on mouse-over */
      }
  
      /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
      .s3-001-solve3-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        /* Override default look */
        appearance: none;
        outline: none;
        width: 28px;
        /* Set a specific slider handle width */
        height: 28px;
        /* Slider handle height */
        background: rgb(250, 250, 250);
        cursor: pointer;
        /* Cursor on hover */
        border-radius: 50%;
        -webkit-box-shadow: 0px 0px 5px 2px rgba(3, 3, 3, 0.3);
        box-shadow: 0px 0px 5px 2px rgba(3, 3, 3, 0.3);
      }
  
      .s3-001-solve3-slider::-moz-range-thumb {
        appearance: none;
        outline: none;
        width: 40px;
        /* Set a specific slider handle width */
        height: 40px;
        /* Slider handle height */
        background: rgb(250, 250, 250);
        cursor: pointer;
        /* Cursor on hover */
        border-radius: 50%;
        box-shadow: 0px 0px 5px 2px rgba(3, 3, 3, 0.3);
      }
  
      .s3-001-solve3-buttonWrapper {
        width: 200px;
        height: 30px;
        border-top: 1px solid #b9b9b9;
        margin-top: 20px;
        display: table;
        padding-top: 5px;
      }
  
      .s3-001-solve3-table {
        display: table;
        width: 190px;
        margin-top: 5px;
        opacity: 0.4;
      }
  
      .s3-001-solve3-tableRow {
        display: table-row;
      }
  
      .s3-001-solve3-tableCell {
        display: table-cell;
        text-align: left;
      }
  
      .s3-001-solve3-refreshButton {
        cursor: pointer;
        text-align: end;
      }
  
      .s3-001-solve3-earn {
        cursor: pointer;
        text-align: start;
      }
  
      .s3-001-solve3-refreshText {
        font-size: 10px;
      }
  
      .s3-001-solve3-checkModal {
        display: none;
        position: fixed;
        z-index: 100001;
        padding-top: 50px;
        left: 0;
        top: 0;
        width: 0%;
        height: 0%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 15px;
        transition: transform .3s ease-in-out, opacity .3s ease-in-out;
      }

      .s3-001-solve3-checkModal-active-green {
        display: block;
        position: fixed;
        z-index: 100001;
        padding-top: 50px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(38, 129, 82, 0.95);
        border-radius: 15px;
        animation: solve3-check-anim .3s ease-in-out;
      }

      .s3-001-solve3-checkModal-active-red {
        display: block;
        position: fixed;
        z-index: 100001;
        padding-top: 50px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(220, 75, 77, 0.95);
        border-radius: 15px;
        animation: solve3-check-anim .3s ease-in-out;
      }
  
      .s3-001-solve3-checkModalContent {
        background-color: transaparent;
        color: white;
        padding: 20px;
        width: 100%;
        height: 100%;
        font-size: 60px;
        opacity: 0.85;
      }

      .s3-001-solve3-solve3Red {
        color: red;
      }
  
      .s3-001-solve3-solve3Green {
        color: green;
      }

      .s3-001-solve3-solve3White {
        color: white;
      }
  
      .s3-001-solve3-solve3Big {
        font-size: 28px;
        font-weight: bold;
      }

      .s3-001-solve3-solve3Medium {
        font-size: 14px;
        font-weight: bold;
      }
  
      .s3-001-solve3-solve3Small {
        font-size: 12px;
      }
  
      .s3-001-solve3-smallOpacity {
        font-size: 12px;
        opacity: 0.7;
        line-height: 1px;
        margin-left: 20px;
      }
  
      .s3-001-solve3-footer {
        margin-top: 10px;
        opacity: 0.2;
        position: absolute;
        bottom: 10px;
        width: 100%;
        cursor: pointer;
      }
    </style>
  </head>
  
  <body>
    <div class="s3-001-solve3-modalWrapper">
    <div class="s3-001-solve3-background-image"></div>
      <div onclick="onClickHandlerClose()" class="s3-001-solve3-closeButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-circle-fill"
          viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      </div>
      <center>
        <div>
          <div class="s3-001-solve3-checkModal" id="solve3-check-modal">
            <div id="solve3-modal-content" class="s3-001-solve3-checkModalContent">
              <div class="s3-001-solve3-solve3Result">
                <div class="s3-001-solve3-solve3Small">loading..</div>
              </div>
            </div>
          </div>
          <div class="s3-001-solve3-modalHeaderWrapper">
            <div class="s3-001-solve3-modalHeader">
              <div class="s3-001-solve3-modalLogoCell" onclick="window.open('https://solve3.org', '_blank').focus()">
                <img src="https://files.solve3.org/img/solve3-logo-small-shadow.svg" class="s3-001-solve3-logo" />
              </div>
            </div>
          </div>
          <div class="s3-001-solve3-captchaImageWrapper">
            <div class="s3-001-solve3-captcha-images" id="solve3-captcha-images"></div>
            <div class="s3-001-solve3-table">
              <div class="s3-001-solve3-tableRow">
                <div class="s3-001-solve3-tableCell s3-001-solve3-earn s3-001-solve3-solve3Small">
                  Earn: <span id="solve3-earn-amount">0.00</span> SLV3
                </div>
                <div class="s3-001-solve3-tableCell s3-001-solve3-refreshButton s3-001-solve3-solve3Small" onclick="onRefresh()">
                  <span>Refresh </span> <span id="solve3-secs">(15s)</span>
                </div>
              </div>
            </div>
            <div class="s3-001-solve3-sliderWrapper" id="solve3-slider">
              <input class="s3-001-solve3-slider" type="range" min="0" max="1000" value="0" onpointerup="onSend()">
              <div class="s3-001-solve3-puzzle-complete s3-001-solve3-solve3Small">Slide to complete the puzzle</div>
            </div>
          </div>
          <div class="s3-001-solve3-footer s3-001-solve3-solve3Small" onclick="window.open('https://solve3.org', '_blank').focus()">
            Powered by Solve3.org
          </div>
      </center>
    </div>
  </body>
  
  </html>
  `
}


export const createSlider = () => {
  document.getElementById("solve3-slider").innerHTML =
    `<input oninput="onSlide(this.value)" 
       class="s3-001-solve3-slider" type="range"  min="0"  max="1000" value="0" onpointerup="onSend()">
    <div class="s3-001-solve3-solve3Small s3-001-solve3-puzzle-complete">Slide to complete the puzzle</div>`;
}


const styles = {
  "captchaImage":
    "width: 200px; \
    height: 250px; \
    color: black; \
    cursor: pointer; \
    -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.5); \
    ox-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.5); \
    border-radius: 10px; \
    -webkit-box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.5); \
      box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.5);",

  "puzzleImage":
    "-webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2); \
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2); \
    position: absolute; \
    left: 10px; \
    width: 40px; \
    height: 50px; \
    z-index: 10000;",
}

export const createImage = (data) => {
  document.getElementById("solve3-captcha-images").innerHTML = `
      <div onclick="window.open(${data.captchaData.url}, '_blank')" style=${jstr(styles.captchaImage + ` background-image: url(${data.captchaData.image})`)}></div>
      <div style=${jstr(styles.puzzleImage + ` top: ${data.captchaData.posY + 5}px; background-image: url(${data.captchaData.puzzle});`)} 
       id="solve3-puzzle"></div>`;
}

export const setEarnAmount = (amount) => {
  document.getElementById("solve3-earn-amount").innerHTML = amount;
}

const jstr = (string) => {
  return JSON.stringify(string);
}