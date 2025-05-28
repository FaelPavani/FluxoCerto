
    function obterNomeUsuario() {
        const nomeUsuario = sessionStorage.getItem("NOME_USUARIO");
        nome_operador_header.innerHTML = `${nomeUsuario}`;

        const cargoUsuario = sessionStorage.getItem("CARGO_USUARIO");
        const emailUsuario = sessionStorage.getItem("EMAIL_USUARIO");


        if (cargoUsuario === "gestor") {
            cargo_header.innerHTML = `Gestor`;

            const selectAno = document.getElementById("ano_todas_estacoes");
            while (selectAno.options.length > 1) {
                selectAno.remove(1);
            }




            const selectanoespecifico = document.getElementById("options_ano_especifico");
            while (selectanoespecifico.options.length > 1) {
                selectanoespecifico.remove(1);
            }

            const selectMain = document.getElementById("mainSelect");

            for (let i = 0; i < selectMain.options.length; i++) {
                if (selectMain.options[i].value === "ano_especifico") {
                    selectMain.selectedIndex = i;
                    break;
                }
            }


            if (selectMain.options.length > 0) {
                selectMain.remove(1);
            }


            const selectanoespecificoestacoes = document.getElementById("options_ano_especifico_estacoes");

            while (selectanoespecificoestacoes.options.length > 1) {
                selectanoespecificoestacoes.remove(1);
            }

        }
        else {
            adduser.style.display = 'none';
            cargo_header.innerHTML = `Analista`;
        }
        //lista de usuarios
        // }
        // else{
        //     adduser.style.display = 'none';
        //     cargo_header.innerHTML = `Analista`;
        // }
        // lista de usuarios

        // fetch("/usuarios/autenticar", {
        //                method: "POST",
        //                headers: {
        //                    "Content-Type": "application/json"
        //                },
        //                body: JSON.stringify({
        //                    emailLogadoserver: emailUsuario

        //                })


        //            }).then(function (resposta) {
        //                console.log("ESTOU NO THEN DO entrar()!")

        //                if (resposta.ok) {
        //                    console.log(resposta);

        //                    resposta.json().then(json => {
        //                        console.log(json);
        //                        console.log(JSON.stringify(json));
        //                        sessionStorage.EMAIL_USUARIO = json.email;
        //                        sessionStorage.NOME_USUARIO = json.username;
        //                        sessionStorage.CARGO_USUARIO = json.cargo

        //                         const emailUsuario = json.email;
        //                         const nomeUsuario = json.username;
        //                         const cargoUsuario = json.cargo;


        //                    setTimeout(function () {
        //                        window.location = "dashboard.html";
        //                    }, 1000); // apenas para exibir o loading

        //                });
        //                fetch('/usuarios/cadastrarOperador', {
        //        method: 'POST',
        //        credentials: 'same-origin',          // importante para enviar cookies
        //        headers: { 'Content-Type': 'application/json' },
        //        body: JSON.stringify({ emaillogadoServer: emailVar })
        //    })

        //            } else {

        //                console.log("Houve um erro ao tentar realizar o login!");

        //                resposta.text().then(texto => {


        //                });
        //            }

        //        }).catch(function (erro) {
        //            console.log(erro);
        //        })

        //        return false;




    }

    function listarUsuariosENaBox() {
        const emailUsuario = sessionStorage.getItem("EMAIL_USUARIO");
        fetch("/usuarios/Listar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailLogadoserver: emailUsuario
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!");
            if (resposta.ok) {
                resposta.json().then(usuarios => {
                    console.log(usuarios);
                    console.log(JSON.stringify(usuarios));


                    const container = document.getElementById("box_usuarios");
                    container.innerHTML = "";
                    usuarios.forEach(usuario => {
                        const html = `
                        <div class="linha_usuario">
                            <div class="fotoUser">
                                <img src="./assets/user_demanda.png" alt="">
                            </div>
                            <div class="nomeUser">
                                <p class="titulos_usuarios">Nome</p>
                                <span class="informacoes_usuarios">${usuario.username}</span>
                            </div>
                            <div class="cpfUser">
                                <p class="titulos_usuarios">CPF</p>
                                <span class="informacoes_usuarios">${usuario.cpf}</span>
                            </div>

                            <div class="div_vazia_mobile"></div>

                            <div class="cargoUser">
                                <p class="titulos_usuarios">Cargo</p>
                                <span class="informacoes_usuarios">${usuario.cargo}</span>
                            </div>
                            <div class="linhaUser">
                                <p class="titulos_usuarios titulo_linha_atuacao">Linha de Atuação</p>
                                <span class="informacoes_usuarios">${usuario.linha}</span>
                            </div>

                            <div class="div_vazia_mobile"></div>

                            <div class="dtInicio">
                                <p class="titulos_usuarios">Data de Início</p>
                                <span class="informacoes_usuarios">${usuario.dataEntrada.substring(0, 10)}</span>
                            </div>
                            <div class="editarUser">
                                <p class="titulos_usuarios">Editar</p>
                                <div class="icones_editar">
                                    <img onclick='abrirEditar(${usuario.id})' src="./assets/lapis_icon.png" alt="Editar">
                                    <img onclick='mostrarConfirmacao(${usuario.id})' src="./assets/lixeira_icon.png" alt="Excluir">
                                </div>
                            </div>
                        </div>
                    `;
                        container.innerHTML += html;
                    });
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                resposta.text().then(texto => {
                    console.log(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        });

        return false;
    }









    function verificarTamanhoTela() {
        const menuHamburguer = document.querySelector(".menuHamburguer");

        if (window.innerWidth > 425) {
            menuHamburguer.style.display = "none";
        } else {
            menuHamburguer.style.display = "flex";
        }
    }

    // Verifica ao carregar a página
    window.addEventListener("load", verificarTamanhoTela);

    // Verifica ao redimensionar a janela
    window.addEventListener("resize", verificarTamanhoTela);


    const menuLateral = document.getElementById("menuLateral");
    const abrir = document.querySelector(".menuHamburguer");
    const fechar = document.querySelector(".fecharHamburguer");
    const overlay = document.getElementById("overlay");

    function abrirMenu() {
        menuLateral.classList.add("ativo");
        overlay.classList.add("ativo");
        document.body.classList.add("menu-aberto");

        abrir.style.display = "none";
        fechar.style.display = "flex";
    }

    function fecharMenu() {

        menuLateral.classList.remove("ativo");
        overlay.classList.remove("ativo");
        document.body.classList.remove("menu-aberto");

        abrir.style.display = "flex";
        fechar.style.display = "none";
        verificarTamanhoTela()

    }

    abrir.addEventListener("click", abrirMenu);
    fechar.addEventListener("click", fecharMenu);
    overlay.addEventListener("click", fecharMenu);


    // Lógica dos selects


    function addUser() {
        mainDashboards.style.display = 'none';
        mainUsers.style.display = 'flex'
        fecharMenu();
        boxConfig.style.display = 'none';
        configUsuario.style.display = 'none'
        caixaMensagem.style.display = 'none'
        caixaEditarMensagem.style.display = 'none'
        caixaEscreverMensagem.style.display = 'none'

    }
    function homeDashboards() {

        mainDashboards.style.display = 'flex';
        mainUsers.style.display = 'none'
        fecharMenu();
        configUsuario.style.display = 'none'

        caixaEditarMensagem.style.display = 'none'
        caixaMensagem.style.display = 'none'
        caixaEscreverMensagem.style.display = 'none'

    }

    function configUser() {
        mainDashboards.style.display = 'none';
        mainUsers.style.display = 'none'
        configUsuario.style.display = 'flex'
        boxConfig.style.display = 'flex';
        caixaEditar.style.display = 'none';
        caixaEditarMensagem.style.display = 'none'
        blurExcluirConta.style.display = 'none'
        caixaExcluirConta.style.display = 'none'


        caixaMensagem.style.display = 'none'
        caixaEscreverMensagem.style.display = 'none'
    }
    function mensagemUser() {
        mainDashboards.style.display = 'none';
        mainUsers.style.display = 'none'
        configUsuario.style.display = 'none'
        caixaEditarMensagem.style.display = 'none'
        boxConfig.style.display = 'none';
        caixaEditar.style.display = 'none';
        blurExcluirConta.style.display = 'none'
        caixaExcluirConta.style.display = 'none'

        caixaMensagem.style.display = 'flex'
        caixaEscreverMensagem.style.display = 'none'

        certeza_exclusao_mensagem.style.display = 'none'
        blur_certeza_excluir.style.display = 'none'
    }

    function sairDashboard() {
        document.getElementById('blur').style.display = 'flex'
        caixa_saindo.style.display = 'block'
        caixa_saindo.style.opacity = 1;
        localStorage.clear();
        setTimeout(function () {
            window.location.replace("index.html");
        }, 1000);
    }

    function addUsuario() {
        gerenciarUsuarios.style.display = 'none'
        // colocar pra flex dps
        adicionarUsuario.style.display = 'flex'

    }


    function fecharAddUser() {
        adicionarUsuario.style.display = 'none'
        gerenciarUsuarios.style.display = 'block'
    }





    // Validações já existentes para os outros campos (nome, email, etc.)...
    var nomeValido = false;
    var sobrenomeValido = false;
    var cpfValido = false;
    var dtNascValido = false;
    var telefoneValido = false;
    var emailValido = false;
    var cargoValido = false;
    var linhaAtuacaoValido = false;

    const nomeInput = document.getElementById("nomeUser");
    const sobrenomeInput = document.getElementById("sobrenomeUser");
    const emailInput = document.getElementById("emailUser");
    const cargoSelect = document.getElementById("cargo_valores");
    const linhaSelect = document.getElementById("linha_valores");

    nomeInput.addEventListener("input", () => {
        if (nomeInput.value.trim().length > 0) {
            nomeValido = true;
            nomeInput.style.borderColor = 'green';
        } else {
            nomeValido = false;
            nomeInput.style.borderColor = 'red';
        }
    });

    sobrenomeInput.addEventListener("input", () => {
        if (sobrenomeInput.value.trim().length > 0) {
            sobrenomeValido = true;
            sobrenomeInput.style.borderColor = 'green';
        } else {
            sobrenomeValido = false;
            sobrenomeInput.style.borderColor = 'red';
        }
    });

    emailInput.addEventListener("input", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value.trim())) {
            emailValido = true;
            emailInput.style.borderColor = 'green';
        } else {
            emailValido = false;
            emailInput.style.borderColor = 'red';
        }
    });

    cargoSelect.addEventListener("change", () => {
        if (cargoSelect.value !== "") {
            cargoValido = true;
            cargoSelect.style.borderColor = 'green';
        } else {
            cargoValido = false;
            cargoSelect.style.borderColor = 'red';
        }
    });

    linhaSelect.addEventListener("change", () => {
        if (linhaSelect.value !== "") {
            linhaAtuacaoValido = true;
            linhaSelect.style.borderColor = 'green';
        } else {
            linhaAtuacaoValido = false;
            linhaSelect.style.borderColor = 'red';
        }
    });

    // Máscara para Data de Nascimento
    const inputDataNasc = document.getElementById("dataNasc");
    inputDataNasc.addEventListener("input", () => {
        let valorDataNasc = inputDataNasc.value.replace(/\D/g, '');
        if (valorDataNasc.length > 4 && valorDataNasc.length <= 6) {
            valorDataNasc = valorDataNasc.slice(0, 4) + '-' + valorDataNasc.slice(4);
        } else if (valorDataNasc.length > 6) {
            valorDataNasc = valorDataNasc.slice(0, 4) + '-' + valorDataNasc.slice(4, 6) + '-' + valorDataNasc.slice(6, 8);
        }
        inputDataNasc.value = valorDataNasc;
        if (valorDataNasc.length === 10) {
            inputDataNasc.style.borderColor = 'green';
            dtNascValido = true;
        } else {
            inputDataNasc.style.borderColor = 'red';
            dtNascValido = false;
        }
    });

    // Máscara para Telefone
    const telefoneInput = document.getElementById("telefoneUser");
    telefoneInput.addEventListener("input", () => {
        let valor = telefoneInput.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);
        if (valor.length > 6) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
        } else if (valor.length > 2) {
            valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
        } else if (valor.length > 0) {
            valor = `(${valor}`;
        }
        telefoneInput.value = valor;
        if (valor.length === 15) {
            telefoneValido = true;
            telefoneInput.style.borderColor = 'green';
        } else {
            telefoneValido = false;
            telefoneInput.style.borderColor = 'red';
        }
    });

    // Máscara para CPF
    const cpfInput = document.getElementById("cpfUser");
    cpfInput.addEventListener("input", () => {
        let valor = cpfInput.value.replace(/\D/g, '');
        if (valor.length > 11) valor = valor.slice(0, 11);
        if (valor.length > 9) {
            valor = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6, 9)}-${valor.slice(9)}`;
        } else if (valor.length > 6) {
            valor = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6)}`;
        } else if (valor.length > 3) {
            valor = `${valor.slice(0, 3)}.${valor.slice(3)}`;
        }
        cpfInput.value = valor;
        if (valor.length === 14) {
            cpfValido = true;
            cpfInput.style.borderColor = 'green';
        } else {
            cpfValido = false;
            cpfInput.style.borderColor = 'red';
        }
    });


    // -------------------------------
    // Validação de senha
    // -------------------------------
    const senhaInput = document.getElementById("senhaUser");
    const confirmSenhaInput = document.getElementById("confirmSenhaUser");

    // Elementos de feedback para as regras
    const senhasIdenticasEl = document.getElementById("senhasIdenticas");
    const qtdCaractereEl = document.getElementById("qtdCaractere");
    const minusculaEl = document.getElementById("minuscula");
    const maiusculaEl = document.getElementById("maiuscula");
    const caractereEspecialEl = document.getElementById("caractereEspecial");
    const numeroEl = document.getElementById("numero");

    // Função que realiza a validação a cada input de senha
    function validatePassword() {
        const senha = senhaInput.value;
        const confirmSenha = confirmSenhaInput.value;

        // Validação: Pelo menos 8 caracteres
        if (senha.length >= 8) {
            qtdCaractereEl.innerHTML = "&#10004; Pelo menos 8 caracteres";
            qtdCaractereEl.style.color = "green";
        } else {
            qtdCaractereEl.innerHTML = "&#10006; Pelo menos 8 caracteres";
            qtdCaractereEl.style.color = "red";
        }

        // Validação: Uma letra minúscula
        if (/[a-z]/.test(senha)) {
            minusculaEl.innerHTML = "&#10004; Uma letra minúscula";
            minusculaEl.style.color = "green";
        } else {
            minusculaEl.innerHTML = "&#10006; Uma letra minúscula";
            minusculaEl.style.color = "red";
        }

        // Validação: Uma letra maiúscula
        if (/[A-Z]/.test(senha)) {
            maiusculaEl.innerHTML = "&#10004; Uma letra maiúscula";
            maiusculaEl.style.color = "green";
        } else {
            maiusculaEl.innerHTML = "&#10006; Uma letra maiúscula";
            maiusculaEl.style.color = "red";
        }

        // Validação: Um caractere especial
        if (/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            caractereEspecialEl.innerHTML = "&#10004; Um caractere especial";
            caractereEspecialEl.style.color = "green";
        } else {
            caractereEspecialEl.innerHTML = "&#10006; Um caractere especial";
            caractereEspecialEl.style.color = "red";
        }

        // Validação: Um número
        if (/\d/.test(senha)) {
            numeroEl.innerHTML = "&#10004; Um número";
            numeroEl.style.color = "green";
        } else {
            numeroEl.innerHTML = "&#10006; Um número";
            numeroEl.style.color = "red";
        }

        // Validação: Senhas idênticas (apenas se houver conteúdo em ambos os campos)
        if (senha && confirmSenha) {
            if (senha === confirmSenha) {
                senhasIdenticasEl.innerHTML = "&#10004; As senhas são idênticas";
                senhasIdenticasEl.style.color = "green";
            } else {
                senhasIdenticasEl.innerHTML = "&#10006; As senhas devem ser idênticas";
                senhasIdenticasEl.style.color = "red";
            }
        } else {
            // Se um dos campos estiver vazio, mantenha o feedback inicial
            senhasIdenticasEl.innerHTML = "&#10006; As senhas devem ser idênticas";
            senhasIdenticasEl.style.color = "red";
        }
    }

    // Dispara as validações enquanto o usuário digita
    senhaInput.addEventListener("input", validatePassword);
    confirmSenhaInput.addEventListener("input", validatePassword);


    // -------------------------------
    // Função para concluir o cadastro
    // -------------------------------
    function concluirCadastroOperador() {
        // Aqui você pode incluir uma verificação se todos os campos (inclusive a senha) estão válidos.
        // Por exemplo, além das variáveis já validadas, valide também se:
        // - A senha atende a todas as regras
        // - A senha e a confirmação são idênticas
        if (
            nomeValido &&
            sobrenomeValido &&
            cpfValido &&
            dtNascValido &&
            telefoneValido &&
            emailValido &&
            cargoValido &&
            linhaAtuacaoValido &&
            senhaInput.value.length >= 8 &&
            /[a-z]/.test(senhaInput.value) &&
            /[A-Z]/.test(senhaInput.value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(senhaInput.value) &&
            /\d/.test(senhaInput.value) &&
            (senhaInput.value === confirmSenhaInput.value)
        ) {
            // alert("Cadastro concluído com sucesso!");
            // // Limpe os campos (exemplo)
            // nomeInput.value = '';
            // sobrenomeInput.value = '';
            // cpfInput.value = '';
            // inputDataNasc.value = '';
            // telefoneInput.value = '';
            // emailInput.value = '';
            // cargoSelect.value = 'Selecione o cargo';
            // linhaSelect.value = 'Selecione a linha';
            // senhaInput.value = '';
            // confirmSenhaInput.value = '';


            var emailLogado = sessionStorage.getItem("EMAIL_USUARIO");

            // Enviando o valor da nova input
            fetch("/usuarios/cadastrarOperador", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/usuario.js    




                    // setar os nnomes no json que vai para o post e vai salvar setar variavies
                    serverNome: nomeInput.value,
                    serverSobrenome: sobrenomeInput.value,
                    serverCpf: cpfInput.value,
                    serverDataNasc: inputDataNasc.value,
                    serverTelefone: telefoneInput.value,
                    serverEmail: emailInput.value,
                    serverCargo: cargoSelect.value,
                    serverLinha: linhaSelect.value,
                    serverSenha: senhaInput.value,
                    serverEmailLogado: emailLogado
                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);

                    if (resposta.ok) {




                    } else {
                        throw "Houve um erro ao tentar realizar o cadastro!";
                    }
                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);

                });

            return false;


        } else {
            alert("Informações incorretas ou faltando!");
        }
        const cabecalho_dashboard = document.querySelector('.cabecalho_dashboard');
        let lastScrollTop = 0;

        window.addEventListener("scroll", () => {
            let scrollTop = window.scrollY;

            if (scrollTop > lastScrollTop) {
                // Rolando para baixo, esconde o cabeçalho
                cabecalho_dashboard.classList.add("hidden");
            } else {
                // Rolando para cima, exibe o cabeçalho
                cabecalho_dashboard.classList.remove("hidden");
            }

            lastScrollTop = scrollTop;
        });


    }

    function mostrarConfirmacao(idUsuario) {
        boxConfirmarExcluir.style.display = 'flex';
        fundoEscuro.style.display = 'flex'
        sessionStorage.setItem("idUsuario", idUsuario);



    }


    function fecharExcluir() {
        boxConfirmarExcluir.style.display = 'none';
        fundoEscuro.style.display = 'none'



    }


    function excluir(valor) {
        // Inserir a função para excluir o analista
        valor = sessionStorage.getItem("idUsuario");

        alert(valor)
        fetch("/usuarios/deletarUsuario", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idDelete: valor })
        })
            .then(resposta => {
                if (resposta.ok) {
                    alert("Usuário deletado com sucesso!");
                    // Aqui você pode chamar a função para atualizar a lista de usuários, por exemplo:
                    listarUsuariosENaBox();
                } else {
                    return resposta.text().then(texto => { throw new Error(texto); });
                }
            })
            .catch(erro => {
                console.error("Erro ao deletar usuário:", erro);
                alert("Erro ao deletar usuário: " + erro.message);
            });



















        mensagemExcluirOk.style.display = 'flex'


        // se der certo a exclusão
        setTimeout(() => {
            mensagemExcluirOk.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            mensagemExcluirOk.style.opacity = '0';

            setTimeout(() => {
                mensagemExcluirOk.style.display = 'none';
            }, 1000);
        }, 1500);


        // se der erro:
        // setTimeout(() => {
        //       mensagemExcluirErro.style.opacity = '1';
        //     }, 10);

        //     setTimeout(() => {
        //       mensagemExcluirErro.style.opacity = '0';

        //       setTimeout(() => {
        //         mensagemExcluirErro.style.display = 'none';
        //       }, 1000); 
        //     }, 1500);




        // depois de excluir o analista
        fecharExcluir()
    }


    // Variável global para armazenar os dados originais
    let dadosOriginais = null;

    function abrirEditar(idUsuario) {
        const gerenciarUsuarios = document.getElementById("gerenciarUsuarios");
        const editarUsuarios = document.getElementById("editarUsuarios");

        gerenciarUsuarios.style.display = 'none';
        editarUsuarios.style.display = 'block';

        fetch("/usuarios/editare", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: idUsuario
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(dados => {
                    const usuario = Array.isArray(dados) ? dados[0] : dados;

                    document.getElementById("nomeEditar").value = usuario.username || '';
                    document.getElementById("cpfEditar").value = usuario.cpf || '';
                    document.getElementById("senhaEditar").value = usuario.senha || '';
                    document.getElementById("cargoEditar").value = usuario.cargo || '';
                    document.getElementById("linhaEditar").value = usuario.linha || '';

                    // Armazena dados originais para futura comparação
                    dadosOriginais = {
                        id: idUsuario,
                        username: usuario.username,
                        cpf: usuario.cpf,
                        senha: usuario.senha,
                        cargo: usuario.cargo,
                        linha: usuario.linha
                    };
                });
            } else {
                resposta.text().then(texto => console.error(texto));
            }
        }).catch(function (erro) {
            console.error("Erro na requisição:", erro);
        });
    }

    function confirmacaoDescartar() {
        boxConfirmarFechar.style.display = 'flex';
        fundoEscuro.style.display = 'flex';
    }

    function fecharConfirmacao() {
        boxConfirmarFechar.style.display = 'none';
        fundoEscuro.style.display = 'none';
    }

    function descartar() {
        gerenciarUsuarios.style.display = 'block';
        boxConfirmarFechar.style.display = 'none';
        fundoEscuro.style.display = 'none';
        editarUsuarios.style.display = 'none';
    }
    const dadosAtualizados = {}
    function salvarAlteracoes() {
        if (!dadosOriginais) {
            alert("Erro: dados originais não carregados.");
            return;
        }

        // Captura os valores atuais dos inputs e remove espaços
        const nomeAtual = document.getElementById("nomeEditar").value.trim();
        const cpfAtual = document.getElementById("cpfEditar").value.trim();
        const senhaAtual = document.getElementById("senhaEditar").value.trim();
        const cargoAtual = document.getElementById("cargoEditar").value.trim();
        const linhaAtual = document.getElementById("linhaEditar").value.trim();

        // Converte os dados originais para string e remove espaços
        const nomeOriginal = String(dadosOriginais.username).trim();
        const cpfOriginal = String(dadosOriginais.cpf).trim();
        const senhaOriginal = String(dadosOriginais.senha).trim();
        const cargoOriginal = String(dadosOriginais.cargo).trim();
        const linhaOriginal = String(dadosOriginais.linha).trim();

        const houveAlteracao = (
            nomeOriginal !== nomeAtual ||
            cpfOriginal !== cpfAtual ||
            senhaOriginal !== senhaAtual ||
            cargoOriginal !== cargoAtual ||
            linhaOriginal !== linhaAtual
        );

        if (houveAlteracao) {


            const dadosAtualizados = {
                id: dadosOriginais.id,
                username: nomeAtual,
                cpf: cpfAtual,
                senha: senhaAtual,
                cargo: cargoAtual,
                linha: linhaAtual
            };

            atualizarUsuario(dadosAtualizados);

            gerenciarUsuarios.style.display = 'block';
            boxConfirmarFechar.style.display = 'none';
            fundoEscuro.style.display = 'none';
            editarUsuarios.style.display = 'none';

            mensagemAlteracaoOk.style.display = 'flex';
            mensagemAlteracaoOk.style.opacity = '1';

            setTimeout(() => {
                mensagemAlteracaoOk.style.opacity = '1';
            }, 10);

            setTimeout(() => {
                mensagemAlteracaoOk.style.opacity = '0';
                setTimeout(() => {
                    mensagemAlteracaoOk.style.display = 'none';
                }, 1000);
            }, 1500);



        } else {
            alert("Nenhuma alteração foi feita.");
        }
    }

    // Essa é a função que será chamada no final
    function atualizarUsuario(dadosAtualizados) {
        console.log("Função pós-salvamento chamada com os dados:", dadosAtualizados);

        fetch("/usuarios/atualizarUsuario", {
            method: "POST", // ou "POST", conforme configurado no seu back-end
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados) // Correção aqui
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao salvar no servidor.");
                }
                return res.json();
            })
            .then(res => {
                console.log("Alterações salvas com sucesso:", res);
                listarUsuariosENaBox()
            })
            .catch(erro => {
                console.error("Erro ao salvar:", erro);
                listarUsuariosENaBox()
            });






    }







    // se der erro:
    //   setTimeout(() => {
    //       mensagemAlteracaoErro.style.opacity = '1';
    //     }, 10);

    //     // Após 2 segundos, inicia o fade-out
    //     setTimeout(() => {
    //       mensagemAlteracaoErro.style.opacity = '0';

    //       // Após a transição de opacidade, esconde a div totalmente
    //       setTimeout(() => {
    //         mensagemAlteracaoErro.style.display = 'none';
    //       }, 1000); // 1s = tempo da transição
    //     }, 1500);



    const campoSenha = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");
    const botaoSalvar = document.getElementById("btnSalvar");
    const mensagemSucesso = document.getElementById("mensagemSucesso");

    const regras = {
        iguais: document.getElementById("infoSenha_iguais"),
        qtdCaractere: document.getElementById("infoSenha_qtdCaractere"),
        minuscula: document.getElementById("infoSenha_minuscula"),
        maiuscula: document.getElementById("infoSenha_maiuscula"),
        caractereEspecial: document.getElementById("infoSenha_caractereEspecial"),
        numero: document.getElementById("infoSenha_numero")
    };

    let estadoValidacoes = {
        iguais: false,
        qtdCaractere: false,
        minuscula: false,
        maiuscula: false,
        caractereEspecial: false,
        numero: false
    };

    function validarSenha() {
        const senha = campoSenha.value;
        const confirmarSenha = confirmarSenhaInput.value;

        estadoValidacoes.qtdCaractere = senha.length >= 8;
        estadoValidacoes.minuscula = /[a-z]/.test(senha);
        estadoValidacoes.maiuscula = /[A-Z]/.test(senha);
        estadoValidacoes.caractereEspecial = /[^A-Za-z0-9]/.test(senha);
        estadoValidacoes.numero = /[0-9]/.test(senha);
        estadoValidacoes.iguais = senha === confirmarSenha && senha !== "";

        atualizarItem(regras.qtdCaractere, estadoValidacoes.qtdCaractere);
        atualizarItem(regras.minuscula, estadoValidacoes.minuscula);
        atualizarItem(regras.maiuscula, estadoValidacoes.maiuscula);
        atualizarItem(regras.caractereEspecial, estadoValidacoes.caractereEspecial);
        atualizarItem(regras.numero, estadoValidacoes.numero);
        atualizarItem(regras.iguais, estadoValidacoes.iguais);

    }

    function atualizarItem(elemento, valido) {
        if (valido) {
            elemento.innerHTML = "&#10004; " + elemento.textContent.slice(2);
            elemento.style.color = "green";
        } else {
            elemento.innerHTML = "&#10006; " + elemento.textContent.slice(2);
            elemento.style.color = "red";
        }
    }

    campoSenha.addEventListener("input", validarSenha);
    confirmarSenhaInput.addEventListener("input", validarSenha);

 // variável acessível globalmente

