import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // 🔹 Registrar gerente (gera nome único por VU)
  const nome = `Melissa_${__VU}_${Date.now()}`;
  const senha = '123456';
  const registro = http.post(`${BASE_URL}/api/register`, JSON.stringify({
    nome,
    tipo: 'gerente',
    senha,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(registro, { 'registro status 201': (r) => r.status === 201 });

  // 🔹 Fazer login
  const loginRes = http.post(`${BASE_URL}/api/login`, JSON.stringify({ nome, senha }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'login 200': (r) => r.status === 200,
    'token recebido': (r) => r.json('token') !== undefined,
  });

  const token = loginRes.json('token');

  // 🔹 Teste principal - listar pedidos
  const res = http.get(`${BASE_URL}/api/pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}




