export class Audio{
  constructor(webgl, dataPath){
    this.webgl = webgl;
    this.dataPath = dataPath;
    this.render_random();

    this.loadAudio();

    this.frequencyNum = 1024;
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

    const btn = document.getElementById("soundIcon");
    btn.addEventListener("click", () => {

      _this.audioContext = (window.AudioContext) ? new AudioContext : new webkitAudioContext;
      _this.analyze = this.audioContext.createAnalyser();
      _this.analyze.fftSize = 2048;
      _this.data = new Uint8Array(this.analyze.fftSize);

      if (btn.classList.value == "far fa-2x fa-play-circle"){
        _this.source.stop();
        _this.render_random();
      }else{
        const request = new XMLHttpRequest();
        request.open("GET", this.dataPath, true);
        request.responseType = "arraybuffer"

        request.onload = function(){
          _this.audioContext.decodeAudioData(request.response, function(buffer){
            if(_this.source){
              _this.source.stop();
            }
            _this.source = _this.audioContext.createBufferSource();
            _this.source.buffer = buffer;
            _this.source.loop = true;
            _this.source.connect(_this.analyze);
            _this.source.connect(_this.audioContext.destination);

            _this.source.start(0);

            (function animation(){
              _this.analyze.getByteFrequencyData(_this.data);

              _this.webgl.render();

              requestAnimationFrame(animation);
            })();

          });
        }.bind(_this);
        request.send();
      }
    });
  };
}
