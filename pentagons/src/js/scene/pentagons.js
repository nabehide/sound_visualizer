const MAX_NUMBER = 30;
let uniforms;

export class Pentagons{
  constructor(webgl){
    this.webgl = webgl;
    this.setGUI();
    uniforms = new Array(this.parameter.number);

    for(let i=0; i<MAX_NUMBER; i++){
      uniforms[i] = {
        time: {type: "f", value: 1.0},
        frequency: {type: "f", value: 1.0},
        num: {type: "f", value: i}
      };
    }

    this.vertShader = ["glsl/pentagons.vert"]
    this.fragShader = ["glsl/pentagons.frag"]

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
    this.parameter = new Parameter_pentagons();
    this.folder = this.webgl.gui.addFolder("Pentagons");
    this.folder.add(this.parameter, "number", 1, MAX_NUMBER, 1);
    this.folder.close();
  }

  setVisible(select){
    if(select){
      this.webgl.control.enabled = false;
      this.webgl.camera.position.set(0, 0, 30);
      this.webgl.camera.rotation.set(0, 0, 0);
      this.folder.open();
    }else{
      this.folder.close();
    }
  }

  init(){
    const geometry = this.createGeometry();

    const rotateOffset = Math.PI * 1 / 10;
    const pos = [0];
    for(let i=0; i<MAX_NUMBER; i++){
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms[i],
        vertexShader: this.vertShader[0],
        fragmentShader: this.fragShader[0],
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.z = Math.PI * i + rotateOffset;
      let scale;
      if(i == 0){
        scale = 1;
      }else{
        scale = Math.pow(Math.sin(54 / 180 * Math.PI), i);
      }
      mesh.scale.set(scale, scale, scale);
      this.webgl.scene.add(mesh);
    }

    this.startTime = Date.now();
  }

  createGeometry(){
    const geometry = new THREE.Geometry();

    const vertices = [];
    const faces = [];
    const split = 5;
    const theta = 360 / split;
    const radian = Math.PI * theta / 180;
    const size = 8;

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
    for(let i=0; i<this.parameter.number; i++){
      uniforms[i].frequency.value = this.webgl.audio.data[Math.floor(1024 / this.parameter.number * (i + 1))];
    }
    for(let i=this.parameter.number; i<MAX_NUMBER; i++){
      uniforms[i].frequency.value = 0.0;
    }
  }

  render_random(){
    for(let i=0; i<this.parameter.number; i++){
      uniforms[i].frequency.value = Math.sin(0.001 * i * (Date.now() - this.startTime)) * 100;
    }
    for(let i=this.parameter.number; i<MAX_NUMBER; i++){
      uniforms[i].frequency.value = 0.0;
    }
  }
}

const Parameter_pentagons = function(){
  this.number = 15;
}
