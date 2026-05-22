#!/bin/bash

BASE="http://localhost:3000/api/v1"
echo "=========================================="
echo "TESTES DO ENDPOINT /category"
echo "=========================================="

echo ""
echo "1. POST /category - Criar categoria (esperado: 201)"
RESULT=$(curl -s -X POST $BASE/category \
  -H "Content-Type: application/json" \
  -d '{"name":"Transporte","icon":"car","color":"#3498DB"}')
echo $RESULT | jq .
ID=$(echo $RESULT | jq -r '.id')

echo ""
echo "2. POST /category - Nome duplicado (esperado: 409)"
curl -s -X POST $BASE/category \
  -H "Content-Type: application/json" \
  -d '{"name":"Transporte","icon":"car","color":"#3498DB"}' | jq .

echo ""
echo "3. POST /category - Dados inválidos (esperado: 400)"
curl -s -X POST $BASE/category \
  -H "Content-Type: application/json" \
  -d '{"name":"","icon":"car","color":"cor-invalida"}' | jq .

echo ""
echo "4. GET /category - Listar categorias (esperado: 200)"
curl -s $BASE/category | jq .

echo ""
echo "5. GET /category/:id - Buscar por ID (esperado: 200)"
curl -s $BASE/category/$ID | jq .

echo ""
echo "6. GET /category/:id - ID inexistente (esperado: 404)"
curl -s $BASE/category/id-inexistente | jq .

echo ""
echo "7. PATCH /category/:id - Atualizar (esperado: 200)"
curl -s -X PATCH $BASE/category/$ID \
  -H "Content-Type: application/json" \
  -d '{"color":"#E74C3C"}' | jq .

echo ""
echo "8. DELETE /category/:id - Deletar (esperado: 200)"
curl -s -X DELETE $BASE/category/$ID | jq .

echo ""
echo "9. GET /category/:id - Após deletar (esperado: 404)"
curl -s $BASE/category/$ID | jq .

echo ""
echo "=========================================="
echo "TESTES CONCLUÍDOS"
echo "=========================================="
