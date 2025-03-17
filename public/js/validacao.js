var emailValido = false;
var senhaValido = false; // Supondo que você implementará a validação da senha
var cnpjValido = false;
var fantasiaValido = false;
var razaoValido = false;

function mostrarErro(elementoInput, mensagem) {
    elementoInput.style.border = 'solid red 2px';
    spanErro.style.display = 'flex';
    spanErro.innerHTML = mensagem;
}

function limparErro(elementoInput) {
    elementoInput.style.border = 'solid #30B945 2px';
    spanErro.style.display = 'none';
    spanErro.innerHTML = '';
}

function validarEmail() {
    var email = inpEmail.value;
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex básico para email

    if (email === '') {
        mostrarErro(inpEmail, "Email não pode estar vazio.");
        mensagem_erro_email.style.display = 'flex'
    } else if (regexEmail.test(email)) {
        emailValido = true;
        limparErro(inpEmail);
    } else {
        mostrarErro(inpEmail, "Email deve conter @ e um domínio válido.");
    }
}

function validarCnpj() {
    var cnpj = inpCnpj.value;
    var cnpjLetras = cnpj.match(/[A-Z]/g);

    if (cnpj == '') {
        inpCnpj.style.border = '2px solid red'
        mensagem_erro_cnpj.style.display = 'flex'
    } else if (cnpj.length == 14 && cnpjLetras == null) {
        cnpjValido = true;
        limparErro(inpCnpj);
        mensagem_erro_cnpj.style.display = 'none'
    } else {
        mostrarErro(inpCnpj, "CNPJ deve conter 14 caracteres e conter apenas números.");
    }
}

function validarFantasia() {
    var nome_fantasia = inpNomeFantasia.value;

    if (nome_fantasia == '') {
        mostrarErro(inpNomeFantasia, "Nome fantasia não pode estar vazio.");
        mensagem_erro_fantasia.style.display = 'flex'
        fantasiaValido = false;
    } else {
        mensagem_erro_fantasia.style.display = 'none'
        fantasiaValido = true;
        limparErro(inpNomeFantasia);
    }
}

function validarSocial() {
    var razao_social = inpRazaoSocial.value;

    if (razao_social === '') {
        mostrarErro(inpRazaoSocial, "Razão social não pode estar vazia.");
        mensagem_erro_social.style.display = 'flex'
        razaoValido = false;
    } else {
        mensagem_erro_social.style.display = 'none'
        razaoValido = true;
        limparErro(inpRazaoSocial);
    }
}

var step1 = false;
function form_step1() {
        validarFantasia();
    validarSocial();
    validarEmail();
    validarCnpj();

    if (fantasiaValido && razaoValido && emailValido && cnpjValido) {
        document.getElementById('stepOne').style.display = 'none';
        stepTwo.style.display = 'grid'
        button_concluir.style.display = 'flex'
        button_proximo.style.display = 'none'
        step1 = true;
    } else {
        alert('Preencha todos os campos corretamente!');
    }
}




