import http from 'k6/http';
import { check, sleep } from 'k6';
import { API_URL, USERNAME, PASSWORD,GRANT_TYPE} from './config.js';

export let options = {
    stages: [
        { duration: '1m', target: 10 },
        { duration: '3m', target: 20 }

    ],
};

export default function GerarToken() {
    const url = API_URL;
    const payload = `username=${USERNAME}&password=${PASSWORD}&grant_type=${GRANT_TYPE}`;

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }    
    };


    let res = http.post(url, payload, params);
    let access_token = res.json('access_token');

    check(res, {
        'status': (r) => {
        if (r.status !== 200) {
                console.error('Erro:' + r.status);
            }
            return r.status == 200;
        },
        'response time is acceptable': (r) => r.timings.duration < 2000,
        'response contains token':access_token => access_token !== undefined && access_token !== null,
        'token' : (r) => {
        if (access_token) {
                console.log(`Access Token: ${access_token}`);
                return true;
            }
            console.error('Access Token not found in response');
            console.log(`Response body: ${r.body}`);
            console.log(`Response status: ${r.status}`);
            return false;
        }
    });
    sleep(1);
    return access_token; // Retorna o token para ser usado em outras funções
}

