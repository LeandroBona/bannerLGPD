let lgpdUrl = 'https://jsonplaceholder.typicode.com/posts';
let lgpdHtml = `
<div class="lgpd">
    <div class="lgpd--left">
        Nós utilizamos cookie para melhorar sua experiência como usuário<br>
        Pra conferir detalhadamente todos os cookies utilizados, leia nossa <a href="">política de privacidade</a>
    </div>
    <div class="lgpd--right">
        <button>Ok</button>
    </div>
</div>
<link rel="stylesheet" href="lgpd.css">`;

let lsContent = localStorage.getItem('lgpd');
// verifica se já foi aceito o termos, caso sim, ele não exibe mais
if(!lsContent){ 
    document.body.innerHTML += lgpdHtml;

    let lgpdArea = document.querySelector('.lgpd');
    let lgpdButton = lgpdArea.querySelector('button');

    lgpdButton.addEventListener('click', async()=>{
        lgpdArea.remove(); //remove o banner

        // requisição para um servidor para salvar ip do usuário e vai armazenar o hash

        let result = await fetch(lgpdUrl); 
        let json = await result.json();

        if(json.error != ''){ 
            let id = '123'; //salvado o hash na variavel id no localStorage
            localStorage.setItem('lgpd', json.id);
        }
    });
}