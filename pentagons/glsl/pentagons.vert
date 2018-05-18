uniform float time;
uniform float frequency;
uniform float num;

vec4 rand(vec2 A, vec2 B, vec2 C, vec2 D){
  vec2 s=vec2(12.9898, 78.233);
  vec4 tmp = vec4(dot(A,s),dot(B,s),dot(C,s),dot(D,s));
  return fract(sin(tmp) * 43758.5453) * 2.0 - 1.0;
}

float noise(vec2 coord, float d){
  vec2 C[4];
  float d1 = 1.0 / d;
  C[0]=floor(coord*d)*d1;
  C[1]=C[0]+vec2(d1,0.0);
  C[2]=C[0]+vec2(d1,d1);
  C[3]=C[0]+vec2(0.0,d1);

  vec2 p=fract(coord*d);
  vec2 q=1.0-p;
  vec4 w=vec4(q.x*q.y,q.x*q.y,q.x*q.y,q.x*q.y);
  return dot(vec4(rand(C[0], C[1], C[2], C[3])), w);
}

void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
