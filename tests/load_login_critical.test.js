import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

export let durationTrend = new Trend('tempo_resposta_login');
export let successRate = new Rate('taxa_sucesso_login');

export const options = {
  scenarios: {
    carga_normal: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 10 }, // sobe até 10 usuários
        { duration: '20s', target: 10 }, // mantém 10 usuários
        { duration: '10s', target: 0 },  // reduz
      ],
      exec: 'loginValido',
    },

    pico: {
      startTime: '45s',
      executor: 'ramping-vus',
      stages: [
        { duration: '5s', target: 100 },  // pico repentino
        { duration: '10s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      exec: 'loginValido',
    },

    brute_force: {
      startTime: '70s',
      executor: 'constant-vus',
      vus: 20,
      duration: '30s',
      exec: 'loginInvalido',
    },
  },
};

export function loginValido() {
  const registerUrl = 'http://localhost:3000/api/register';
  const loginUrl = 'http://localhost:3000/api/login';

  // Cria um gerente novo a cada execução
  const nome = `Melissa_${__VU}_${Date.now()}`;
  const senha = '123456';

  const userPayload = JSON.stringify({
    nome: nome,
    tipo: 'gerente',
    senha: senha,
  });

  const headers = { headers: { 'Content-Type': 'application/json' } };

  http.post(registerUrl, userPayload, headers);

  const loginPayload = JSON.stringify({ nome, senha });
  const res = http.post(loginUrl, loginPayload, headers);

  durationTrend.add(res.timings.duration);
  successRate.add(res.status === 200);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'responde rápido (<500ms)': (r) => r.timings.duration < 500,
  });

  sleep(1);
}


export function loginInvalido() {
  const url = 'http://localhost:3000/api/login';
  const payload = JSON.stringify({
    nome: `invalido_${__VU}_${Date.now()}`,
    senha: 'senha_errada',
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  durationTrend.add(res.timings.duration);
  successRate.add(res.status === 401 || res.status === 403);

  check(res, {
    'retorna 401/403 em erro': (r) => r.status === 401 || r.status === 403,
    'sem falha 500': (r) => r.status !== 500,
  });

  sleep(1);
}
