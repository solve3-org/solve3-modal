import pWaitFor from 'p-wait-for';
import example from './data/example.json';

import { createImage, createModal, createSlider, setEarnAmount } from './Html';

var dev = false;

require('isomorphic-fetch');

const WebSocket = require('isomorphic-ws');
const EventEmitter = require('events');
const ethers = require('ethers');

class Solve3Modal extends EventEmitter {

  socket; error; secInterval; verified; msg; solution;
  modal; checkModal;

  data;

  logDev(a, b) {
    if (dev) console.log(a, b);
  }

  constructor(obj) {
    super();
    this.socket = obj;

    document.body.insertAdjacentHTML('beforeend', `<div class='solve3-modal' id="solve3-modal"></div>`);
    if (obj.dev) {
      dev = true;
      this.onLoad();
    }
    this.logDev("constructor", "done")
  }

  timeout2 = {
    timeout: {
      milliseconds: 2000,
      fallback: () => {
        console.log('Time’s up! executed the fallback function! (2)');
        console.log("Solve3 timeout")
      },
    }
  }

  timeout10 = {
    timeout: {
      milliseconds: 10000,
      fallback: () => {
        console.log('Time’s up! executed the fallback function! (1)');
        console.log("Solve3 timeout")
      },
    }
  }

  async checkSocket() {
    this.logDev("checksocket", this.socket)
    if (this.socket.readyState !== 1) {
      this.logDev("checksocket", "not connected")
      this.socket = window.getConnectedWs();
      return await pWaitFor(() => {
        console.log("wait for socket")
        return (this.socket.readyState === 1)
      }, this.timeout10)
    }
    return;
  }

  async init(obj) {
    this.logDev("init", obj);
    this.error = undefined;
    await this.checkSocket();
    if (!dev || true) {
      var payload = {
        "account": obj.account,
        "destination": obj.contract,
        "network": obj.network
      }

      this.socket.send(str("handshake", payload));

      await pWaitFor(() => {
        console.log("wait for handshake")
        return (this.data != undefined && (this.data.handshake != undefined || this.error != undefined))
      }, this.timeout2)

      if (this.error || this.data.error) {
        this.emit("error", this.error || this.data.error)
        return;
      }
    } else {
      this.data = example;
    }
    this.logDev("init data", this.data);
    this.socket.close();
    return this.data.handshake.toSign;
  }

  setData(d) {
    this.data = d;
  }

  async open(msg) {
    this.logDev("open", msg)
    await this.checkSocket();
    this.msg = msg;
    if (document.getElementById("solve3-modal").innerHTML !== "" && document.getElementById("solve3-modal").innerHTML !== 'undefined') this.removeContent();
    try {
      if (ethers.utils.isAddress(this.data.handshake.account)
        && ethers.utils.isAddress(this.data.handshake.destination) && msg) {
        this.onLoad();
      } else {
        this.emit("error", "signed msg or account or contract incorrect")
      }
    } catch (error) {
      this.emit("error", error)
    }
  }

  onClose = () => {
    if (this.secInterval) clearInterval(this.secInterval);
    this.modal.style.display = "none";
  }

  loadCaptcha = async () => {
    await this.checkSocket();
    if (this.secInterval) clearInterval(this.secInterval);

    if (dev && false) {
      this.data = example;
    } else {
      this.data.captchaData = undefined;
      this.data.solution = 0;
      this.data.error = undefined;

      this.data.signedMsg = this.msg;

      this.socket.send(str("getCaptchaData", this.data));

      await pWaitFor(() => {
        console.log("wait for captchadata")
        return (this.data.captchaData != undefined || this.error != undefined)
      }, this.timeout10)
    }

    this.secInterval = this.createSecInterval();
    this.logDev("loadcaptcha", this.data)
  }

  clearSecInterval = () => {
    clearInterval(this.secInterval);
  }

  onLoad = async () => {
    this.logDev("onload", "")
    await this.loadCaptcha();
    this.modal = document.getElementById("solve3-modal");
    this.modal.innerHTML = createModal();
    this.modal.style.display = "block";
    this.checkModal = document.getElementById("solve3-check-modal");
    createSlider();
    createImage(this.data);
  }

  onRefresh = async () => {
    this.logDev("onrefresh", "")
    if (document.getElementById("solve3-secs"))
    document.getElementById("solve3-secs").innerHTML = "(15s)";
    await this.loadCaptcha();
    if (document.getElementById("solve3-slider"))
      createSlider();
    if (document.getElementById("solve3-captcha-images"))
      createImage(this.data);
    if (document.getElementById('solve3-modal-content'))
      document.getElementById('solve3-modal-content').innerHTML = ""
    this.loadEarnings(this.data.captchaData.amount);
    return;
  }

  createSecInterval = () => {
    var i = 14;
    var interval = setInterval(function () {
      document.getElementById("solve3-secs").innerHTML = "(" + i + "s)";
      i--;
      if (i < 0) {
        this.onRefresh();
        // clearInterval(secInterval);
      }
    }, 1000);
    return interval;
  }

