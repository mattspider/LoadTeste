import http from 'k6/http';
import { check, sleep } from 'k6';
import GerarToken from '../Token/Token';
import { API_URL, BENEFICIARIO, SENHA} from './config.js';

export let options = {
    stages: [
        { duration: '1m', target: 300 },
        { duration: '3m', target: 100 }

    ],
};

export default function RealizarLogin() {
    const url = API_URL;
    const payload = JSON.stringify({
        usuario: BENEFICIARIO,
        senha: SENHA,
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GerarToken(__ENV.ACCESS_TOKEN)
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
        'IdUsuario': (r) => {
            if (!r.json().hasOwnProperty('IdUsuario')) {
                return console.error('Erro: IdUsuario não encontrado no response: ' + r.json());
            }
            return res.json().IdUsuario;
        }
    });
    sleep(1);
    return res.json().IdUsuario; // Retorna o IdUsuario para ser usado em outras funções

};

export function AtendimentoDeChat(){
    const url = API_URL;
    const payload = JSON.stringify({
        IdUsuario: RealizarLogin(), // Chama a função de login para obter o IdUsuario
        DataSolicitacao: new Date().toISOString().replace('T', ' T').substring(0, 19),
        Telefone: '48999999999',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GerarToken(__ENV.ACCESS_TOKEN)
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
            return res.json().IdAtendimento;
        }
    });
}

export function AtendimentoDeVideo(){
    const url = API_URL;
    const payload = JSON.stringify({
        IdUsuario: RealizarLogin(), // Chama a função de login para obter o IdUsuario
        DataSolicitacao: new Date().toISOString().replace('T', ' T').substring(0, 19),
        Telefone: '92674850086',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GerarToken(__ENV.ACCESS_TOKEN)
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
            return res.json().IdAtendimento;
        }
    });

}