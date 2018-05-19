/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_js_module_webgl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/js/module/webgl.js */ \"./src/js/module/webgl.js\");\n/* harmony import */ var _src_js_module_audio_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/js/module/audio.js */ \"./src/js/module/audio.js\");\n/* harmony import */ var _src_js_scene_pentagons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/js/scene/pentagons.js */ \"./src/js/scene/pentagons.js\");\n/* harmony import */ var _src_js_module_resize_watch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/js/module/resize-watch.js */ \"./src/js/module/resize-watch.js\");\n\n\n\n\n\nconst webgl = new _src_js_module_webgl_js__WEBPACK_IMPORTED_MODULE_0__[\"Webgl\"]();\n\nwindow.onload = function(){\n\n  \"use strict\";\n\n  webgl.audio = new _src_js_module_audio_js__WEBPACK_IMPORTED_MODULE_1__[\"Audio\"](webgl);\n  webgl.meshes.push(new _src_js_scene_pentagons_js__WEBPACK_IMPORTED_MODULE_2__[\"Pentagons\"](webgl));\n\n  webgl.meshes[0].setVisible(true);\n}\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/js/module/audio.js":
/*!********************************!*\
  !*** ./src/js/module/audio.js ***!
  \********************************/
/*! exports provided: Audio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Audio\", function() { return Audio; });\nclass Audio{\n  constructor(webgl){\n    this.webgl = webgl;\n    this.render_random();\n\n    this.loadAudio();\n\n    this.frequencyNum = 1024;\n  }\n\n  render_random(){\n    const _this = this;\n    (function animation(){\n      _this.webgl.render();\n      requestAnimationFrame(animation);\n    })();\n  }\n\n  loadAudio(){\n    const _this = this;\n\n    const btn = document.getElementById(\"soundIcon\");\n    btn.addEventListener(\"click\", () => {\n\n      _this.audioContext = (window.AudioContext) ? new AudioContext : new webkitAudioContext;\n      _this.analyze = this.audioContext.createAnalyser();\n      _this.analyze.fftSize = 2048;\n      _this.data = new Uint8Array(this.analyze.fftSize);\n\n      if (btn.classList.value == \"fas fa-music fa-2x\"){\n        _this.source.stop();\n        _this.render_random();\n      }else{\n        const request = new XMLHttpRequest();\n        request.open(\"GET\", \"data/mrpu.m4a\", true);\n        request.responseType = \"arraybuffer\"\n\n        request.onload = function(){\n          _this.audioContext.decodeAudioData(request.response, function(buffer){\n            if(_this.source){\n              _this.source.stop();\n            }\n            _this.source = _this.audioContext.createBufferSource();\n            _this.source.buffer = buffer;\n            _this.source.loop = true;\n            _this.source.connect(_this.analyze);\n            _this.source.connect(_this.audioContext.destination);\n\n            _this.source.start(0);\n\n            (function animation(){\n              _this.analyze.getByteFrequencyData(_this.data);\n\n              _this.webgl.render();\n\n              requestAnimationFrame(animation);\n            })();\n\n          });\n        }.bind(_this);\n        request.send();\n      }\n    });\n  };\n}\n\n\n//# sourceURL=webpack:///./src/js/module/audio.js?");

/***/ }),

/***/ "./src/js/module/resize-watch.js":
/*!***************************************!*\
  !*** ./src/js/module/resize-watch.js ***!
  \***************************************/
/*! exports provided: ResizeWatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResizeWatch\", function() { return ResizeWatch; });\nclass ResizeWatch{\n  constructor(){\n    this.instances = [];\n\n    this.width = this._width = document.body.clientWidth;\n    this.height = this._height = window.innerHeight;\n    this.aspect = this.width / this.height;\n\n    window.onresize = function(){\n      if(this.instances.length === 0) return;\n\n      this.width = document.body.clientWidth;\n      this.height = window.innerHeight;\n      this.aspect = this.width / this.height;\n\n      for(let i=0; i<this.instances.length; i++){\n        this.instances[i].resizeUpdate();\n      }\n    }.bind(this)\n  }\n\n  register(instance){\n    this.instances.push(instance);\n  }\n}\n\nwindow.ResizeWatch = new ResizeWatch();\n\n\n//# sourceURL=webpack:///./src/js/module/resize-watch.js?");

/***/ }),

