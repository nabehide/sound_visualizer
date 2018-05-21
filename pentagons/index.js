import {Webgl} from '../js/module/webgl.js';
import {Audio} from '../js/module/audio.js';
import {ResizeWatch} from '../js/module/resize-watch.js';
import {Pentagons} from "./src/js/scene/pentagons.js";


window.onload = function(){

  "use strict";

  const webgl = new Webgl();
  webgl.audio = new Audio(webgl, "data/mrpu.m4a");
  webgl.meshes.push(new Pentagons(webgl));

  webgl.meshes[0].setVisible(true);
}
