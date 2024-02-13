#version 300 es

precision mediump float;

in vec2 vertexPosition;
in vec3 vertexColour;
in vec2 vertexTexCoord;

out mediump vec2 textureCoord;
out vec3 fragmentColour;

void main() {
    fragmentColour = vertexColour;
    textureCoord = vertexTexCoord;
    gl_Position = vec4(vertexPosition, 0.0, 1.0);
}