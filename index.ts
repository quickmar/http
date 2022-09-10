// Import stylesheets
import { Http } from './src/http';
import { UrlBuilder } from './src/http-url-builder/url-builder';
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const urlBuilder = UrlBuilder.create('http://www.example.com');
console.log('1', urlBuilder.toString());

const path = urlBuilder.addPath('dog');
console.log('2', path.toString());
console.log('3', urlBuilder.toString());

urlBuilder.addSearchParam('b', '5');
path.addSearchParam('a', '5');

console.log('4', path.toString());
console.log('5', urlBuilder.toString());