botaoSalvar.addEventListener("click", () => {
    validarSenha(); // Garante validação antes de salvar

    const tudoValido = Object.values(estadoValidacoes).every(Boolean);

    if (tudoValido) {
        mensagemSucesso.style.display = "flex";
        mensagemSucesso.style.opacity = 1;

        setTimeout(() => {
            mensagemSucesso.style.opacity = 0;
            mensagemSucesso.style.display = "none";
            configUser(); // Atualiza configurações após salvar
        }, 3000);
    } else {
        alert("Por favor, preencha todos os requisitos da senha corretamente.");
        return; // Para aqui se não for válido
    }

    // Captura os valores atuais
    const nomeAtual = document.getElementById("nomeSelf").value;
    const senhaAtual = document.getElementById("senhaSelf").value;
    const cpfAtual = document.getElementById("cpfSelf").value;
    const emailAtual = document.getElementById("emailSelf").value;

    // Verifica se houve alteração
    const houveMudanca =
        dadosAntigos1.nomeAntigo !== nomeAtual ||
        dadosAntigos1.senhaAntigo !== senhaAtual ||
        dadosAntigos1.cpfAntigo !== cpfAtual ||
        dadosAntigos1.emailAntigo !== emailAtual;

    if (houveMudanca) {
        const novosDados = {
            username: nomeAtual,
            senha: senhaAtual,
            cpf: cpfAtual,
            email: emailAtual
        };

        fetch("/usuarios/atualizarSelf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novosDados)
        })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao atualizar.");
            return res.json();
        })
        .then(data => {
            alert("Dados atualizados com sucesso!");
        })
        .catch(erro => {
            console.error("Erro ao atualizar:", erro);
            alert("Erro ao atualizar.");
        });
    } else {
        alert("Nenhuma alteração detectada.");
    }
});

