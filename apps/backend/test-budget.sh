#!/bin/bash

BASE="http://localhost:3000/api/v1"
echo "=========================================="
echo "TESTES DO ENDPOINT /budget"
echo "=========================================="

echo ""
echo "1. POST /budget - Criar orçamento (esperado: 201)"
curl -s -X POST $BASE/budget \
  -H "Content-Type: application/json" \
  -d '{"categoryId":"cat-teste-001","name":"Orçamento E2E","amountLimit":50000,"month":6,"year":2026}' | jq .

echo ""
echo "2. GET /budget - Listar orçamentos (esperado: 200)"
curl -s $BASE/budget | jq .

echo ""
echo "3. GET /budget/:id - Buscar por ID (esperado: 200)"
ID=$(curl -s -X POST $BASE/budget \
  -H "Content-Type: application/json" \
  -d '{"categoryId":"cat-teste-001","name":"Orçamento ID","amountLimit":30000,"month":7,"year":2026}' | jq -r '.id')
curl -s $BASE/budget/$ID | jq .

echo ""
echo "4. GET /budget/category/:id - Buscar por categoria (esperado: 200)"
curl -s $BASE/budget/category/cat-teste-001 | jq .

echo ""
echo "5. PATCH /budget/:id - Atualizar (esperado: 200)"
curl -s -X PATCH $BASE/budget/$ID \
  -H "Content-Type: application/json" \
  -d '{"amountLimit":70000}' | jq .

echo ""
echo "6. POST /budget - Duplicado (esperado: 409)"
curl -s -X POST $BASE/budget \
  -H "Content-Type: application/json" \
  -d '{"categoryId":"cat-teste-001","name":"Duplicado","amountLimit":10000,"month":7,"year":2026}' | jq .

echo ""
echo "7. POST /budget - Categoria inexistente (esperado: 404)"
curl -s -X POST $BASE/budget \
  -H "Content-Type: application/json" \
  -d '{"categoryId":"inexistente","name":"Teste","amountLimit":10000,"month":8,"year":2026}' | jq .

echo ""
echo "8. POST /budget - Dados inválidos (esperado: 400)"
curl -s -X POST $BASE/budget \
  -H "Content-Type: application/json" \
  -d '{"categoryId":"cat-teste-001","name":"","amountLimit":-100,"month":13,"year":2026}' | jq .

echo ""
echo "9. DELETE /budget/:id - Deletar (esperado: 200)"
curl -s -X DELETE $BASE/budget/$ID | jq .

echo ""
echo "10. GET /budget/:id - Após deletar (esperado: 404)"
curl -s $BASE/budget/$ID | jq .

echo ""
echo "=========================================="
echo "TESTES CONCLUÍDOS"
echo "=========================================="