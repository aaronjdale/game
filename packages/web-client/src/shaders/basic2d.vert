#version 300 es
 
in vec2 a_position;

uniform vec2 u_resolution;
uniform mat3 u_world;

void main() {
  vec2 position = (u_world * vec3(a_position,1.0)).xy;

  vec2 zeroToOne = position / u_resolution;
  vec2 clipSpace = (zeroToOne * 2.0) - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}