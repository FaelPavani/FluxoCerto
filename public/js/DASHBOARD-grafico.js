
    const mainSelect = document.getElementById("mainSelect");
    const porAnos = document.getElementById("porAnos");
    const anoEspecifico = document.getElementById("anoEspecifico");

    const selectDe = document.getElementById("options_de")
    const selectAte = document.getElementById("options_ate")

    // Função para alternar exibição com base na seleção
    function toggleFiltros() {
        const selectedValue = mainSelect.value;

        if (selectedValue === "anos") {
            porAnos.style.display = "flex";
            anoEspecifico.style.display = "none";
            chartLinhaAnoEspecifico.style.display = 'none'
            chartLinhaPorAnos.style.display = 'flex'

            kpi_por_ano.style.display = 'none'
            kpi_por_anos.style.display = 'flex'



        } else if (selectedValue === "ano_especifico") {
            anoEspecifico.style.display = "flex";
            porAnos.style.display = "none";
            chartLinhaAnoEspecifico.style.display = 'flex'
            kpi_por_ano.style.display = 'block'
            kpi_por_anos.style.display = 'none'
            chartLinhaPorAnos.style.display = 'none'
        }
    }

    // Evento para detectar mudança no select principal
    mainSelect.addEventListener("change", toggleFiltros);

    // Exibe o grupo inicial baseado no valor padrão do select principal
    toggleFiltros();

    // GRÁFICO DE LINHA -- POR ANOS



    const ctx1 = document.getElementById('chartLinhaAnoEspecifico').getContext('2d');
    let chart1;

    const initialData1 = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [
            {
                label: 'Linha Azul',
                borderColor: 'blue',
                data: [17684, 18558, 20437, 21247, 20623, 19934, 19649, 21265, 20995, 22206, 20460, 18840],
            },
            {
                label: 'Linha Vermelha',
                borderColor: 'red',
                data: [20195, 20722, 22256, 23031, 22415, 21887, 21470, 23216, 22585, 24049, 22098, 20679],
            },
            {
                label: 'Linha Verde',
                borderColor: 'green',
                data: [10704, 11727, 12756, 13423, 12893, 12532, 12274, 13422, 13094, 13971, 12668, 11419],
            }
        ]
    };

    function createChart1(data) {
        if (chart1) chart1.destroy();
        chart1 = new Chart(ctx1, {
            type: 'line',
            data,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: false // Remove a legenda
                    }
                },
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true }
                }
            }
        });
    }




    // GRÁFICO DE LINHA -- ANO ESPECÍFICO
    const ctx2 = document.getElementById('chartLinhaPorAnos').getContext('2d');
    let chart2;

    const initialData2 = {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
            {
                label: 'Linha Azul',
                borderColor: 'blue',
                data: [151421, 155293, 215293, 233065, 241898],
            },
            {
                label: 'Linha Vermelha',
                borderColor: 'red',
                data: [186259, 189568, 249684, 258785, 264603],
            },
            {
                label: 'Linha Verde',
                borderColor: 'green',
                data: [84749, 85694, 125981, 139675, 150883],
            }
        ]
    };


    function updateChart() {
        const de = parseInt(document.getElementById('options_de').value);
        const ate = parseInt(document.getElementById('options_ate').value);

        const startIndex = initialData2.labels.indexOf(de.toString());
        const endIndex = initialData2.labels.indexOf(ate.toString());

        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
            console.error("Erro ao encontrar os índices dos anos selecionados.");
            return;
        }

        const filteredLabels = initialData2.labels.slice(startIndex, endIndex + 1);

        const filteredDatasets = initialData2.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.slice(startIndex, endIndex + 1)
        }));

        chart2.data.labels = filteredLabels;
        chart2.data.datasets = filteredDatasets;
        chart2.update();
    }

    function createChart2(data) {
        if (chart2) chart2.destroy();
        chart2 = new Chart(ctx2, {
            type: 'line',
            data,
            options: {
                maintainAspectRatio: false,

                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Criar os dois gráficos
    createChart1(initialData1);
    createChart2(initialData2);


    document.getElementById('options_de').addEventListener('change', updateChart);
    document.getElementById('options_ate').addEventListener('change', updateChart);
    // Criar uma cópia dos dados originais para referência
    const originalData2 = JSON.parse(JSON.stringify(initialData2));

    // Pegando os anos disponíveis no dataset
    const anosDisponiveis = originalData2.labels.map(label => parseInt(label));

    // Definir os limites mínimo e máximo do intervalo permitido
    const anoMin = Math.min(...anosDisponiveis);
    const anoMax = Math.max(...anosDisponiveis);

    function updateChart() {
        const selectDe = document.getElementById('options_de');
        const selectAte = document.getElementById('options_ate');

        let de = parseInt(selectDe.value);
        let ate = parseInt(selectAte.value);

        // Verifica se o ano está dentro dos limites permitidos
        if (de < anoMin || de > anoMax) {
            alert(`Ano inicial inválido! Escolha um ano entre ${anoMin} e ${anoMax}.`);
            selectDe.value = anoMin; // Retorna ao valor mínimo permitido
            return;
        }

        if (ate < anoMin || ate > anoMax) {
            alert(`Ano final inválido! Escolha um ano entre ${anoMin} e ${anoMax}.`);
            selectAte.value = anoMax; // Retorna ao valor máximo permitido
            return;
        }

        if (de > ate) {
            alert("O ano inicial não pode ser maior que o ano final.");
            selectDe.value = anoMin;
            selectAte.value = anoMax;
            return;
        }

        const startIndex = originalData2.labels.indexOf(de.toString());
        const endIndex = originalData2.labels.indexOf(ate.toString());

        if (startIndex === -1 || endIndex === -1) {
            console.error("Erro ao encontrar os índices dos anos selecionados.");
            return;
        }

        // Filtrar os labels
        const filteredLabels = originalData2.labels.slice(startIndex, endIndex + 1);

        // Criar novos datasets com os dados filtrados
        const filteredDatasets = originalData2.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.slice(startIndex, endIndex + 1)
        }));

        // Atualizar o gráfico corretamente
        chart2.data = {
            labels: filteredLabels,
            datasets: filteredDatasets
        };

        chart2.update();
    }

    function createChart2(data) {
        if (chart2) chart2.destroy();
        chart2 = new Chart(ctx2, {
            type: 'line',
            data: JSON.parse(JSON.stringify(data)), // Garante que não modificamos o original
            options: {
                maintainAspectRatio: false,

                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: false },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Criar gráfico inicialmente com os dados completos
    createChart2(originalData2);

    // Eventos para atualizar o gráfico ao mudar as datas
    document.getElementById('options_de').addEventListener('change', updateChart);
    document.getElementById('options_ate').addEventListener('change', updateChart);


    // Funções do select

    // Event listeners for filters
    document.getElementById('options_linhas').addEventListener('change', function () {
        const selected = this.value;

        if (selected === "linhas") {
            chart2.data.datasets.forEach(dataset => dataset.hidden = false);
            chart1.data.datasets.forEach(dataset => dataset.hidden = false);

        } else {
            chart2.data.datasets.forEach(dataset => {
                dataset.hidden = dataset.label.toLowerCase().includes(selected) ? false : true;
            });
            chart1.data.datasets.forEach(dataset => {
                dataset.hidden = dataset.label.toLowerCase().includes(selected) ? false : true;
            });
        }

        if (selected === "linhas") {
            kpi_linha_azul.style.display = 'flex'
            kpi_linha_vermelha.style.display = 'flex'
            kpi_linha_verde.style.display = 'flex'
        } else if (selected === "azul") {
            kpi_linha_azul.style.display = 'flex'
            kpi_linha_vermelha.style.display = 'none'
            kpi_linha_verde.style.display = 'none'
        } else if (selected === "vermelha") {
            kpi_linha_azul.style.display = 'none'
            kpi_linha_vermelha.style.display = 'flex'
            kpi_linha_verde.style.display = 'none'
        } else if (selected === "verde") {
            kpi_linha_azul.style.display = 'none'
            kpi_linha_vermelha.style.display = 'none'
            kpi_linha_verde.style.display = 'flex'
        }


        chart2.update();
        chart1.update();

    });




    // Lógica dos filtros De: Até:

    // Função para alternar exibição com base na seleção
    function toggleDeAte() {
        const valorSelecionadoDe = options_de.value;
        kpi_de.innerHTML = valorSelecionadoDe;


        const valorSelecionadoAte = options_ate.value;

        kpi_ate.innerHTML = valorSelecionadoAte;
    }

    // Evento para detectar mudança no select principal
    options_de.addEventListener("change", toggleDeAte);
    options_ate.addEventListener("change", toggleDeAte);


    // Exibe o grupo inicial baseado no valor padrão do select principal
    toggleDeAte();


    function toggleAnoEspecifico() {
        const valorSelecionadoAnoEspecifico = options_ano_especifico.value;
        const valorSelecionadoAnoEspecificoEstacoes = options_ano_especifico_estacoes.value;

        kpi_ano_especifico.innerHTML = valorSelecionadoAnoEspecifico;
        kpi_ano_especifico_estacao.innerHTML = valorSelecionadoAnoEspecificoEstacoes;
    }


    // Evento para detectar mudança no select principal
    options_ano_especifico.addEventListener("change", toggleAnoEspecifico);
    options_ano_especifico_estacoes.addEventListener("change", toggleAnoEspecifico);

    // Exibe o grupo inicial baseado no valor padrão do select principal
    toggleAnoEspecifico();


    // TOGGLE DAS ESTAÇÕES 
    console.log(document.getElementById("filtarPorEstacoes"));
    function togglefiltrarPorEstacoes() {
        let dataBarrasEstacaoAno = document.getElementById('dataBarrasEstacaoAno');
        const ValorSelecionadoEstacaoEspecificaAzul = estacoesAzul.value;
        const ValorSelecionadoEstacaoEspecificaVermelha = estacoesVermelha.value;
        const ValorSelecionadoEstacaoEspecificaVerde = estacoesVerde.value;


        const valorSelecionadofiltarPorEstacoes = filtarPorEstacoes.value;
        // kpi_de.innerHTML = valorSelecionadoDe;

        if (valorSelecionadofiltarPorEstacoes == 'estacoes') {
            porTodasEstacoes.style.display = 'flex';
            divEstacaoEspecifica.style.display = 'none';

            barras_estacoes_linhas.style.display = 'flex'

            document.getElementById('dataBarrasEstacaoAno').style.display = 'none';
            caixa_barras_estacaoEspecifica.style.display = 'none'

            kpi_por_estacao_especifica.style.display = 'none'
        } else if (valorSelecionadofiltarPorEstacoes == 'estacao_especifica') {
            porTodasEstacoes.style.display = 'none';
            divEstacaoEspecifica.style.display = 'flex';

            dataBarrasEstacaoAno.style.display = 'flex';
            caixa_barras_estacaoEspecifica.style.display = 'flex';

            barras_estacoes_linhas.style.display = 'none'

            kpi_por_estacao_especifica.style.display = 'flex'


            if (ValorSelecionadoEstacaoEspecificaAzul) {
                estacao_especifica.innerHTML = ValorSelecionadoEstacaoEspecificaAzul
            } else if (ValorSelecionadoEstacaoEspecificaVermelha) {
                estacao_especifica.innerHTML = ValorSelecionadoEstacaoEspecificaVermelha
            } else if (ValorSelecionadoEstacaoEspecificaVerde) {
                estacao_especifica.innerHTML = ValorSelecionadoEstacaoEspecificaVerde
            }
        }

    }

    filtarPorEstacoes.addEventListener("change", togglefiltrarPorEstacoes);
    estacoesAzul.addEventListener("change", togglefiltrarPorEstacoes);
    estacoesVermelha.addEventListener("change", togglefiltrarPorEstacoes);
    estacoesVerde.addEventListener("change", togglefiltrarPorEstacoes);
    togglefiltrarPorEstacoes();



    // TOGGLE DAS LINHAS

    function toggleFiltarEstacoesLinhas() {
        const valorSelecionadoLinhaEstacao = filtrarLinhaEstacao.value;
        // kpi_de.innerHTML = valorSelecionadoDe;

        if (valorSelecionadoLinhaEstacao == 'azul') {
            estacoesAzul.style.display = 'flex'
            estacoesVermelha.style.display = 'none'
            estacoesVerde.style.display = 'none'

            kpi_linha_azul_estacao.style.display = 'flex'
            kpi_linha_vermelha_estacao.style.display = 'none'
            kpi_linha_verde_estacao.style.display = 'none'


            chartBarrasLinhaAzul.style.display = 'flex';
            chartBarrasLinhaVermelha.style.display = 'none';
            chartBarrasLinhaVerde.style.display = 'none';
        } else if (valorSelecionadoLinhaEstacao == 'vermelha') {
            estacoesAzul.style.display = 'none'
            estacoesVermelha.style.display = 'flex'
            estacoesVerde.style.display = 'none'

            kpi_linha_azul_estacao.style.display = 'none'
            kpi_linha_vermelha_estacao.style.display = 'flex'
            kpi_linha_verde_estacao.style.display = 'none'


            chartBarrasLinhaAzul.style.display = 'none';
            chartBarrasLinhaVermelha.style.display = 'flex';
            chartBarrasLinhaVerde.style.display = 'none';
        } else if (valorSelecionadoLinhaEstacao == 'verde') {
            estacoesAzul.style.display = 'none'
            estacoesVermelha.style.display = 'none'
            estacoesVerde.style.display = 'flex'

            kpi_linha_azul_estacao.style.display = 'none'
            kpi_linha_vermelha_estacao.style.display = 'none'
            kpi_linha_verde_estacao.style.display = 'flex'

            chartBarrasLinhaAzul.style.display = 'none';
            chartBarrasLinhaVermelha.style.display = 'none';
            chartBarrasLinhaVerde.style.display = 'flex';
        }

    }

    filtrarLinhaEstacao.addEventListener("change", toggleFiltarEstacoesLinhas);

    toggleFiltarEstacoesLinhas();


    // GRÁFICO DE PIZZA:


























    const pizzaGrafico = document.getElementById('pizzaChart').getContext('2d');

    const data = {
        labels: ['Azul', 'Vermelha', 'Verde'],
        datasets: [{
            label: 'Cores',
            data: [0, 321561, 198038], // Valores para cada cor
            backgroundColor: ['blue', 'red', 'green'],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            maintainAspectRatio: false,

            responsive: true, // Faz o gráfico ser responsivo
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const dataset = tooltipItem.dataset;
                            const total = dataset.data.reduce((acc, val) => acc + val, 0);
                            const currentValue = dataset.data[tooltipItem.dataIndex];
                            const percentage = ((currentValue / total) * 100).toFixed(2);
                            return `${dataset.labels[tooltipItem.dataIndex]}: ${currentValue} (${percentage}%)`;
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'right', // Deixa a legenda ao lado (em coluna)
                    labels: {
                        font: {
                            size: 11,
                            fontcolor: 'red',
                            weight: '800'
                        },
                        color: '#4335DE',
                        boxWidth: 13,
                        padding: 10
                    }
                }
            }
        }
    }
    const myPieChart = new Chart(pizzaGrafico, config);


    // GRÁFICO DE BARRAS!!!

    const ctxBarrasAzul = document.getElementById('chartBarrasLinhaAzul').getContext('2d');

    // Dados das estações da Linha Azul
    const dataBarrasAzul = {
        labels: [
            "Jabaquara", "Conceição", "São Judas", "Saúde-Ultrafarma", "Praça da Árvore",
            "Santa Cruz", "Vila Mariana", "Ana Rosa", "Paraíso", "Vergueiro",
            "São Joaquim", "Japão-Liberdade", "Sé", "São Bento", "Luz", "Tiradentes",
            "Armênia", "Portuguesa-Tietê", "Carandiru", "Santana",
            "JD SP-Ayrton Senna", "Parada Inglesa", "Tucuruvi"
        ],
        datasets: [{
            label: 'Movimentação em Janeiro',
            backgroundColor: 'blue',
            borderColor: 'darkblue',
            borderWidth: 1,
            data: [
                63, 23, 13, 35, 41, 81, 50, 64, 80, 21,
                17, 45, 153, 49, 116, 11, 16, 30, 9, 41,
                22, 30, 47
            ],
        }]
    };

    // Criando o gráfico de barras
    const chartBarrasAzul = new Chart(ctxBarrasAzul, {
        type: 'bar',
        data: dataBarrasAzul,
        options: {
            maintainAspectRatio: false,

            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } // Melhora a visibilidade dos nomes
                },
                y: { beginAtZero: true }
            }
        }
    });

    const ctxBarrasVermelha = document.getElementById('chartBarrasLinhaVermelha').getContext('2d');
    const ctxBarrasVerde = document.getElementById('chartBarrasLinhaVerde').getContext('2d');

    // Dados das estações da Linha Vermelha
    const dataBarrasVermelha = {
        labels: [
            "Corinthians-Itaquera", "Artur Alvim", "Patriarca-Vila Ré", "Guilhermina-Esperança", "Vila Matilde",
            "Penha-Lojas Besni", "Carrão-Assaí Atacadista", "Tatuapé", "Belém", "Bresser-Moóca", "Brás",
            "Pedro II", "Sé", "Anhangabaú", "República", "Santa Cecília", "Marechal Deodoro", "Palmeiras-Barra Funda"
        ],
        datasets: [{
            label: 'Movimentação em Janeiro',
            backgroundColor: 'red',
            borderColor: 'darkred',
            borderWidth: 1,
            data: [
                75, 34, 21, 42, 38, 90, 55, 80, 60, 32,
                180, 57, 140, 65, 130, 25, 45, 85
            ],
        }]
    };

    // Criando o gráfico de barras para a Linha Vermelha
    const chartBarrasVermelha = new Chart(ctxBarrasVermelha, {
        type: 'bar',
        data: dataBarrasVermelha,
        options: {
            maintainAspectRatio: false,

            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 }
                },
                y: { beginAtZero: true }
            }
        }
    });

    // Dados das estações da Linha Verde
    const dataBarrasVerde = {
        labels: [
            "Tamanduateí", "Sacomã", "Alto do Ipiranga", "Santos-Imigrantes", "Chácara Klabin",
            "Ana Rosa", "Paraíso", "Brigadeiro", "Trianon-Masp", "Consolação", "Clínicas",
            "Santuário N.S. de Fátima-Sumaré", "Vila Madalena"
        ],
        datasets: [{
            label: 'Movimentação em Janeiro',
            backgroundColor: 'green',
            borderColor: 'darkgreen',
            borderWidth: 1,
            data: [
                50, 27, 35, 30, 45, 100, 78, 55, 40, 62,
                37, 29, 50
            ],
        }]
    };

    // Criando o gráfico de barras para a Linha Verde
    const chartBarrasVerde = new Chart(ctxBarrasVerde, {
        type: 'bar',
        data: dataBarrasVerde,
        options: {
            maintainAspectRatio: false,

            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 }
                },
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfico de Barras para uma estação especifica





// dataBarrasEstacaoAno.data.datasets[0].data= [`${jan}`,`${fev}`,`${Mar}`,`${Abr}`,`${Mai}`,`${Jun}`,`${Jul}`,`${Ago}`,`${Set}`,`${Out}`,`${Nov}`,`${Dez}`]

    function criarGraficoBarras() {
        dataBarrasEstacaoAno = {  // Agora inicializa corretamente antes do uso
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            datasets: [{
                label: `Movimentação`,
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                data: [43, 80, 70, 65, 58, 77, 99, 88, 60, 70, 99, 90],
            }]
        };
        const ctxBarrasEstacaoAno = document.getElementById("dataBarrasEstacaoAno").getContext("2d");
        const chartGraficoBarrasAnoEspecifico = new Chart(ctxBarrasEstacaoAno, {
            type: 'bar',
            data: dataBarrasEstacaoAno,
            options: {
                maintainAspectRatio: false,

                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 }
                    },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    criarGraficoBarras()

    function toggleAnoEstacao() {
        const valorAnoSelecionadoEstacao = ano_todas_estacoes.value;
        kpi_ano_especifico_estacao.innerHTML = valorAnoSelecionadoEstacao;
    }


    // Evento para detectar mudança no select principal
    ano_todas_estacoes.addEventListener("change", toggleAnoEstacao);


    // Exibe o grupo inicial baseado no valor padrão do select principal
    toggleAnoEstacao();