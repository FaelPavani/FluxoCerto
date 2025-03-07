var emailValido = false;
var senhaValido = 0;
var cnpjValido = 0;

function validarEmail() {
        var email = inpEmail.value;

        if (email == '') {
                spanErro.innerHTML = '';
                inpEmail.style.border = 'solid #30B945 2px';
        } else if (email.includes('@') && (email.endsWith('.com') || email.endsWith('.br'))) {
                emailValido = true;
                spanErro.innerHTML = '';
                inpEmail.style.border = 'solid #30B945 2px';
        } else {
                spanErro.innerHTML =
                        "Email deve conter @ e terminar com .com ou .br.";
                inpEmail.style.border = 'solid red 2px';
        }
}

function validarCnpj(){
        var cnpj = inpCnpj.value;

        // Verificar se possui alguma letra
        var cnpjLetras = cnpj.match(/[A-Z]/g);

        if (cnpj == ''){
                spanErro.innerHTML = '';
                inpCnpj.style.border = 'solid #30B945 2px';
        } else if (cnpj.length == 14 && cnpjLetras == null){
                cnpjValido = true;
                spanErro.innerHTML = '';
                inpCnpj.style.border = 'solid #30B945 2px'; 
        } else {
                spanErro.innerHTML = 
                        "CNPJ deve conter 14 carácteres e conter apenas números.";
                inpCnpj.style.border = 'solid red 2px';
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
                inpSenha.style.border = 'solid #30B945 2px';
        } else if (senha != '') {
                erroSenha.style.display = 'flex';
                inpSenha.style.border = 'solid red 2px';

                if (senha.length >= 8) {
                        qtdCaractere.style.color = '#30B945';
                        senhaValido++;
                } else {
                        qtdCaractere.style.color = 'red';
                }
                if (senha != senhaLower) {
                        maiuscula.style.color = '#30B945';
                        senhaValido++;
                } else {
                        maiuscula.style.color = 'red';
                }
                if (senha != senhaUpper) {
                        minuscula.style.color = '#30B945';
                        senhaValido++;
                } else {
                        minuscula.style.color = 'red';
                }
                if (senhaEspecial) {
                        caractereEspecial.style.color = '#30B945';
                        senhaValido++;
                } else {
                        caractereEspecial.style.color = 'red';
                }
                if (senhaNumero) {
                        numero.style.color = '#30B945';
                        senhaValido++;
                } else {
                        numero.style.color = 'red';
                }

                if (senhaValido == 5) {
                        senhaValido = true;
                        inpSenha.style.border = 'solid #30B945 2px';
                } else {
                        senhaValido = false;
                }
        } else if (senha != confirma) {
                spanErro.innerHTML += 'As senhas devem ser idênticas.';
                inpSenha.style.border = 'solid red 2px';
                inpConfirma.style.border = 'solid red 2px';
        } else {
                spanErro.innerHTML = ''
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
                inpConfirma.style.border = 'solid #30B945 2px';
        } else if (senha != confirma){
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
