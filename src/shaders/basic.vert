#version 300 es

precision mediump float;

in vec2 vertexPosition;
in vec3 vertexColour;

uniform vec2 canvasSize;
uniform vec2 location;
uniform float size;

out vec3 fragmentColour;

void main() {

    vec2 finalVertexPosition = vertexPosition * size + location;
    vec2 clipPosition = (finalVertexPosition / canvasSize) * 2.0 - 1.0;

    fragmentColour = vertexColour;
    gl_Position = vec4(clipPosition, 0.0, 1.0);
}