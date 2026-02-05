// Polyfills for Jest/jsdom (required by React Router v7 and others)
const { TextEncoder, TextDecoder } = require("util");
Object.assign(global, { TextEncoder, TextDecoder });
