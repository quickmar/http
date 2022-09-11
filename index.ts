import { Http } from './src/http';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
console.clear();

const client = Http.newClient('http://www.example.com');
const urlBuilder = client.requestBuilder();
console.log('1', urlBuilder.build());

const path = urlBuilder.addPath('dog');
console.log('2', path.toString());
console.log('3', urlBuilder.toString());

urlBuilder.addSearchParam('b', '5');
path.addSearchParam('a', '5');

console.log('4', path.toString());
console.log('5', urlBuilder.toString());
