// Declaração variaveis
var Twit = require('twit');
var prompt = require('prompt-console');

// Intro
console.log('');
console.log('');
console.log('Bot Azul esta a iniciar!');
console.log('');
console.log('');

// Autenticação Twit
var Botazul = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
  timeout_ms: 60 * 1000,
});

// Prompt - Escolha
prompt.ask(
  [{
    question: 'O que deseja fazer? (Procurar ou Tweetar)',
    name: 'escolher'
  }, ],
  function(response) {
    // Escolha
    if (response.escolher === "Tweetar" || response.escolher === "tweetar") {
      postar();
    } else {
      procurar();
    }
  }
);

// Prompt - Postagem
function postar() {
  prompt.ask(
    [{
      question: 'O que deseja tweetar?',
      name: 'tweet'
    }, ],
    function(response) {
      // Tweetar
      Botazul.post('statuses/update', {
        status: response.tweet
      }, function(err, data, response) {
        console.log('');
        console.log('Tweet feito com sucesso!')
      });
    }
  );
}

// Prompt - Procurar
function procurar() {
  prompt.ask(
    [{
      question: 'O que deseja procurar?',
      name: 'procurar'
    }, ],
    function(response) {
      // Procurar
      Botazul.get('search/tweets', {
        q: response.procurar,
        count: 10
      }, function(err, data, response) {
        var resposta = data.statuses;
        for (var i = 0; i < resposta.length; i++) {
          console.log('');
          console.log(resposta[i].text);
        }
      })
    }
  );
}
