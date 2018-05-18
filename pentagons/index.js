import {Webgl} from './src/js/module/webgl.js';
import {Audio} from './src/js/module/audio.js';
import {Pentagons} from "./src/js/scene/pentagons.js";
import {ResizeWatch} from './src/js/module/resize-watch.js';

const webgl = new Webgl();

window.onload = function(){

  "use strict";

  webgl.audio = new Audio(webgl);
  webgl.meshes.push(new Pentagons(webgl));

  webgl.meshes[0].setVisible(true);
}
