function mostrarSenha() {
      const senhaInput = document.getElementById('senha');
      const mostrar = document.getElementById('mostrar');
      const ocultar = document.getElementById('ocultar');

      senhaInput.type = 'text';
      mostrar.classList.add('hidden');
      ocultar.classList.remove('hidden');
    }

    function ocultarSenha() {
      const senhaInput = document.getElementById('senha');
      const mostrar = document.getElementById('mostrar');
      const ocultar = document.getElementById('ocultar');

      senhaInput.type = 'password';
      ocultar.classList.add('hidden');
      mostrar.classList.remove('hidden');
    }

function entrar() {
       
       var emailVar = inpemail.value;
       var senhaVar = senha.value;


       console.log("FORM LOGIN: ", emailVar);
       console.log("FORM SENHA: ", senhaVar);

           fetch("/usuarios/autenticar", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   emailServer: emailVar,
                   senhaServer: senhaVar
               })


           }).then(function (resposta) {
               console.log("ESTOU NO THEN DO entrar()!")

               if (resposta.ok) {
                   console.log(resposta);

                   resposta.json().then(json => {
                       console.log(json);
                       console.log(JSON.stringify(json));
                       sessionStorage.EMAIL_USUARIO = json.email;
                       sessionStorage.NOME_USUARIO = json.username;
                       sessionStorage.ID_USUARIO = json.id;
                       sessionStorage.CARGO_USUARIO = json.cargo
                      
                   setTimeout(function () {
                       window.location = "dashboard.html";
                   }, 1000); // apenas para exibir o loading

               });
               fetch('/usuarios/cadastrarOperador', {
       method: 'POST',
       credentials: 'same-origin',          // importante para enviar cookies
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ emaillogadoServer: emailVar })
   })

           } else {

               console.log("Houve um erro ao tentar realizar o login!");

               resposta.text().then(texto => {
                   
                
               });
           }

       }).catch(function (erro) {
           console.log(erro);
       })

       return false;
   }
  
    
