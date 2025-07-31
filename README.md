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

Este projeto é baseado em variáveis de ambiente, portanto, para rodar esse projeto, você vai precisar criar um arquivo .env.local na pasta raiz do projeto/
Dentro desta pasta você deve configurar as variáveis que serão utilizadas no teste, os testes ja existentes, ja contam com as variáveis necessárias no arquivo .env, basta replicar essas variáveis/
No seu arquivo .env.local e os testes ja existentes funcionarão, abaixo exemplo de algumas delas:

  API_URL = URL da API

  BENEFICIARIO = codigo beneficiario

## Rodando os testes

Para rodar os testes, existem comandos prontos no arquivo package.json, basta roda-los

## Acordo de cavalheiros e damas

O intuito deste projeto é auxiliar nos testes de carga da empresa. Portanto, qualquer pessoa pode utilizá-lo, tanto para executar testes já existentes quanto para desenvolver novos cenários de teste.

No entanto, como em todo projeto, faz-se necessário seguir um padrão. Quando você for desenvolver um novo teste, sugiro adotar o padrão definido para garantir maior legibilidade. Os testes devem seguir a seguinte estrutura de pastas:

core > sistema > "nome do módulo" > ArquivoDoTeste.js/

O módulo refere-se a cada área de desenvolvimento da aplicação, como temos na API. Por exemplo, o módulo de teleconsulta: tudo o que envolver teleconsulta deve estar dentro deste módulo e em seus respectivos arquivos de teste. Ou seja:

o teste de agendar consulta deve estar em AgendarConsulta.js

o teste de agenda profissional, em AgendaProfissional.js

Além disso, após desenvolver novos testes, você deve adicionar as variáveis de ambiente utilizadas no arquivo .env, sem incluir os parâmetros reais. O formato deve ser o seguinte:

VARIAVEL_TESTE=###

Também é necessário criar o comando para executar esse teste. Ele deve ser adicionado no arquivo package.json, com uma versão para execução local e outra com os dados reais de produção. Já existem comandos nesse arquivo que podem ser utilizados como exemplo.

Por fim, é importante criar um arquivo .gitignore para que o seu .env.local não seja rastreado. Esse arquivo .gitignore também deve estar registrado dentro dele mesmo, para igualmente não ser rastreado.