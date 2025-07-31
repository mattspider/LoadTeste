import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 1 },
        { duration: '3m', target: 1 }

    ],
};


export function AtendimentoDeVideo(){
    const url = __ENV.VIDEO_URL;
    const payload = JSON.stringify({
        IdUsuario: RealizarLogin(), // Chama a função de login para obter o IdUsuario
        DataSolicitacao: new Date().toISOString().replace('T', ' T').substring(0, 19),
        Telefone: '92674850086',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + __ENV.TOKENLHAPI
        }
    };
    const res = http.post(url, payload, params);
    check(res, {
        'status': (r) => {
            if (r.status !== 200) {
                console.error('Erro:' + r.status);
            }
            return r.status == 200;
        },
        'response time is less than 500ms': (r) => r.timings.duration < 500,
        'IdAtendimento': (r) => {
            if (!r.json().hasOwnProperty('IdAtendimento')) {
                return console.error('Erro: ' + r.json());
            }
            sleep(1);
            return res.json().IdAtendimento;
        }
    });
}