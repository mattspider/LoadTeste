## __Testes de Carga com Grafana K6__
Este projeto contém scripts para testes de carga utilizando o Grafana K6, ideais para validar APIs.

Pré-requisitos:\
Grafana cloud K6

## 🔗  Downloads
K6:
https://grafana.com/docs/k6/latest/set-up/install-k6/


Extensões recomendadas para VS Code:\
ESLint (identificação de erros JS)\
Prettier (formatação de código)\
k6 Official Extension (realce de sintaxe e execução de scripts K6)\
DotENV (realce para arquivos .env caso use variáveis locais)


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

  API_URL ## URL da API

  BENEFICIARIO ## cpf beneficiario

  SENHA ## senha beneficiario

  USERNAME ## username da web service credencial

  PASSWORD ## senha da web service credencial

  GRANT_TYPE ## grant_type do endpoint

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  k6 run [NomeDoArquivoDoTeste] --env SUA_VARIAVEL_DE_AMBIENTE = TESTE ^ --env OUTRA_VARIAVEL_AMBIENTE = TESTE2
```

Obs:
Substitua os valores conforme sua configuração/API(Nem todas as variaveis sao utilizadas em todos os testes, verificar quais variaveis de ambientes serao necessarias no seu teste e passar somente o que e preciso).