  secTimer(time, elem, func) {
    var i = time;
    var that = this;
    var doc = document;
    var myInterval = setInterval(function () {
      doc.getElementById(elem).innerHTML = "(" + i + "s)";
      i--;
      if (i < 0) {
        that.showResultModal(false, false);
        func();
        clearInterval(myInterval);
      }
    }, 1000);
  }

  async validate() {
    this.logDev("validate", "")
    await this.checkSocket();
    if (!dev || true) {
      this.socket.send(str("validate", this.data));

      this.data.verified = undefined;

      await pWaitFor(() => {
        console.log("wait for validate")
        return (this.data.verified != undefined)
      }, this.timeout10)
    } else {
      if (this.data.solution == 120) {
        this.data.verified = true;
      } else {
        this.data.verified = false;
      }
    }
    this.logDev("validate data", this.data)
    return this.data;
  }

  setSolution = (solution) => {
    this.data.solution = solution;
  }

  sendSolution = async () => {
    await this.checkSocket();
    if (this.secInterval) {
      clearInterval(this.secInterval);
    }

    try {
      let result = await this.validate(this.data)

      if (result.verified) {
        this.showResultModal(true, true);
        document.getElementById('solve3-modal-content').innerHTML = `<div class="s3-001-solve3-solve3White"><span class="s3-001-solve3-solve3Big">${this.checkMark}<br />Success</span></div><div class="s3-001-solve3-solve3Medium">Transaction will be executed<br />Window closes automatically. <span id="solve3-countdown">(3s)</span></div`
        window.onSuccess(result)
        this.secTimer(2, "solve3-countdown", () => { window.onClickHandlerClose() });
      } else {
        this.showResultModal(true, false);
        document.getElementById('solve3-modal-content').innerHTML = `<div class="s3-001-solve3-solve3White"><span class="s3-001-solve3-solve3Big">${this.crossMark}<br />Failed</span></div><div class="s3-001-solve3-solve3Medium"><br />Please try again. <span id="solve3-countdown">(2s)</span></div>`
        this.secTimer(1, "solve3-countdown", () => { window.onRefresh() });
      }
    } catch (error) {
      console.log(error);
    }
  }

  loadEarnings = async (wei) => {
    this.logDev("earnings", wei)
    if (!wei) wei = ethers.utils.parseEther('0.00');
    let amount = ethers.utils.formatEther(wei, { pad: true })
    setEarnAmount(parseFloat(amount).toFixed(2));
  }

  onSuccess(obj) {
    this.emit("success", obj.proof);
  }

  showResultModal(open, success) {
    if (!open) this.checkModal.className = "s3-001-solve3-checkModal";
    if (open && success) this.checkModal.className = "s3-001-solve3-checkModal-active-green";
    if (open && !success) this.checkModal.className = "s3-001-solve3-checkModal-active-red";
  }

  checkMark = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>`

  crossMark = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
 <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
 <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`
}


// const ws = new WebSocket.default('wss://api.solve3.org:4004');
const getSocketConnection = () => {
  console.log("get socket connection")
  return new WebSocket.default('wss://api.solve3.org:5001')
}

var ws = getSocketConnection();

function init() {
  ws.onopen = function open() {
    // ws.send(str("handshake", {}));
    console.log("connected to ws")
  };

  ws.onclose = function close() {
    console.log('disconnected');
  };

  ws.onmessage = function incoming(response) {
    console.log("message incoming")
    var data = response.data;
    const dataObj = JSON.parse(data.toString());
    switch (dataObj.type) {
      case "pong":
        console.log("pong");
        break;
      case "re-handshake":
        solve3.setData(dataObj.data);
        break;
      case "captchaData":
        console.log("got captcha data")
        solve3.setData(dataObj.data)
        break;
      case "re-validate":
        solve3.setData(dataObj.data);
        break;
      case "error":
        solve3.setData(dataObj.data);
        console.error(dataObj);
        break;
      case "default":
        console.log("default");
        break;
    }
  };
}

init();

var solve3 = new Solve3Modal(ws);

window.getConnectedWs = () => {
  console.log("getconnectedws", ws.readyState);
  if (ws.readyState !== 1) {
    ws = getSocketConnection();
    init();
  }

  console.log("0.0")
  return ws;
}

window.onbeforeunload = function (e) {
  ws.close()
};

window.onClickHandlerClose = () => {
  solve3.onClose();
  removeContent();
}

window.onSlide = (value) => {
  var val = parseInt(value / 10 * 2)
  var pos = 10 + val;
  solve3.setSolution(parseInt(val) - 30);
  document.getElementById("solve3-puzzle").style.left = pos.toString() + "px";
}

window.onSend = () => {
  console.log("send")
  solve3.sendSolution();
}

window.onRefresh = () => {
  solve3.onRefresh();
}


window.onSuccess = function (obj) {
  solve3.onSuccess(obj)
}

const str = (type, obj) => {
  return JSON.stringify({ ...obj, type: type });
}

const removeContent = () => {
  document.getElementById("solve3-modal").innerHTML = "";
}


export default solve3;