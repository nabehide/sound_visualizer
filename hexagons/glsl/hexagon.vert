uniform float time;
uniform float frequency;
uniform float num;

void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
