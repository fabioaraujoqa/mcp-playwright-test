#!/bin/bash

# ============================================================================
# MCP Playwright Test - Script de Execução de Testes
# ============================================================================
# Este script facilita a execução de testes com diferentes configurações
# ============================================================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Menu
show_menu() {
  echo ""
  echo "======================================"
  echo "  🎭 MCP Playwright Test"
  echo "======================================"
  echo ""
  echo "Escolha uma opção:"
  echo ""
  echo "1) Rodar todos os testes (headless)"
  echo "2) Rodar testes com navegador visível"
  echo "3) Rodar teste específico"
  echo "4) Modo Debug (com inspetor)"
  echo "5) Interface Visual (UI Mode)"
  echo "6) Gerar Codegen (registrador de ações)"
  echo "7) Ver Relatório HTML"
  echo "8) Atualizar Snapshots"
  echo "9) Executar testes em paralelo"
  echo "10) Sair"
  echo ""
  echo "======================================"
  read -p "Digite sua escolha [1-10]: " choice
}

run_tests_headless() {
  echo -e "${BLUE}▶️  Rodando testes (headless)...${NC}"
  npm test
}

run_tests_headed() {
  echo -e "${BLUE}▶️  Rodando testes com navegador visível...${NC}"
  npm run test:headed
}

run_specific_test() {
  read -p "Digite o padrão do teste (ex: login, formulario): " pattern
  echo -e "${BLUE}▶️  Rodando testes que correspondem a '$pattern'...${NC}"
  npm test -- --grep "$pattern"
}

run_debug() {
  echo -e "${BLUE}▶️  Iniciando modo Debug...${NC}"
  npm run test:debug
}

run_ui_mode() {
  echo -e "${BLUE}▶️  Iniciando UI Mode...${NC}"
  npm run test:ui
}

run_codegen() {
  read -p "Digite a URL para gerar testes (ex: https://app.com): " url
  echo -e "${BLUE}▶️  Iniciando Codegen para $url...${NC}"
  npx playwright codegen "$url"
}

show_report() {
  echo -e "${BLUE}▶️  Abrindo relatório HTML...${NC}"
  npm run test:report
}

update_snapshots() {
  echo -e "${BLUE}▶️  Atualizando snapshots...${NC}"
  npm run test:update-snapshots
}

run_parallel() {
  echo -e "${BLUE}▶️  Rodando testes em paralelo...${NC}"
  npm test -- --workers=4
}

# Main loop
while true; do
  show_menu
  
  case $choice in
    1)
      run_tests_headless
      ;;
    2)
      run_tests_headed
      ;;
    3)
      run_specific_test
      ;;
    4)
      run_debug
      ;;
    5)
      run_ui_mode
      ;;
    6)
      run_codegen
      ;;
    7)
      show_report
      ;;
    8)
      update_snapshots
      ;;
    9)
      run_parallel
      ;;
    10)
      echo -e "${GREEN}👋 Até logo!${NC}"
      exit 0
      ;;
    *)
      echo -e "${RED}❌ Opção inválida${NC}"
      ;;
  esac
  
  echo ""
  read -p "Pressione ENTER para continuar..."
done
