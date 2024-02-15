#version 300 es

precision mediump float;

in vec2 vertexPosition;
in vec3 vertexColour;
in vec2 vertexTexCoord;

out mediump vec2 textureCoord;
out vec3 fragmentColour;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main() {
    fragmentColour = vertexColour;
    textureCoord = vertexTexCoord;
    gl_Position = projection * view * model * vec4(vertexPosition, 0.0, 1.0);
}