#!/bin/bash

# ============================================================================
# MCP Playwright Test - Script de Setup Completo
# ============================================================================
# Este script configura o projeto automaticamente
# ============================================================================

set -e

echo "🚀 MCP Playwright Test - Setup"
echo "======================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Verificar Node.js
echo -e "${BLUE}1️⃣ Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node.js não está instalado!${NC}"
  echo "Instale de: https://nodejs.org/‌"
  exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js $NODE_VERSION encontrado${NC}"
echo ""

# 2. Instalar dependências
echo -e "${BLUE}2️⃣ Instalando dependências npm...${NC}"
npm install
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# 3. Instalar browsers Playwright
echo -e "${BLUE}3️⃣ Instalando browsers Playwright...${NC}"
npx playwright install
echo -e "${GREEN}✅ Browsers instalados${NC}"
echo ""

# 4. Criar .env.sistema1 se não existir
echo -e "${BLUE}4️⃣ Verificando configurações de ambiente...${NC}"
if [ ! -f ".env.sistema1" ]; then
  echo -e "${YELLOW}⚠️  Arquivo .env.sistema1 não encontrado${NC}"
  cp .env.example .env.sistema1
  echo -e "${GREEN}✅ Arquivo .env.sistema1 criado${NC}"
  echo ""
  echo -e "${YELLOW}⚠️  IMPORTANTE: Edite .env.sistema1 com suas credenciais reais!${NC}"
  echo "Comando: code .env.sistema1"
else
  echo -e "${GREEN}✅ Arquivo .env.sistema1 já existe${NC}"
fi
echo ""

# 5. Criar pastas de evidências
echo -e "${BLUE}5️⃣ Criando diretórios de evidências...${NC}"
mkdir -p tests/evidencias/sistema1
mkdir -p tests/evidencias/sistema2
echo -e "${GREEN}✅ Diretórios criados${NC}"
echo ""

# 6. Validar estrutura
echo -e "${BLUE}6️⃣ Validando estrutura do projeto...${NC}"
if [ -f "playwright.config.ts" ] && [ -f "package.json" ] && [ -f ".env.example" ]; then
  echo -e "${GREEN}✅ Estrutura válida${NC}"
else
  echo -e "${RED}❌ Estrutura inválida. Alguns arquivos faltam.${NC}"
  exit 1
fi
echo ""

# 7. Summary
echo "======================================"
echo -e "${GREEN}✅ Setup Completado com Sucesso!${NC}"
echo "======================================"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo "1. Edite o arquivo .env.sistema1 com suas credenciais"
echo "   $ code .env.sistema1"
echo ""
echo "2. Execute os testes:"
echo "   $ npm test"
echo ""
echo "3. Ou use o script de testes:"
echo "   $ bash scripts/run-tests.sh"
echo ""
echo -e "${BLUE}Documentação: https://github.com/seu-repo/mcp-playwright-test${NC}"
echo ""
