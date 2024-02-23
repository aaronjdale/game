#version 300 es
precision mediump float;

in vec4 fragmentColour;
in vec2 texCoord;

out vec4 outputColour;

uniform sampler2D u_texture;

void main() {
  outputColour = texture(u_texture, texCoord) * fragmentColour;
}