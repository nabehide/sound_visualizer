// precision mediump float;
uniform float time;
uniform float frequency;
uniform float num;
varying vec3 pos;

uniform float red;
uniform float green;
uniform float blue;
uniform float alpha;

void main(){
  gl_FragColor = vec4(red * frequency / 100., green * frequency / 100., blue * frequency / 100., alpha);
}
