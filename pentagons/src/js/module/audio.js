export class Audio{
  constructor(webgl){
    this.webgl = webgl;
    this.audioContext = (window.AudioContext) ? new AudioContext : new webkitAudioContext;
    this.render_random();

    this.loadAudio();

    this.analyze = this.audioContext.createAnalyser();
    this.analyze.fftSize = 2048;
    this.frequencyNum = 1024;

    this.data = new Uint8Array(this.analyze.fftSize);
  }

  render_random(){
    const _this = this;
    (function animation(){
      _this.webgl.render();
      requestAnimationFrame(animation);
    })();
  }

  loadAudio(){
    const _this = this;

    this.sendRequest();

    const btn = document.getElementById("soundIcon");
    btn.addEventListener("click", () => {
      if (btn.classList.value == "fas fa-music fa-2x"){
        _this.source.stop();
        _this.sendRequest();
        _this.render_random();
      }else{
        _this.source.start(0);

        (function animation(){
          _this.analyze.getByteFrequencyData(_this.data);

          _this.webgl.render();

          requestAnimationFrame(animation);
        })();
      }
    });
  };

  sendRequest(){
    const _this = this;
    const request = new XMLHttpRequest();
    request.open("GET", "data/mrpu.m4a", true);
    request.responseType = "arraybuffer"

    request.onload = function(){
      _this.audioContext.decodeAudioData(request.response, function(buffer){
        _this.connectNode(buffer);
      });
    }.bind(this);

    request.send();

  }

  connectNode(buffer){
    if(this.source){
      this.source.stop();
    }
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true;
    this.source.connect(this.analyze);
    this.source.connect(this.audioContext.destination);
  }
}
