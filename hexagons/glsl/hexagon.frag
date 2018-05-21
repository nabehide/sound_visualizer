// precision mediump float;
uniform float time;
uniform float frequency;
uniform float num;
varying vec3 pos;
void main(){
  gl_FragColor = vec4(0.0, 0.0, frequency / 100., 1.);
}
