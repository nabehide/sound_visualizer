import {Webgl} from '../js/module/webgl.js';
import {Audio} from '../js/module/audio.js';
import {ResizeWatch} from '../js/module/resize-watch.js';
import {Hexagon} from "./src/js/scene/hexagon.js";


window.onload = function(){

  "use strict";

  const webgl = new Webgl();
  webgl.audio = new Audio(webgl, "./data/mece.m4a");
  webgl.meshes.push(new Hexagon(webgl));

  webgl.meshes[0].setVisible(true);
}
