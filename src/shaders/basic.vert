#version 300 es
precision mediump float;

in vec3 a_position;
in vec4 a_colour;
in vec2 a_texCoord;

uniform mat4 u_worldMatrix;
uniform mat4 u_projectionMatrix;
uniform mat4 u_viewMatrix;

out vec4 fragmentColour;
out vec2 texCoord;

void main() {
    texCoord = a_texCoord;
    fragmentColour = a_colour;
    gl_Position = u_projectionMatrix * u_viewMatrix * u_worldMatrix * vec4(a_position,1);
}