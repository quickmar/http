import { HttpClientBase } from "./client/http-client";
import { RequestBuilder } from "./request-builder/request-builder";


export class Http {
    static createClient(baseUrl: string | RequestBuilder): HttpClientBase{
        return new HttpClientBase(baseUrl);
    }
}
const client = Http.createClient(new RequestBuilder('http://localhost:5173/').addDistinctSearchParam('base', 'param'));
console.dir(client.url);
client.registerPath('test')
console.dir(client.getBuilder('test').toString());
client.registerPath('test2', (b) => b.addDistinctSearchParam('param', 'test'));
console.dir(client.getBuilder('test2').toString());
// client.registerPath('test3', (b) => b.clone().addDistinctSearchParam('throw', 'error'))
client.fetch('test2').then((res) => res.text()).then(console.log);