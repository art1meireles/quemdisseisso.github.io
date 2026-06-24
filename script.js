// Carregar banco de dados
const database = JSON.parse(localStorage.getItem('database')) || [
  {
    "id": 1,
    "texto": "Penso, logo existo.",
    "autor": "René Descartes",
    "categoria": "Filósofo",
    "biografia": "Filósofo francês considerado pai da filosofia moderna.",
    "curiosidade": "A frase surgiu em sua obra Discurso do Método."
  },
  {
    "id": 2,
    "texto": "A imaginação é mais importante que o conhecimento.",
    "autor": "Albert Einstein",
    "categoria": "Cientista",
    "biografia": "Físico teórico alemão, ganhador do Prêmio Nobel de Física.",
    "curiosidade": "Einstein era um violonista amador e escrevia poemas."
  }
];

// Estatísticas
const stats = JSON.parse(localStorage.getItem('stats')) || {
  "totalPartidas": 0,
  "acertosTotais": 0,
  "recordeSurvival": 0,
  "diasConsecutivos": 0,
  "conquistas": []
};

// Funções principais
function abrirModoJogo() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('modoDiario').style.display = 'block';
  carregarModoDiario();
}

function carregarModoDiario() {
  const frase = database[Math.floor(Math.random() * database.length)];
  document.getElementById('fraseDiaria').textContent = frase.texto;
  document.getElementById('inputAutor').value = '';
  document.getElementById('sugestoes').innerHTML = '';
  document.getElementById('resultadoDiario').innerHTML = '';
}

document.getElementById('inputAutor').addEventListener('input', function() {
  const input = this.value.toLowerCase();
  const sugestoes = document.getElementById('sugestoes');
  sugestoes.innerHTML = '';
  
  if (input.length > 2) {
    const autores = database.map(item => item.autor.toLowerCase());
    const resultados = autores.filter(autor => autor.includes(input));
    
    resultados.forEach(autor => {
      const div = document.createElement('div');
      div.textContent = autor;
      div.onclick = () => {
        document.getElementById('inputAutor').value = autor;
        verificarRespostaDiario(autor);
      };
      sugestoes.appendChild(div);
    });
  }
});

function verificarRespostaDiario(autorDigitado) {
  const frase = database[Math.floor(Math.random() * database.length)];
  const autorCorreto = frase.autor.toLowerCase();
  
  if (autorDigitado.toLowerCase() === autorCorreto) {
    stats.totalPartidas++;
    stats.acertosTotais++;
    atualizarEstatisticas();
    document.getElementById('resultadoDiario').innerHTML = `
      <p>✅ Correto!</p>
      <p><strong>Biografia:</strong> ${frase.biografia}</p>
      <p><strong>Curiosidade:</strong> ${frase.curiosidade}</p>
    `;
  } else {
    document.getElementById('resultadoDiario').innerHTML = `
      <p>❌ Errado!</p>
      <p>O autor correto é: <strong>${frase.autor}</strong></p>
    `;
  }
}

// Funções para outros modos (Survival e Cantor/Pensador)
// ... (código similar para os outros modos)

// Funções de estatísticas
function atualizarEstatisticas() {
  localStorage.setItem('stats', JSON.stringify(stats));
  document.getElementById('totalPartidas').textContent = stats.totalPartidas;
  document.getElementById('acertosTotais').textContent = stats.acertosTotais;
  document.getElementById('recordeSurvival').textContent = stats.recordeSurvival;
  document.getElementById('diasConsecutivos').textContent = stats.diasConsecutivos;
  document.getElementById('conquistasList').textContent = stats.conquistas.join(', ');
}

function resetarEstatisticas() {
  if (confirm("Tem certeza que deseja resetar todas as estatísticas?")) {
    stats.totalPartidas = 0;
    stats.acertosTotais = 0;
    stats.recordeSurvival = 0;
    stats.diasConsecutivos = 0;
    stats.conquistas = [];
    atualizarEstatisticas();
  }
}

// Funções de navegação
function abrirEstatisticas() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('estatisticas').style.display = 'block';
  atualizarEstatisticas();
}

function abrirConfiguracoes() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('configuracoes').style.display = 'block';
}

function abrirSobre() {
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('sobre').style.display = 'block';
}