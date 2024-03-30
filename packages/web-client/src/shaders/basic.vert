#version 300 es

precision mediump float;
 
in vec4 a_position;
in vec4 a_color;

out vec4 v_color;

uniform mat4 u_world;
uniform mat4 u_projection;

void main() {
  v_color = a_color;
  gl_Position = u_projection * u_world * a_position;
}