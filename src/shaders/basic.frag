#version 300 es
precision mediump float;

in vec3 fragmentColour;
in vec2 textureCoord;

uniform sampler2D uSampler;

out vec4 outputColor;

void main() {
    outputColor = texture(uSampler, textureCoord) * vec4(fragmentColour, 1.0);
}