/***/ "./src/js/module/webgl.js":
/*!********************************!*\
  !*** ./src/js/module/webgl.js ***!
  \********************************/
/*! exports provided: Webgl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Webgl\", function() { return Webgl; });\nclass Webgl{\n  constructor(){\n    this.btn = document.getElementById(\"soundIcon\");\n    this.init();\n  }\n\n  init(){\n    window.ResizeWatch.register(this);\n\n    this.scene = new THREE.Scene();\n\n    this.gui = new dat.GUI({audoPlace: false});\n    this.gui.close();\n    const customContainer = document.getElementById(\"guiContainer\");\n    customContainer.appendChild(this.gui.domElement);\n\n    this.setProps();\n\n    this.camera = new THREE.PerspectiveCamera(this.props.fov, this.props.aspect, this.props.near, this.props.far);\n\n    this.renderer = new THREE.WebGLRenderer({\n      canvas: document.querySelector(\"#canvas\")\n    })\n    this.renderer.setPixelRatio(window.devicePixelRatio);\n    this.renderer.setClearColor(0x000000, 1);\n    this.renderer.setSize(window.ResizeWatch.width, window.ResizeWatch.height);\n\n    this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);\n    this.control.enabled = true;\n\n    this.meshes = [];\n\n    this.resizeUpdate();\n  }\n\n  resizeUpdate(){\n    this.setProps();\n    this.renderer.setSize(this.props.width, this.props.height);\n    this.camera.aspect = this.props.aspect;\n  }\n\n  setProps(){\n    const width = window.ResizeWatch.width;\n    const height = window.ResizeWatch.height;\n    const aspect = width / height;\n\n    this.props = {\n      width: width,\n      height: height,\n      aspect: aspect,\n      fov: 45,\n      left: -width / 2,\n      right: width / 2,\n      top: height / 2,\n      bottom: -height / 2,\n      near: 0.1,\n      far: 10000,\n      parent: document.getElementById(\"wrapper\"),\n    };\n  };\n\n  render(){\n    if (this.btn.classList.value == \"fas fa-music fa-2x openNav\"){\n      for(let i=0; i<this.meshes.length; i++){\n        this.meshes[i].render();\n      }\n      this.renderer.render(this.scene, this.camera);\n    }else{\n      for(let i=0; i<this.meshes.length; i++){\n        this.meshes[i].render_random()\n      }\n      this.renderer.render(this.scene, this.camera);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/js/module/webgl.js?");

/***/ }),

/***/ "./src/js/scene/pentagons.js":
/*!***********************************!*\
  !*** ./src/js/scene/pentagons.js ***!
  \***********************************/
