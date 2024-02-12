#version 300 es
precision mediump float;

in vec3 fragmentColour;

out vec4 outputColor;

void main() {
    outputColor = vec4(fragmentColour, 1.0);
}