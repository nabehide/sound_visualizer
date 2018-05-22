const split = 6;
const size = 2;

const MAX_NUMBER = 10000;
let uniforms;

Array.prototype.shuffle = function() {
  var i = this.length;
  while(i){
    var j = Math.floor(Math.random()*i);
    var t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
}

export class Hexagon{
  constructor(webgl){
    this.webgl = webgl;
    this.setGUI();
    uniforms = new Array(MAX_NUMBER);

    for(let i=0; i<MAX_NUMBER; i++){
      uniforms[i] = {
        time: {type: "f", value: 1.0},
        frequency: {type: "f", value: 1.0},
        num: {type: "f", value: i},
        red: {type: "f", value: 0.0},
        green: {type: "f", value: 0.0},
        blue: {type: "f", value: 1.0},
        alpha: {type: "f", value: 1.0}
      };
    }

    this.vertShader = ["glsl/hexagon.vert"]
    this.fragShader = ["glsl/hexagon.frag"]

    this.shaderLength = this.vertShader.length + this.fragShader.length;
    this.shaderCount = 0;

    for(let i=0; i<this.vertShader.length; i++){
      this.importVert(i);
    }
    for(let i=0; i<this.fragShader.length; i++){
      this.importFrag(i);
    }
  }

  importVert(idx){
    const _this = this;
    const myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
      if(myRequest.readyState === 4){
        _this.vertShader[idx] = myRequest.response;
        _this.completeImport();
      }
    };
    myRequest.open("GET", _this.vertShader[idx], true);
    myRequest.send();
  };

  importFrag(idx){
    const _this = this;
    const myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function(){
      if(myRequest.readyState === 4){
        _this.fragShader[idx] = myRequest.response;
        _this.completeImport();
      }
    };
    myRequest.open("GET", this.fragShader[idx], true);
    myRequest.send();
  };

  completeImport(){
    this.shaderCount++;

    if(this.shaderCount == this.shaderLength){
      this.init();
    }
  }

  setGUI(){
    this.parameter = new Parameter_Hexagon();
    this.folder = this.webgl.gui.addFolder("Hexagon");
    // this.folder.add(this.parameter, "row", 1, Math.sqrt(MAX_NUMBER), 1);
    // this.folder.add(this.parameter, "column", 1, Math.sqrt(MAX_NUMBER), 1);
    this.folder.add(this.parameter, "camera", 10, 100, 1);
    this.folder.add(this.parameter, "red", 0.0, 1.0);
    this.folder.add(this.parameter, "green", 0.0, 1.0);
    this.folder.add(this.parameter, "blue", 0.0, 1.0);
    this.folder.add(this.parameter, "alpha", 0.0, 1.0);
    this.folder.close();
  }

  setVisible(select){
    if(select){
      this.webgl.control.enabled = false;
      this.webgl.camera.position.set(0, 0, this.parameter.camera);
      this.webgl.camera.rotation.set(0, 0, 0);
      this.folder.open();
    }else{
      this.folder.close();
    }
  }

  init(){
    const geometry = this.createGeometry();

    const rotateOffset = Math.PI * 90 / 180;
    for(let i=0; i<MAX_NUMBER; i++){
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms[i],
        vertexShader: this.vertShader[0],
        fragmentShader: this.fragShader[0],
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.rotation.z = rotateOffset;

      const r = Math.floor(i / this.parameter.column);
      const c = (i % this.parameter.column);
      mesh.position.x = size * 2 * c - size * (r % 2) - this.parameter.column;
      mesh.position.y = size * 2 * r - this.parameter.row;

      this.webgl.scene.add(mesh);
    }

    this.list = new Array(MAX_NUMBER);
    for(let i=0; i<this.list.length; i++){
      this.list[i] = i;
    }
    this.list.shuffle();

    this.startTime = Date.now();
  }

  createGeometry(){
    const geometry = new THREE.Geometry();

    const vertices = [];
    const faces = [];
    const theta = 360 / split;
    const radian = Math.PI * theta / 180;

    vertices.push(new THREE.Vector3(0, 0, 0));
    for(let i=0; i<split; i++){
      const x = Math.cos(radian * i) * size;
      const y = Math.sin(radian * i) * size;
      vertices.push(new THREE.Vector3(x, y, 0));
    }

    for(let i=0; i<= split; i++){
      let index;
      if(i < split){
        index = new THREE.Face3(0, i + 1, i + 2);
      }else{
        index = new THREE.Face3(0, i, 1);
      }
      faces.push(index);

      geometry.vertices = vertices;
      geometry.faces = faces;
    }

    return geometry;
  }

  render(){
    this.webgl.camera.position.set(0, 0, this.parameter.camera);
    for(let i=0; i<this.parameter.column * this.parameter.row; i++){
      uniforms[this.list[i]].frequency.value = this.webgl.audio.data[Math.floor(1024 / (this.parameter.column * this.parameter.row) * (i + 1))];
    }
    this.render_common();
  }

  render_random(){
    this.webgl.camera.position.set(0, 0, this.parameter.camera);
    for(let i=0; i<this.parameter.column * this.parameter.row; i++){
      uniforms[i].frequency.value = Math.sin(0.000003 * i * (Date.now() - this.startTime)) * 100;
    }
    this.render_common();
  }

  render_common(){
    for(let i=this.parameter.column * this.parameter.row; i<MAX_NUMBER; i++){
      uniforms[this.list[i]].frequency.value = 0.0;
    }
    for(let i=0; i<this.parameter.column * this.parameter.row; i++){
      uniforms[i].red.value = this.parameter.red;
      uniforms[i].green.value = this.parameter.green;
      uniforms[i].blue.value = this.parameter.blue;
      uniforms[i].alpha.value = this.parameter.alpha;
    }
  }
}

const Parameter_Hexagon = function(){
  this.column = 100;
  this.row = 100;
  this.camera = 30;
  this.red = 0.0;
  this.green = 0.0;
  this.blue = 1.0;
  this.alpha = 1.0;
}