function validarSenha() {
        var senha = inpSenha.value;
        var confirma = inpConfirma.value;

        senhaValido = 0;

        var senhaUpper = senha.toUpperCase();
        var senhaLower = senha.toLowerCase();

        var senhaEspecial = senha.includes('!') ||
                senha.includes('@') ||
                senha.includes('#') ||
                senha.includes('$') ||
                senha.includes('%') ||
                senha.includes('&') ||
                senha.includes('*') ||
                senha.includes('+') ||
                senha.includes('=');

        var senhaNumero = senha.includes('0') ||
                senha.includes('1') ||
                senha.includes('2') ||
                senha.includes('3') ||
                senha.includes('4') ||
                senha.includes('5') ||
                senha.includes('6') ||
                senha.includes('7') ||
                senha.includes('8') ||
                senha.includes('9');

        if (senha == '') {
                erroSenha.style.display = 'none';
                inpSenha.style.border = 'solid red 2px';
        } else if (senha != '') {
                erroSenha.style.display = 'flex';
                inpSenha.style.border = 'solid red 2px';

                if (senha.length >= 8) {
                        qtdCaractere.innerHTML = '&#10004; Pelo menos 8 caracteres'
                        qtdCaractere.style.color = '#30B945';
                        senhaValido++;
                } else {
                        qtdCaractere.innerHTML = '&#10006; Pelo menos 8 caracteres'
                        qtdCaractere.style.color = 'red';
                }
                if (senha != senhaLower) {
                        maiuscula.innerHTML = '&#10004; Uma letra maiúscula'
                        maiuscula.style.color = '#30B945';
                        senhaValido++;
                } else {
                        maiuscula.innerHTML = '&#10006; Uma letra maiúscula'
                        maiuscula.style.color = 'red';
                }
                if (senha != senhaUpper) {
                        minuscula.innerHTML = '&#10004; Uma letra minúscula'
                        minuscula.style.color = '#30B945';
                        senhaValido++;
                } else {
                        minuscula.innerHTML = '&#10006; Uma letra minúscula'
                        minuscula.style.color = 'red';
                }
                if (senhaEspecial) {
                        caractereEspecial.innerHTML = '&#10004; Um caractere especial'
                        caractereEspecial.style.color = '#30B945';
                        senhaValido++;
                } else {
                        caractereEspecial.innerHTML = '&#10006; Um caractere especial'
                        caractereEspecial.style.color = 'red';
                }
                if (senhaNumero) {
                        numero.innerHTML = '&#10004; Um número'
                        numero.style.color = '#30B945';
                        senhaValido++;
                } else {
                        numero.innerHTML = '&#10006; Um número'
                        numero.style.color = 'red';
                }

                if (senhaValido == 5) {
                        senhaValido = true;
                        inpSenha.style.border = 'solid #30B945 2px';
                } else {
                        senhaValido = false;
                }
        } else if (senha != confirma) {
                spanErro.innerHTML += '&#10006;As senhas devem ser idênticas!';
                spanErro.style.color = 'red'
                inpSenha.style.border = 'solid red 2px';
                inpConfirma.style.border = 'solid red 2px';
        } else {
                spanErro.innerHTML = 'As senhas devem ser idênticas!'
                inpEmail.style.border = 'solid #30B945 2px';
                senhaValido = true;
        }
        if (confirma != ''){
                validarConfirm();   
        }
}

function validarConfirm(){
        var senha = inpSenha.value;
        var confirma = inpConfirma.value;

        if (confirma == ''){
                inpConfirma.style.border = 'solid red 2px';
        } else if (senha != confirma){
                senhasIdenticas.style.color = 'red'
                senhasIdenticas.style.display = 'block';
                inpConfirma.style.border = 'solid red 2px';
                senhaValido = false;
        } else {
                senhasIdenticas.style.display = 'none';
                inpConfirma.style.border = 'solid #30B945 2px';
                senhaValido++;
                if (senhaValido){
                        senhaValido = true;
                }
        }
}



var nomeValido = false;
var sobrenomeValido = false;


function validarNome(){
        var nome = inpNome.value
    
        if (nome === '') {
            mensagem_erro_nome.style.display = 'flex'
            nomeValido = false;
        } else {
            mensagem_erro_nome.style.display = 'none'
            nomeValido = true;
        }
    }
    function validarSobrenome(){
var sobrenome = inpSobrenome.value

    
        if (sobrenome === '') {
            mensagem_erro_sobrenome.style.display = 'flex'
            sobrenomeValido = false;
        } else {
            mensagem_erro_sobrenome.style.display = 'none'
            sobrenomeValido = true;
        }
    }


// function form_step2(){
//         validarNome();
//         validarSobrenome();
//         validarSenha();
//         validarConfirm();


//         if (step1 && (nomeValido && sobrenomeValido && senhaValido)) {
//                 concluido.style.opacity = '1'
//                 setTimeout(() => {
//                         window.location.href = "login.html";
//                     }, 1500);
//         } else {
//             alert('Preencha todos os campos corretamente!');
//         }
// }