function alterarInfo() {
    boxConfig.style.display = 'none';
    caixaEditar.style.display = 'grid';

    const emailLogado = sessionStorage.getItem("EMAIL_USUARIO");

    if (!emailLogado) {
        alert("Email não encontrado no sessionStorage.");
        return;
    }

    fetch("/usuarios/selfEdit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: emailLogado })
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro na requisição.");
        return res.json();
    })
    .then(usuario => {
        // Preenche inputs
        nomeSelf.value = usuario.username;
        senhaSelf.value = usuario.senha;
        cpfSelf.value = usuario.cpf;
        emailSelf.value = emailLogado;

        // Salva dados antigos para comparação futura
        dadosAntigos1 = {
            nomeAntigo: nomeSelf.value,
            senhaAntigo: senhaSelf.value,
            cpfAntigo: cpfSelf.value,
            emailAntigo: emailSelf.value
        };

        console.log("Nome:", usuario.username);
        console.log("CPF:", usuario.cpf);
        console.log("Senha:", usuario.senha);
    })
    .catch(erro => {
        console.error("Erro ao buscar usuário:", erro);
    });
}
let dadosAntigos1 = {}; // variável acessível globalmente

botaoSalvar.addEventListener("click", () => {
    validarSenha(); // Garante validação antes de salvar

    const tudoValido = Object.values(estadoValidacoes).every(Boolean);

    if (tudoValido) {
        mensagemSucesso.style.display = "flex";
        mensagemSucesso.style.opacity = 1;

        setTimeout(() => {
            mensagemSucesso.style.opacity = 0;
            mensagemSucesso.style.display = "none";
            configUser(); // Atualiza configurações após salvar
        }, 3000);
    } else {
        alert("Por favor, preencha todos os requisitos da senha corretamente.");
        return; // Para aqui se não for válido
    }

    // Captura os valores atuais
    const nomeAtual = document.getElementById("nomeSelf").value;
    const senhaAtual = document.getElementById("senhaSelf").value;
    const cpfAtual = document.getElementById("cpfSelf").value;
    const emailAtual = document.getElementById("emailSelf").value;

    // Verifica se houve alteração
    const houveMudanca =
        dadosAntigos1.nomeAntigo !== nomeAtual ||
        dadosAntigos1.senhaAntigo !== senhaAtual ||
        dadosAntigos1.cpfAntigo !== cpfAtual ||
        dadosAntigos1.emailAntigo !== emailAtual;

    if (houveMudanca) {
        const novosDados = {
            username: nomeAtual,
            senha: senhaAtual,
            cpf: cpfAtual,
            email: emailAtual
        };

        fetch("/usuarios/atualizarSelf", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novosDados)
        })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao atualizar.");
            return res.json();
        })
        .then(data => {
            alert("Dados atualizados com sucesso!");
        })
        .catch(erro => {
            console.error("Erro ao atualizar:", erro);
            alert("Erro ao atualizar.");
        });
    } else {
        alert("Nenhuma alteração detectada.");
    }
});

