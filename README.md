# 🚇 FluxoCerto - Monitoramento de Fluxo no Metrô de São Paulo

O **FluxoCerto** é um sistema inteligente de monitoramento do fluxo de passageiros no metrô de São Paulo. Ele coleta, processa e exibe dados sobre a movimentação nas estações, auxiliando na gestão de operações e na melhoria da experiência dos usuários.

---

## 📊 Funcionalidades

- Visualização de dados por linha ou estação.
- Painel web responsivo e interativo.
- Armazenamento e histórico de dados em banco de dados.

---

## 🧰 Tecnologias Utilizadas

### 💻 Front-end
- **HTML5**
- **CSS3**
- **JavaScript Vanilla**

### 🛠️ Back-end
- **Node.js**
- **MySQL** (armazenamento de dados)
- **Java** (leitura de dados)

---

## ☁️ Infraestrutura

O sistema atualmente está hospedado em uma instância da **AWS (Amazon Web Services)**.
<br>
<p align="center">
  <img src="Documentos/ArquiteturaSolucao/ArquiteturaSolucao.png" alt="Imagem da arquitetura do sistema" width="500">
</p>

---

## 🧪 Processamento de Dados (ETL)

O projeto conta com um processo de ETL completo:

- **Extração:** Coletamos os dados brutos das linhas do metrô de São Paulo.
- **Armazenamento:** Esses dados são armazenados em um bucket S3 AWS (Data Lake).
- **Transformação:** Os dados são limpos e estruturados para facilitar o uso.
- **Carga:** Os dados transformados são carregados em um banco de dados relacional para serem exibidos na aplicação web.

>Esse fluxo garante dados atualizados e prontos para análises eficientes.

---

## 🔧 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/FluxoCerto.git
cd FluxoCerto
```

### 2. Instale as dependências do projeto

Na raiz do projeto, rode o comando para instalar os módulos necessários:

```bash
npm install
```

### 3. Execute o arquivo `.jar` para extrair os dados

```bash
cd java/conexao-banco
java -jar extracao-dados.jar
```

### 4. Rode o script SQL para configurar o banco de dados

Execute o script localizado em `src/databases/`.

### 5. Inicie o servidor Node.js

```bash
npm start
```

---

## 🚀 Objetivo do Projeto

Este sistema foi desenvolvido com foco em auxiliar a gestão do transporte público, oferecendo uma visão clara do fluxo de passageiros.

---

## 👥 Autores do Projeto

- **Viviane** – Scrum Master  
- **João Vitor Luz** – Desenvolvedor Front-end  
- **Rafael Pavani** – Desenvolvedor Back-end  
- **Gabriel de Pádua** – Infraestrutura  
- **Guilherme Rebouças** – Banco de Dados  
- **Gustavo** – Product Owner  

---

## 🔗 Links Úteis

- 📌 **Planner (Miro):** [Clique aqui](https://miro.com/app/board/uXjVITExIkE=/)
- 🗂️ **Backlog (Excel Online):** [Clique aqui](https://bandteccom-my.sharepoint.com/:x:/g/personal/viviane_santos_sptech_school/EQ5FbnlDBcpFnK5Slh18lgMBHZb7KZhylR-mb_dmGqfBrg?e=beqnkh)
- ✅ **Trello (Kanban):** [Clique aqui](https://trello.com/b/NAJkOgH3/fluxo-certo-pi)

