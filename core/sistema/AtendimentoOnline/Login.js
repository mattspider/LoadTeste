import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
    stages: [
        { duration: '1m', target: 1 },
        { duration: '3m', target: 1 }
    ],
    cloud: {
    projectID: 3790641,
    name: 'Login',
    }
};

export default function RealizarLogin() {
    const url =  __ENV.LOGIN_URL;
    const payload = JSON.stringify({
        usuario: __ENV.BENEFICIARIO,
        senha: __ENV.SENHA,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + __ENV.TOKENLHAPI
        }    
    };

    console.log('Headers enviados:', JSON.stringify(params.headers, null, 2));
    console.log('Payload enviado:', payload);


    const res = http.post(url, payload, params);
    check(res, { 
        'status': (r) => {
        if (r.status !== 200) {
                console.error('Erro:' + r.status);
            }
            return r.status == 200;
        },
        'response time is less than 500ms': (r) => r.timings.duration < 500,
        'IdUsuario': (r) => {
            if (!r.json().hasOwnProperty('IdUsuario')) {
                return console.error('Erro: IdUsuario não encontrado no response: ' + JSON.stringify(r.json()));
            }
            return res.json().IdUsuario;
        }
    });
    sleep(1);
    return res.json().IdUsuario; // Retorna o IdUsuario para ser usado em outras funções

};