function alterarInfo() {
    boxConfig.style.display = 'none';
    caixaEditar.style.display = 'grid';

    const emailLogado = sessionStorage.getItem("EMAIL_USUARIO");

    if (!emailLogado) {
        alert("Email não encontrado no sessionStorage.");
        return;
    }

    fetch("/usuarios/selfEdit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: emailLogado })
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro na requisição.");
        return res.json();
    })
    .then(usuario => {
        // Preenche inputs
        nomeSelf.value = usuario.username;
        senhaSelf.value = usuario.senha;
        cpfSelf.value = usuario.cpf;
        emailSelf.value = emailLogado;

        // Salva dados antigos para comparação futura
        dadosAntigos1 = {
            nomeAntigo: nomeSelf.value,
            senhaAntigo: senhaSelf.value,
            cpfAntigo: cpfSelf.value,
            emailAntigo: emailSelf.value
        };

        console.log("Nome:", usuario.username);
        console.log("CPF:", usuario.cpf);
        console.log("Senha:", usuario.senha);
    })
    .catch(erro => {
        console.error("Erro ao buscar usuário:", erro);
    });
}


    function alterarInfo() {
            boxConfig.style.display = 'none'
            caixaEditar.style.display = 'grid';




            const emailLogado = sessionStorage.getItem("EMAIL_USUARIO");


            if (!emailLogado) {
                alert("Email não encontrado no sessionStorage.");
                return;
            }

            fetch("/usuarios/selfEdit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: emailLogado })
            })
                .then(res => {
                    if (!res.ok) throw new Error("Erro na requisição.");
                    return res.json();
                })
                .then(usuario => {
                    // Atribuindo os dados a variáveis
                    const nomeUsuario = usuario.username;
                    const cpfUsuario = usuario.cpf;
                    const senhaUsuario = usuario.senha;


                    senhaL = usuario.senha
                    nomeL = usuario.username
                    cpfL = usuario.cpf

                    nomeSelf.value = nomeL
                    senhaSelf.value = senhaL
                    cpfSelf.value = cpfL
                    emailSelf.value = emailLogado




                    dadosAntigos1 = {

                        nomeAntigo: nomeSelf.value,
                        senhaAntigo: senhaSelf.value,
                        cpfAntigo: cpfSelf.value,
                        emailAntigo: emailSelf.value


                    }







                    // Exibindo no console (ou use como preferir)
                    console.log("Nome:", nomeUsuario);
                    console.log("CPF:", cpfUsuario);
                    console.log("Senha:", senhaUsuario);

                    // Você também pode usar essas variáveis para preencher inputs, por exemplo:
                    // document.getElementById("inputNome").value = nomeUsuario;
                })
                .catch(erro => {
                    console.error("Erro ao buscar usuário:", erro);
                });
        }




        
    

    function excluirConta() {
            blurExcluirConta.style.display = 'flex'
            caixaExcluirConta.style.display = 'flex'
        }
    function novaMensagem() {
            caixaMensagem.style.display = 'none'
            caixaEscreverMensagem.style.display = 'flex'
        }
    function editarMensagem() {
            caixaEditarMensagem.style.display = 'flex'
            caixaMensagem.style.display = 'none'

        }
    function excluirMensagem() {
            certeza_exclusao_mensagem.style.display = 'block';
            blur_certeza_excluir.style.display = 'block'
        }
    function certezaExcluirMensagem() {
            excluirMensagemOk.style.display = 'flex'
            excluirMensagemOk.style.opacity = '1'

            setTimeout(() => {
                excluirMensagemOk.style.opacity = '0'
                excluirMensagemOk.style.display = 'none'
            }, 3000); // some depois de 3 segundos
            mensagemUser()




            // ou se der erro:
            // excluirMensagemErro.style.display = 'flex'
            // excluirMensagemErro.style.opacity='1'

            //          setTimeout(() => {
            //              excluirMensagemErro.style.opacity='0'
            // excluirMensagemErro.style.display='none'
            //                 configUser()
            //             }, 3000); // some depois de 3 segundos
            //             mensagemUser()
        }