/*! exports provided: Pentagons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Pentagons\", function() { return Pentagons; });\nconst MAX_NUMBER = 30;\nlet uniforms;\n\nclass Pentagons{\n  constructor(webgl){\n    this.webgl = webgl;\n    this.setGUI();\n    uniforms = new Array(this.parameter.number);\n\n    for(let i=0; i<MAX_NUMBER; i++){\n      uniforms[i] = {\n        time: {type: \"f\", value: 1.0},\n        frequency: {type: \"f\", value: 1.0},\n        num: {type: \"f\", value: i}\n      };\n    }\n\n    this.vertShader = [\"glsl/pentagons.vert\"]\n    this.fragShader = [\"glsl/pentagons.frag\"]\n\n    this.shaderLength = this.vertShader.length + this.fragShader.length;\n    this.shaderCount = 0;\n\n    for(let i=0; i<this.vertShader.length; i++){\n      this.importVert(i);\n    }\n    for(let i=0; i<this.fragShader.length; i++){\n      this.importFrag(i);\n    }\n  }\n\n  importVert(idx){\n    const _this = this;\n    const myRequest = new XMLHttpRequest();\n    myRequest.onreadystatechange = function(){\n      if(myRequest.readyState === 4){\n        _this.vertShader[idx] = myRequest.response;\n        _this.completeImport();\n      }\n    };\n    myRequest.open(\"GET\", _this.vertShader[idx], true);\n    myRequest.send();\n  };\n\n  importFrag(idx){\n    const _this = this;\n    const myRequest = new XMLHttpRequest();\n    myRequest.onreadystatechange = function(){\n      if(myRequest.readyState === 4){\n        _this.fragShader[idx] = myRequest.response;\n        _this.completeImport();\n      }\n    };\n    myRequest.open(\"GET\", this.fragShader[idx], true);\n    myRequest.send();\n  };\n\n  completeImport(){\n    this.shaderCount++;\n\n    if(this.shaderCount == this.shaderLength){\n      this.init();\n    }\n  }\n\n  setGUI(){\n    this.parameter = new Parameter_pentagons();\n    this.folder = this.webgl.gui.addFolder(\"Pentagons\");\n    this.folder.add(this.parameter, \"number\", 1, MAX_NUMBER, 1);\n    this.folder.close();\n  }\n\n  setVisible(select){\n    if(select){\n      this.webgl.control.enabled = false;\n      this.webgl.camera.position.set(0, 0, 30);\n      this.webgl.camera.rotation.set(0, 0, 0);\n      this.folder.open();\n    }else{\n      this.folder.close();\n    }\n  }\n\n  init(){\n    const geometry = this.createGeometry();\n\n    const rotateOffset = Math.PI * 1 / 10;\n    const pos = [0];\n    for(let i=0; i<MAX_NUMBER; i++){\n      const material = new THREE.ShaderMaterial({\n        uniforms: uniforms[i],\n        vertexShader: this.vertShader[0],\n        fragmentShader: this.fragShader[0],\n      });\n      const mesh = new THREE.Mesh(geometry, material);\n      mesh.rotation.z = Math.PI * i + rotateOffset;\n      let scale;\n      if(i == 0){\n        scale = 1;\n      }else{\n        scale = Math.pow(Math.sin(54 / 180 * Math.PI), i);\n      }\n      mesh.scale.set(scale, scale, scale);\n      this.webgl.scene.add(mesh);\n    }\n\n    this.startTime = Date.now();\n  }\n\n  createGeometry(){\n    const geometry = new THREE.Geometry();\n\n    const vertices = [];\n    const faces = [];\n    const split = 5;\n    const theta = 360 / split;\n    const radian = Math.PI * theta / 180;\n    const size = 8;\n\n    vertices.push(new THREE.Vector3(0, 0, 0));\n    for(let i=0; i<split; i++){\n      const x = Math.cos(radian * i) * size;\n      const y = Math.sin(radian * i) * size;\n      vertices.push(new THREE.Vector3(x, y, 0));\n    }\n\n    for(let i=0; i<= split; i++){\n      let index;\n      if(i < split){\n        index = new THREE.Face3(0, i + 1, i + 2);\n      }else{\n        index = new THREE.Face3(0, i, 1);\n      }\n      faces.push(index);\n\n      geometry.vertices = vertices;\n      geometry.faces = faces;\n    }\n\n    return geometry;\n  }\n\n  render(){\n    for(let i=0; i<this.parameter.number; i++){\n      uniforms[i].frequency.value = this.webgl.audio.data[Math.floor(1024 / this.parameter.number * (i + 1))];\n    }\n    for(let i=this.parameter.number; i<MAX_NUMBER; i++){\n      uniforms[i].frequency.value = 0.0;\n    }\n  }\n\n  render_random(){\n    for(let i=0; i<this.parameter.number; i++){\n      uniforms[i].frequency.value = Math.sin(0.001 * i * (Date.now() - this.startTime)) * 100;\n    }\n    for(let i=this.parameter.number; i<MAX_NUMBER; i++){\n      uniforms[i].frequency.value = 0.0;\n    }\n  }\n}\n\nconst Parameter_pentagons = function(){\n  this.number = 15;\n}\n\n\n//# sourceURL=webpack:///./src/js/scene/pentagons.js?");

/***/ })

/******/ });