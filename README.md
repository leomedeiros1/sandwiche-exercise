# Exercicio Fullstack Sandwiche

## Dependências, instalação e execução

### Dependências
* [Docker](https://www.docker.com) e [Docker Compose](https://docs.docker.com/compose/).

### Instalação
* Após realizar download do diretório, configure o arquivo `.env` com as variáveis de ambiente (uma cópia do arquivo `env.reference` renomeada para `.env` é suficiente para realizar testes)
* Dentro do diretório principal, execute a etapa de geração dos containers do Docker Compose, utilizando o comando:  ```docker-compose build```

### Execução

* Dentro do diretório principal, execute o comando para iniciar o docker-compose: ```docker-compose up```


## Requisitos Técnicos
* Utilizar Node.js para criar a API (express, NestJs, etc);
    * Optado pelo Express pela facilidade e simpliciade;
* Utilizar um banco de dados relacional para recuperar os dados;
    * Optado pelo Postgres por ser um banco consolidado e que é amplamente utilizado (aproveitando para ter mais contato com tecnologias mais usadas)
* Utilizar uma biblioteca de gráficos (por exemplo, Chart.js) para exibir o gráfico de acessos por dia;
    * Optado pelo Chart.js pela sugestão
* Implementar a interface web usando HTML, CSS e JavaScript (pode usar frameworks como React, Next, Angular, mas existe uma preferência por Angular);
    * Optado por Angular pela sugestão 
* Os dados de exemplo podem ser gerados aleatoriamente ou pré-definidos na no banco.
    * Optado por gerar os dados aleatóriamente quando a aplicação é iniciada pela primeira vez (supostamente apenas em modo de desenvolvimento)

## Requisitos práticos
### API

- [x] Criar uma rota para fornecer dados de acessos diários.
- [x] Os dados devem incluir a data e o número total de acessos naquele dia.
- [x] Além disso, deve ser possível obter os links mais acessados nos últimos 7 dias.

### Interface Web

- [x] Criar uma página com um gráfico para exibir o total de acessos por dia.
- [x] Criar uma tabela para exibir os links mais acessados nos últimos 7 dias.
- [x] Utilizar a API criada para obter os dados necessários para preencher o gráfico e a tabela.

### Estilização
- [ ] Estilizar a página web para torná-la visualmente atraente e intuitiva.
    * Este tópico carece de mais trabalho.

### Documentação
- [x] Incluir um README.md com instruções claras sobre como configurar e executar a aplicação.
- [ ] Documentar a estrutura do projeto, escolhas de tecnologia e quaisquer considerações importantes.

### Bônus (opcional)
- [ ] Implementar autenticação na API para proteger os dados sensíveis.
- [x] Adicionar opção para filtrar dados por período na interface web.
- [ ] Permitir que o usuário clique nos links na tabela para obter mais informações.

## Considerações

### Gerais

### Angular
* Acredito que este seja o principal ponto carente de melhorias. A interface não é tão visualmente agradável - reflexo da minha falta de habilidades quanto a design - e em sua maioria não é responsiva - certamente precisaria de um tempo maior de dedicação para alcançar uma qualidade aceitável.

### Backend

### Database

### Repositório e Configurações
* A decisão de usar apenas 1 repositório para ambos os serviços foi principalmente baseada na facilidade de configurar o Docker-compose, além de não se preocupar com outros detalhes. Também foi considerado a falta de necessidade de se preocupar com longo prazo/escalabilidade;
* Por ser um projeto pequeno e que seria desenvolvido por apenas 1 usuário, decidi por não lidar branchs e politicas de commit (Obviamente seria necessário ser bem definido no caso de um projeto maior);
   * Além disso, decidido por não se preocupar muito com granularidade dos commits;
* O tempo entre um commit e outro não necessariamente reflete o tempo real gasto entre os mesmos;


### Solved issues
- [x] Ao construir e executar as imagens Docker e criar o banco de dados, é possível que o Node tente subir antes que o DB esteja pronto, causando um erro

## Known issues

