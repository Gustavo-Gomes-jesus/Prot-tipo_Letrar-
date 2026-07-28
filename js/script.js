/* ==========================================================================
   LETRAR+  —  Lógica do protótipo (HTML + CSS + JS puro, sem frameworks)
   ========================================================================== */
'use strict';

/* --------------------------------------------------------------------------
   1) DADOS DO JOGO
   -------------------------------------------------------------------------- */
const ALFABETO = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','Q','R','S','T','U','V','X'];

// Palavras com emoji (usados em várias atividades)
const PALAVRAS = [
  { palavra:'MAÇÃ',     emoji:'🍎', silabas:['MA','ÇÃ'] },
  { palavra:'BANANA',   emoji:'🍌', silabas:['BA','NA','NA'] },
  { palavra:'CACHORRO', emoji:'🐶', silabas:['CA','CHOR','RO'] },
  { palavra:'CARRO',    emoji:'🚗', silabas:['CAR','RO'] },
  { palavra:'GATO',     emoji:'🐱', silabas:['GA','TO'] },
  { palavra:'BOLA',     emoji:'⚽', silabas:['BO','LA'] },
  { palavra:'CASA',     emoji:'🏠', silabas:['CA','SA'] },
  { palavra:'PATO',     emoji:'🦆', silabas:['PA','TO'] },
  { palavra:'SAPO',     emoji:'🐸', silabas:['SA','PO'] },
  { palavra:'PEIXE',    emoji:'🐟', silabas:['PEI','XE'] },
  { palavra:'ABACAXI',  emoji:'🍍', silabas:['A','BA','CA','XI'] },
  { palavra:'FOGUETE',  emoji:'🚀', silabas:['FO','GUE','TE'] },
];

// Cenários de socioemocional
const CENARIOS_EMOCAO = [
  { texto:'Seu amigo caiu no recreio. O que você faz?',
    opcoes:[ {emoji:'😊', label:'Ajudar', correta:true}, {emoji:'😠', label:'Rir', correta:false}, {emoji:'😴', label:'Ignorar', correta:false} ] },
  { texto:'Um colega novo chegou na turma e está sozinho. O que você faz?',
    opcoes:[ {emoji:'🙈', label:'Fingir que não vi', correta:false}, {emoji:'🤝', label:'Chamar para brincar', correta:true}, {emoji:'😒', label:'Fazer pouco caso', correta:false} ] },
  { texto:'Você errou uma atividade e ficou triste. O que ajuda mais?',
    opcoes:[ {emoji:'💪', label:'Tentar de novo com calma', correta:true}, {emoji:'😭', label:'Desistir de vez', correta:false}, {emoji:'😡', label:'Jogar o material longe', correta:false} ] },
  { texto:'Sua colega ganhou a atividade antes de você. O que você faz?',
    opcoes:[ {emoji:'👏', label:'Parabenizar', correta:true}, {emoji:'😤', label:'Ficar bravo com ela', correta:false}, {emoji:'🙄', label:'Não falar com ela', correta:false} ] },
];

const MODOS = [
  { id:'cacaletras',       icon:'🔎', titulo:'Caça às Letras',            desc:'Encontre a letra pedida entre várias opções.',            skills:'Reconhecimento de letras · Atenção visual' },
  { id:'qualsom',          icon:'🔊', titulo:'Qual é o Som?',              desc:'Ouça o som e escolha a letra correspondente.',             skills:'Consciência fonológica · Discriminação auditiva' },
  { id:'silaba',           icon:'🧩', titulo:'Monte a Sílaba',             desc:'Combine letras para formar sílabas e palavras.',           skills:'Formação silábica · Raciocínio lógico' },
  { id:'completapalavra',  icon:'✏️', titulo:'Complete a Palavra',         desc:'Descubra a letra que falta em cada palavra.',              skills:'Leitura · Escrita · Associação' },
  { id:'ligaimagem',       icon:'🔗', titulo:'Ligue a Palavra à Imagem',   desc:'Relacione cada palavra à figura correspondente.',          skills:'Vocabulário · Compreensão visual' },
  { id:'memoria',          icon:'🧠', titulo:'Memória das Letras',         desc:'Encontre os pares de letras e imagens iguais.',            skills:'Memória · Concentração' },
  { id:'ordenesilabas',    icon:'🔀', titulo:'Ordene as Sílabas',          desc:'Organize as sílabas embaralhadas e forme a palavra.',      skills:'Sequenciação · Leitura' },
  { id:'emocoes',          icon:'💛', titulo:'Missão das Emoções',         desc:'Resolva situações do dia a dia com empatia.',              skills:'Empatia · Cooperação' },
  { id:'trilha',           icon:'🗺️', titulo:'Trilha do Conhecimento',     desc:'Avance pelas casas revisando tudo o que aprendeu.',        skills:'Persistência · Resolução de problemas' },
  { id:'desafio',          icon:'📅', titulo:'Desafio do Dia',             desc:'Pequenas missões diárias para praticar sempre.',           skills:'Autonomia · Motivação' },
];

const PERSONAGENS = ['🐣','🐥','🐤','🦉','🦄','🐉','🦁','🤓','🌟',];
const PERSONAGEM_NOMES = ['Pintinho Aprendiz','Pintinho Curioso','Passarinho Estudioso','Coruja Sábia','Unicórnio Mágico','Dragão das Letras','Leão sábio','Inteligente','Estrela Mestra'];
const AVATARES_PERFIL = [
  { id:'avatar_1', src:'imagens/avatar_1.png', nome:'Cientista' },
  { id:'avatar_2', src:'imagens/avatar_2.png', nome:'Explorador' },
  { id:'avatar_3', src:'imagens/avatar_3.png', nome:'Tecnológica' },
  { id:'avatar_4', src:'imagens/avatar_4.png', nome:'Químico' },
  { id:'avatar_5', src:'imagens/avatar_5.png', nome:'Artista' },
];
function avatarPorId(id){
  return AVATARES_PERFIL.find(a => a.id === id) || AVATARES_PERFIL[0];
}

// Conquistas (badges) exibidas na aba Perfil
const CONQUISTAS = [
  { icon:'⭐', titulo:'Primeira Estrela',    desc:'Ganhe sua primeira estrela.',                 teste: s => s.stars >= 1 },
  { icon:'🌟', titulo:'Colecionador',        desc:'Junte 15 estrelas e evolua seu personagem.',  teste: s => s.stars >= 15 },
  { icon:'💫', titulo:'Mestre das Estrelas', desc:'Junte 50 estrelas.',                          teste: s => s.stars >= 50 },
  { icon:'🏅', titulo:'Primeira Medalha',    desc:'Conquiste sua primeira medalha.',             teste: s => (s.medalhasDesbloqueadas||[]).length >= 1 },
  { icon:'🎖️', titulo:'Sala de Troféus',     desc:'Conquiste 5 medalhas.',                       teste: s => (s.medalhasDesbloqueadas||[]).length >= 5 },
  { icon:'🔎', titulo:'Caçador de Letras',   desc:'Complete o jogo Caça às Letras.',             teste: s => (s.modosConcluidos?.cacaletras||0) >= 1 },
  { icon:'🔊', titulo:'Ouvido de Ouro',      desc:'Complete o jogo Qual é o Som?',                teste: s => (s.modosConcluidos?.qualsom||0) >= 1 },
  { icon:'🧩', titulo:'Construtor de Sílabas', desc:'Complete o jogo Monte a Sílaba.',           teste: s => (s.modosConcluidos?.silaba||0) >= 1 },
  { icon:'✏️', titulo:'Completa-Palavras',   desc:'Complete o jogo Complete a Palavra.',         teste: s => (s.modosConcluidos?.completapalavra||0) >= 1 },
  { icon:'🔗', titulo:'Conector',            desc:'Complete o jogo Ligue a Palavra à Imagem.',   teste: s => (s.modosConcluidos?.ligaimagem||0) >= 1 },
  { icon:'🧠', titulo:'Memória de Elefante', desc:'Complete o jogo Memória das Letras.',         teste: s => (s.modosConcluidos?.memoria||0) >= 1 },
  { icon:'🔀', titulo:'Organizador',         desc:'Complete o jogo Ordene as Sílabas.',          teste: s => (s.modosConcluidos?.ordenesilabas||0) >= 1 },
  { icon:'💛', titulo:'Coração Gigante',     desc:'Complete a Missão das Emoções.',              teste: s => (s.modosConcluidos?.emocoes||0) >= 1 },
  { icon:'🗺️', titulo:'Explorador da Trilha', desc:'Chegue ao fim da Trilha do Conhecimento.',  teste: s => (s.modosConcluidos?.trilha||0) >= 1 },
  { icon:'📅', titulo:'Disciplinado',        desc:'Complete o Desafio do Dia.',                  teste: s => (s.modosConcluidos?.desafio||0) >= 1 },
  { icon:'👑', titulo:'Letrado Completo',    desc:'Complete todos os 9 jogos pelo menos uma vez.', teste: s => ['cacaletras','qualsom','silaba','completapalavra','ligaimagem','memoria','ordenesilabas','emocoes','trilha'].every(id => (s.modosConcluidos?.[id]||0) >= 1) },
];

// Medalhas — sistema separado das conquistas, com níveis (bronze/prata/ouro)
const MEDALHAS = [
  { id:'bronze_memoria',    icon:'🧠', titulo:'Mente Afiada',             desc:'Complete o jogo Memória das Letras.',                  tier:'bronze', teste: s => (s.modosConcluidos?.memoria||0) >= 1 },
  { id:'prata_trilha',      icon:'🗺️', titulo:'Explorador da Trilha',     desc:'Conclua a Trilha do Conhecimento.',                    tier:'prata',  teste: s => (s.modosConcluidos?.trilha||0) >= 1 },
  { id:'prata_desafio',     icon:'📅', titulo:'Compromisso Diário',       desc:'Complete o Desafio do Dia pela primeira vez.',         tier:'prata',  teste: s => (s.modosConcluidos?.desafio||0) >= 1 },
  { id:'ouro_trilha3',      icon:'🌟', titulo:'Mestre da Trilha',         desc:'Conclua a Trilha do Conhecimento 3 vezes.',            tier:'ouro',   teste: s => (s.modosConcluidos?.trilha||0) >= 3 },
  { id:'ouro_semana',       icon:'🔥', titulo:'Semana Dedicada',          desc:'Complete o Desafio do Dia em 5 dias diferentes.',      tier:'ouro',   teste: s => (s.diasDesafioConcluidos||[]).length >= 5 },
  { id:'ouro_colecionador', icon:'👑', titulo:'Colecionador de Medalhas', desc:'Conquiste 5 medalhas diferentes.',                     tier:'ouro',   teste: s => (s.medalhasDesbloqueadas||[]).length >= 5 },
];
const TIER_NOMES = { bronze:'Bronze', prata:'Prata', ouro:'Ouro' };

/* --------------------------------------------------------------------------
   2) ESTADO GLOBAL + PERSISTÊNCIA (localStorage)
   -------------------------------------------------------------------------- */
const STORAGE_KEY = 'letrarmais_state_v1';

function hojeISO(){ return new Date().toISOString().slice(0,10); }

function estadoPadrao(){
  return {
    stars: 0,
    charIndex: 0,
    dailyDate: hojeISO(),
    dailyProgress: { letras:0, fonemas:0, silabas:0, palavras:0, imagens:0 },
    dailyDone: false,
    modosConcluidos: {},
    perfilCriado: false,
    perfil: { nome:'', avatar:'avatar_1' },
    medalhasDesbloqueadas: [],
    diasDesafioConcluidos: [],
  };
}

function marcarModoConcluido(id){
  if(!state.modosConcluidos) state.modosConcluidos = {};
  state.modosConcluidos[id] = (state.modosConcluidos[id] || 0) + 1;
  salvarEstado();
  atualizarMedalhas();
}
function totalMissoesConcluidas(){
  if(!state.modosConcluidos) return 0;
  return Object.values(state.modosConcluidos).reduce((a,b)=>a+b, 0);
}
function totalMedalhas(){
  return (state.medalhasDesbloqueadas || []).length;
}
// Verifica todos os critérios de medalha e desbloqueia + notifica as novas conquistadas
function atualizarMedalhas(){
  if(!state.medalhasDesbloqueadas) state.medalhasDesbloqueadas = [];
  const novas = [];
  MEDALHAS.forEach(m=>{
    if(!state.medalhasDesbloqueadas.includes(m.id) && m.teste(state)){
      state.medalhasDesbloqueadas.push(m.id);
      novas.push(m);
    }
  });
  if(novas.length){
    salvarEstado();
    renderHeader();
    novas.forEach(m=> mostrarRecompensa({
      emoji: m.icon,
      titulo: `🏅 Nova medalha: ${m.titulo}`,
      texto: `${m.desc} (nível ${TIER_NOMES[m.tier]})`,
    }));
  }
  return novas;
}
function resetarProgresso(){
  const perfilAtual = state.perfil;
  const criado = state.perfilCriado;
  state = estadoPadrao();
  state.perfil = perfilAtual;
  state.perfilCriado = criado;
  salvarEstado();
}

let state = carregarEstado();

function carregarEstado(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return estadoPadrao();
    const parsed = JSON.parse(raw);
    if(parsed.dailyDate !== hojeISO()){
      parsed.dailyDate = hojeISO();
      parsed.dailyProgress = { letras:0, fonemas:0, silabas:0, palavras:0, imagens:0 };
      parsed.dailyDone = false;
    }
    return Object.assign(estadoPadrao(), parsed);
  }catch(e){ return estadoPadrao(); }
}

function salvarEstado(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addEstrelas(qtd){
  state.stars += qtd;
  const novoIndex = Math.min(PERSONAGENS.length - 1, Math.floor(state.stars / 15));
  const subiu = novoIndex > state.charIndex;
  state.charIndex = novoIndex;
  salvarEstado();
  renderHeader();
  return subiu;
}

/* --------------------------------------------------------------------------
   3) UTILITÁRIOS
   -------------------------------------------------------------------------- */
function embaralhar(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function amostra(arr,n){ return embaralhar(arr).slice(0,n); }
function aleatorioDe(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function falar(texto){
  if(!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'pt-BR';
  u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

function dispararConfete(qtd=24){
  const layer = document.getElementById('confettiLayer');
  const cores = ['#FFB74D','#A8E6CF','#FFE082','#F8BBD0','#7EC8E3'];
  for(let i=0;i<qtd;i++){
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random()*100 + 'vw';
    p.style.background = aleatorioDe(cores);
    p.style.animationDuration = (2 + Math.random()*1.5) + 's';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    layer.appendChild(p);
    setTimeout(()=>p.remove(), 3800);
  }
}

let filaRecompensas = [];
function mostrarRecompensa(obj){
  filaRecompensas.push(Object.assign({emoji:'⭐', titulo:'Muito bem!', texto:'Você ganhou 1 estrela.'}, obj));
  if(!document.getElementById('rewardOverlay').classList.contains('show')){
    exibirProximaRecompensa();
  }
}
function exibirProximaRecompensa(){
  if(filaRecompensas.length === 0) return;
  const obj = filaRecompensas.shift();
  document.getElementById('rewardEmoji').textContent = obj.emoji;
  document.getElementById('rewardTitle').textContent = obj.titulo;
  document.getElementById('rewardText').textContent = obj.texto;
  document.getElementById('rewardOverlay').classList.add('show');
  dispararConfete();
}
document.getElementById('rewardClose').addEventListener('click', ()=>{
  document.getElementById('rewardOverlay').classList.remove('show');
  if(filaRecompensas.length > 0){
    setTimeout(exibirProximaRecompensa, 350);
  }
});

/* --------------------------------------------------------------------------
   4b) PERFIL — CRIAÇÃO, EDIÇÃO E RESET DE PROGRESSO
   -------------------------------------------------------------------------- */
let avatarSelecionado = AVATARES_PERFIL[0].id;
let modoEdicaoPerfil = false;

function montarAvatarPicker(){
  const box = document.getElementById('ob-avatares');
  box.innerHTML = '';
  AVATARES_PERFIL.forEach(av=>{
    const btn = document.createElement('button');
    btn.className = 'avatar-option' + (av.id === avatarSelecionado ? ' selected' : '');
    btn.type = 'button';
    btn.title = av.nome;
    btn.innerHTML = `<img src="${av.src}" alt="Avatar ${av.nome}">`;
    btn.addEventListener('click', ()=>{
      avatarSelecionado = av.id;
      document.querySelectorAll('.avatar-option').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    box.appendChild(btn);
  });
}

function abrirCriacaoPerfil(edicao){
  modoEdicaoPerfil = !!edicao;
  const nomeInput = document.getElementById('ob-nome');
  avatarSelecionado = edicao ? (state.perfil.avatar || AVATARES_PERFIL[0].id) : AVATARES_PERFIL[0].id;
  nomeInput.value = edicao ? (state.perfil.nome || '') : '';
  document.getElementById('ob-erro').textContent = '';
  document.getElementById('ob-comecar').textContent = edicao ? 'Salvar alterações ✅' : 'Começar a jogar 🚀';
  montarAvatarPicker();
  irPara('boasvindas');
}

document.getElementById('ob-comecar').addEventListener('click', ()=>{
  const nome = document.getElementById('ob-nome').value.trim();
  const erro = document.getElementById('ob-erro');
  if(!nome){
    erro.textContent = 'Digite um nome para continuar.';
    return;
  }
  state.perfil = { nome, avatar: avatarSelecionado };
  state.perfilCriado = true;
  salvarEstado();
  document.body.classList.remove('onboarding');
  renderHeader();
  renderHome();
  irPara(modoEdicaoPerfil ? 'perfil' : 'home');
  modoEdicaoPerfil = false;
});

document.getElementById('btnEditarPerfil').addEventListener('click', ()=> abrirCriacaoPerfil(true));

document.getElementById('btnResetarProgresso').addEventListener('click', ()=>{
  document.getElementById('confirmOverlay').classList.add('show');
});
document.getElementById('confirmCancelar').addEventListener('click', ()=>{
  document.getElementById('confirmOverlay').classList.remove('show');
});
document.getElementById('confirmOk').addEventListener('click', ()=>{
  resetarProgresso();
  document.getElementById('confirmOverlay').classList.remove('show');
  renderHeader();
  renderHome();
  renderPerfil();
  mostrarRecompensa({emoji:'🔄', titulo:'Progresso reiniciado!', texto:'Tudo pronto para recomeçar a aventura do zero.'});
});

/* --------------------------------------------------------------------------
   5) NAVEGAÇÃO ENTRE TELAS
   -------------------------------------------------------------------------- */
function irPara(nome){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const alvo = document.getElementById('screen-' + nome);
  if(alvo) alvo.classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
  // inicia o jogo correspondente
  const iniciadores = {
    cacaletras: iniciarCacaLetras,
    qualsom: iniciarQualSom,
    silaba: iniciarMonteSilaba,
    completapalavra: iniciarCompletaPalavra,
    ligaimagem: iniciarLigaImagem,
    memoria: iniciarMemoria,
    ordenesilabas: iniciarOrdeneSilabas,
    emocoes: iniciarEmocoes,
    trilha: iniciarTrilha,
    desafio: iniciarDesafioDia,
    perfil: renderPerfil,
  };
  if(iniciadores[nome]) iniciadores[nome]();
}

document.getElementById('btnHome').addEventListener('click', ()=> irPara('home'));
document.getElementById('btnHome').addEventListener('keydown', (e)=>{ if(e.key==='Enter') irPara('home'); });
document.getElementById('btnPerfil').addEventListener('click', ()=> irPara('perfil'));
document.getElementById('btnPerfil').addEventListener('keydown', (e)=>{ if(e.key==='Enter') irPara('perfil'); });
document.querySelectorAll('.btn-back').forEach(b => b.addEventListener('click', ()=> irPara('home')));

/* --------------------------------------------------------------------------
   5b) RENDER DO CABEÇALHO E DA HOME
   -------------------------------------------------------------------------- */
function renderHeader(){
  document.getElementById('statStars').textContent = state.stars;
  document.getElementById('statMedals').textContent = totalMedalhas();
  document.getElementById('statCharacter').textContent = PERSONAGENS[state.charIndex];
  const pct = ((state.stars % 15) / 15) * 100;
  document.getElementById('globalProgressFill').style.width = pct + '%';
}

function renderHome(){
  const saudacao = document.getElementById('homeGreeting');
  if(state.perfil && state.perfil.nome){
    const av = avatarPorId(state.perfil.avatar);
    saudacao.innerHTML = `Olá, ${state.perfil.nome}! <img class="greeting-avatar" src="${av.src}" alt="Avatar de ${state.perfil.nome}">`;
  }else{
    saudacao.textContent = '';
  }
  const grid = document.getElementById('modeGrid');
  grid.innerHTML = '';
  MODOS.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'mode-card';
    card.innerHTML = `
      <span class="card-badge">${m.id==='desafio' && state.dailyDone ? 'Concluído hoje ✅' : ''}</span>
      <div class="mode-icon">${m.icon}</div>
      <h3>${m.titulo}</h3>
      <p>${m.desc}</p>
      <div class="mode-skills">${m.skills}</div>
      <button class="btn-play">Jogar</button>
    `;
    card.querySelector('.btn-play').addEventListener('click', ()=> irPara(m.id));
    grid.appendChild(card);
  });
}

function renderPerfil(){
  const avatarUsuario = avatarPorId(state.perfil.avatar);
  document.getElementById('perfilAvatarImg').src = avatarUsuario.src;
  document.getElementById('perfilAvatarImg').alt = `Avatar de ${state.perfil.nome || 'jogador'}`;
  document.getElementById('perfilNome').textContent = state.perfil && state.perfil.nome ? state.perfil.nome : 'Seu nome';
  document.getElementById('companionIcon').textContent = PERSONAGENS[state.charIndex];
  document.getElementById('companionNome').textContent = PERSONAGEM_NOMES[state.charIndex];
  document.getElementById('perfilStars').textContent = state.stars;
  document.getElementById('perfilMedals').textContent = totalMedalhas();
  document.getElementById('perfilJogos').textContent = totalMissoesConcluidas();

  const restante = 15 - (state.stars % 15);
  const pct = ((state.stars % 15) / 15) * 100;
  document.getElementById('perfilProgressFill').style.width = pct + '%';
  document.getElementById('perfilNextText').textContent = state.charIndex >= PERSONAGENS.length - 1
    ? 'Personagem máximo alcançado! 🎉'
    : `Faltam ${restante} estrela${restante===1?'':'s'} para o próximo amigo`;

  const grid = document.getElementById('achvGrid');
  grid.innerHTML = '';
  CONQUISTAS.forEach(c=>{
    const desbloqueada = c.teste(state);
    const card = document.createElement('div');
    card.className = 'achv-card ' + (desbloqueada ? 'unlocked' : 'locked');
    card.innerHTML = `
      <div class="achv-icon">${desbloqueada ? c.icon : '🔒'}</div>
      <div>
        <p class="achv-title">${c.titulo}</p>
        <p class="achv-desc">${c.desc}</p>
        ${desbloqueada ? '' : '<span class="achv-lock-tag">Ainda não desbloqueada</span>'}
      </div>
    `;
    grid.appendChild(card);
  });

  renderMedalhas();
}

function renderMedalhas(){
  const grid = document.getElementById('medalhasGrid');
  if(!grid) return;
  grid.innerHTML = '';
  const desbloqueadas = state.medalhasDesbloqueadas || [];
  MEDALHAS.forEach(m=>{
    const desbloqueada = desbloqueadas.includes(m.id);
    const card = document.createElement('div');
    card.className = `medal-card tier-${m.tier} ` + (desbloqueada ? 'unlocked' : 'locked');
    card.innerHTML = `
      <div class="medal-medallion">
        <span class="medal-icon">${desbloqueada ? m.icon : '🔒'}</span>
      </div>
      <div class="medal-ribbon"></div>
      <p class="medal-title">${m.titulo}</p>
      <p class="medal-tier-tag">${TIER_NOMES[m.tier]}</p>
      <p class="medal-desc">${m.desc}</p>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================================================
   6) MODO 1 — CAÇA ÀS LETRAS
   ========================================================================== */
const clState = { rodada:0, total:5, alvo:null };

function iniciarCacaLetras(){
  clState.rodada = 0;
  document.getElementById('cl-feedback').textContent = '';
  clState.total = 5;
  proximaRodadaCacaLetras();
}
function proximaRodadaCacaLetras(){
  clState.rodada++;
  if(clState.rodada > clState.total){
    marcarModoConcluido('cacaletras');
    addEstrelas(3);
    mostrarRecompensa({emoji:'⭐', titulo:'Missão completa!', texto:'Você encontrou todas as letras e ganhou 3 estrelas!'});
    irPara('home'); renderHome();
    return;
  }
  document.getElementById('cl-round').textContent = `Rodada ${clState.rodada} de ${clState.total}`;
  const opcoesLetras = amostra(ALFABETO, 6);
  clState.alvo = aleatorioDe(opcoesLetras);
  document.getElementById('cl-target').textContent = clState.alvo;
  const box = document.getElementById('cl-options');
  box.innerHTML = '';
  embaralhar(opcoesLetras).forEach(l=>{
    const btn = document.createElement('button');
    btn.className = 'opt-tile';
    btn.textContent = l;
    btn.addEventListener('click', ()=> responderCacaLetras(l, btn));
    box.appendChild(btn);
  });
  document.getElementById('cl-feedback').textContent = '';
  document.getElementById('cl-feedback').className = 'feedback-area';
}
function responderCacaLetras(letra, btn){
  const fb = document.getElementById('cl-feedback');
  document.querySelectorAll('#cl-options .opt-tile').forEach(b=>b.disabled = true);
  if(letra === clState.alvo){
    btn.classList.add('correct');
    fb.textContent = '✅ Isso aí! Letra encontrada.';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    incrementarDesafioDia('letras');
    setTimeout(proximaRodadaCacaLetras, 900);
  }else{
    btn.classList.add('wrong');
    fb.textContent = `❌ Quase! A letra certa era ${clState.alvo}.`;
    fb.className = 'feedback-area bad';
    setTimeout(proximaRodadaCacaLetras, 1300);
  }
}

/* ==========================================================================
   7) MODO 2 — QUAL É O SOM?
   ========================================================================== */
const qsState = { rodada:0, total:5, alvo:null };

function iniciarQualSom(){
  qsState.rodada = 0;
  qsState.total = 5;
  proximaRodadaQualSom();
  document.getElementById('qs-play').onclick = ()=> falar(qsState.alvo);
}
function proximaRodadaQualSom(){
  qsState.rodada++;
  if(qsState.rodada > qsState.total){
    marcarModoConcluido('qualsom');
    addEstrelas(3);
    mostrarRecompensa({emoji:'🔊', titulo:'Ótima escuta!', texto:'Você identificou todos os sons e ganhou 3 estrelas!'});
    irPara('home'); renderHome();
    return;
  }
  document.getElementById('qs-round').textContent = `Rodada ${qsState.rodada} de ${qsState.total}`;
  const opcoes = amostra(ALFABETO, 4);
  qsState.alvo = aleatorioDe(opcoes);
  const box = document.getElementById('qs-options');
  box.innerHTML = '';
  embaralhar(opcoes).forEach(l=>{
    const btn = document.createElement('button');
    btn.className = 'opt-tile';
    btn.textContent = l;
    btn.addEventListener('click', ()=> responderQualSom(l, btn));
    box.appendChild(btn);
  });
  document.getElementById('qs-feedback').textContent = '';
  document.getElementById('qs-feedback').className = 'feedback-area';
  setTimeout(()=> falar(qsState.alvo), 300);
}
function responderQualSom(letra, btn){
  const fb = document.getElementById('qs-feedback');
  document.querySelectorAll('#qs-options .opt-tile').forEach(b=>b.disabled = true);
  if(letra === qsState.alvo){
    btn.classList.add('correct');
    fb.textContent = '✅ Você ouviu certinho!';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    incrementarDesafioDia('fonemas');
    setTimeout(proximaRodadaQualSom, 900);
  }else{
    btn.classList.add('wrong');
    fb.textContent = `❌ O som era da letra ${qsState.alvo}.`;
    fb.className = 'feedback-area bad';
    setTimeout(proximaRodadaQualSom, 1300);
  }
}

/* ==========================================================================
   8) MODO 3 — MONTE A SÍLABA
   ========================================================================== */
const VOGAIS = ['A','E','I','O','U'];
const CONSOANTES = ['B','C','D','F','G','L','M','N','P','R','S','T','V'];

const slState = { rodada:0, total:4, alvo:null, slots:[null,null], selecionada:null };

function gerarSilabaAleatoria(){
  const c = aleatorioDe(CONSOANTES);
  const v = aleatorioDe(VOGAIS);
  return c + v;
}

function iniciarMonteSilaba(){
  slState.rodada = 0;
  slState.total = 4;
  proximaRodadaMonteSilaba();
  document.getElementById('sl-check').onclick = conferirMonteSilaba;
}
function proximaRodadaMonteSilaba(){
  slState.rodada++;
  if(slState.rodada > slState.total){
    marcarModoConcluido('silaba');
    addEstrelas(3);
    mostrarRecompensa({emoji:'🧩', titulo:'Sílabas montadas!', texto:'Você formou todas as sílabas e ganhou 3 estrelas!'});
    irPara('home'); renderHome();
    return;
  }
  document.getElementById('sl-round').textContent = `Sílaba ${slState.rodada} de ${slState.total}`;
  slState.alvo = gerarSilabaAleatoria();
  slState.slots = [null,null];
  slState.selecionada = null;
  document.getElementById('sl-target').textContent = slState.alvo;

  document.querySelectorAll('#sl-slots .tile-slot').forEach(s=>{
    s.textContent = '?';
    s.classList.remove('filled');
  });

  // banco: letras corretas + distratoras
  const letras = embaralhar([
    slState.alvo[0], slState.alvo[1],
    aleatorioDe(CONSOANTES.filter(c=>c!==slState.alvo[0])),
    aleatorioDe(VOGAIS.filter(v=>v!==slState.alvo[1])),
  ]);
  const bank = document.getElementById('sl-bank');
  bank.innerHTML = '';
  letras.forEach((letra, idx)=>{
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.textContent = letra;
    tile.draggable = true;
    tile.dataset.letra = letra;
    tile.dataset.id = idx;
    tile.addEventListener('dragstart', (e)=>{ e.dataTransfer.setData('text/plain', idx); });
    tile.addEventListener('click', ()=> selecionarTileSilaba(tile));
    bank.appendChild(tile);
  });

  document.querySelectorAll('#sl-slots .tile-slot').forEach(slot=>{
    slot.ondragover = (e)=>{ e.preventDefault(); slot.classList.add('dragover'); };
    slot.ondragleave = ()=> slot.classList.remove('dragover');
    slot.ondrop = (e)=>{
      e.preventDefault();
      slot.classList.remove('dragover');
      const idx = e.dataTransfer.getData('text/plain');
      const tile = bank.querySelector(`[data-id="${idx}"]`);
      if(tile) colocarTileNoSlot(tile, slot);
    };
    slot.addEventListener('click', ()=>{
      if(slState.selecionada){
        colocarTileNoSlot(slState.selecionada, slot);
      }
    });
  });

  document.getElementById('sl-feedback').textContent = '';
  document.getElementById('sl-feedback').className = 'feedback-area';
}
function selecionarTileSilaba(tile){
  if(tile.classList.contains('used')) return;
  document.querySelectorAll('#sl-bank .tile').forEach(t=>t.classList.remove('selected'));
  tile.classList.add('selected');
  slState.selecionada = tile;
}
function colocarTileNoSlot(tile, slot){
  if(tile.classList.contains('used')) return;
  const slotIndex = Number(slot.dataset.slot);
  slot.textContent = tile.dataset.letra;
  slot.classList.add('filled');
  slState.slots[slotIndex] = tile.dataset.letra;
  tile.classList.add('used');
  tile.classList.remove('selected');
  slState.selecionada = null;
}
function conferirMonteSilaba(){
  const fb = document.getElementById('sl-feedback');
  const formada = (slState.slots[0] || '') + (slState.slots[1] || '');
  if(formada === slState.alvo){
    fb.textContent = '✅ Sílaba correta!';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    incrementarDesafioDia('silabas');
    setTimeout(proximaRodadaMonteSilaba, 900);
  }else{
    fb.textContent = `❌ Ainda não! Tente formar "${slState.alvo}".`;
    fb.className = 'feedback-area bad';
  }
}

/* ==========================================================================
   9) MODO 4 — COMPLETE A PALAVRA
   ========================================================================== */
const cpState = { rodada:0, total:5, atual:null };

function montarLacuna(palavra){
  const idx = 1 + Math.floor(Math.random() * (palavra.length - 2)); // nunca a primeira/última
  const letraCorreta = palavra[idx];
  const exibida = palavra.slice(0,idx) + '_' + palavra.slice(idx+1);
  const distratoras = amostra(ALFABETO.filter(l=>l!==letraCorreta), 2);
  return { exibida, letraCorreta, opcoes: embaralhar([letraCorreta, ...distratoras]) };
}

function iniciarCompletaPalavra(){
  cpState.rodada = 0;
  cpState.total = 5;
  proximaRodadaCompletaPalavra();
}
function proximaRodadaCompletaPalavra(){
  cpState.rodada++;
  if(cpState.rodada > cpState.total){
    marcarModoConcluido('completapalavra');
    addEstrelas(3);
    mostrarRecompensa({emoji:'✏️', titulo:'Palavras completas!', texto:'Você completou todas as palavras e ganhou 3 estrelas!'});
    irPara('home'); renderHome();
    return;
  }
  document.getElementById('cp-round').textContent = `Rodada ${cpState.rodada} de ${cpState.total}`;
  const item = aleatorioDe(PALAVRAS);
  const lacuna = montarLacuna(item.palavra);
  cpState.atual = { ...item, ...lacuna };
  document.getElementById('cp-emoji').textContent = item.emoji;
  document.getElementById('cp-word').textContent = lacuna.exibida;
  const box = document.getElementById('cp-options');
  box.innerHTML = '';
  lacuna.opcoes.forEach(l=>{
    const btn = document.createElement('button');
    btn.className = 'opt-tile';
    btn.textContent = l;
    btn.addEventListener('click', ()=> responderCompletaPalavra(l, btn));
    box.appendChild(btn);
  });
  document.getElementById('cp-feedback').textContent = '';
  document.getElementById('cp-feedback').className = 'feedback-area';
}
function responderCompletaPalavra(letra, btn){
  const fb = document.getElementById('cp-feedback');
  document.querySelectorAll('#cp-options .opt-tile').forEach(b=>b.disabled = true);
  if(letra === cpState.atual.letraCorreta){
    btn.classList.add('correct');
    document.getElementById('cp-word').textContent = cpState.atual.palavra;
    fb.textContent = '✅ Isso mesmo!';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    incrementarDesafioDia('palavras');
    setTimeout(proximaRodadaCompletaPalavra, 900);
  }else{
    btn.classList.add('wrong');
    fb.textContent = `❌ A palavra certa é ${cpState.atual.palavra}.`;
    fb.className = 'feedback-area bad';
    setTimeout(proximaRodadaCompletaPalavra, 1300);
  }
}

/* ==========================================================================
   10) MODO 5 — LIGUE A PALAVRA À IMAGEM
   ========================================================================== */
const liState = { pares:[], encontrados:0, total:4, palavraSelecionada:null };

function iniciarLigaImagem(){
  const escolhidas = amostra(PALAVRAS, 4);
  liState.pares = escolhidas;
  liState.encontrados = 0;
  liState.total = escolhidas.length;
  liState.palavraSelecionada = null;
  document.getElementById('li-round').textContent = `Pares encontrados: 0 de ${liState.total}`;

  const wordsCol = document.getElementById('li-words');
  const imgCol = document.getElementById('li-images');
  wordsCol.innerHTML = '';
  imgCol.innerHTML = '';

  embaralhar(escolhidas).forEach(item=>{
    const el = document.createElement('div');
    el.className = 'match-item';
    el.textContent = item.palavra;
    el.dataset.palavra = item.palavra;
    el.tabIndex = 0;
    el.addEventListener('click', ()=> selecionarPalavraLI(el));
    wordsCol.appendChild(el);
  });
  embaralhar(escolhidas).forEach(item=>{
    const el = document.createElement('div');
    el.className = 'match-item';
    el.textContent = item.emoji;
    el.dataset.palavra = item.palavra;
    el.tabIndex = 0;
    el.addEventListener('click', ()=> selecionarImagemLI(el));
    imgCol.appendChild(el);
  });

  document.getElementById('li-feedback').textContent = '';
  document.getElementById('li-feedback').className = 'feedback-area';
}
function selecionarPalavraLI(el){
  if(el.classList.contains('matched')) return;
  document.querySelectorAll('#li-words .match-item').forEach(e=>e.classList.remove('selected'));
  el.classList.add('selected');
  liState.palavraSelecionada = el;
}
function selecionarImagemLI(el){
  if(el.classList.contains('matched') || !liState.palavraSelecionada) return;
  const fb = document.getElementById('li-feedback');
  if(el.dataset.palavra === liState.palavraSelecionada.dataset.palavra){
    el.classList.add('matched');
    liState.palavraSelecionada.classList.add('matched');
    liState.encontrados++;
    document.getElementById('li-round').textContent = `Pares encontrados: ${liState.encontrados} de ${liState.total}`;
    fb.textContent = '✅ Par certo!';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    incrementarDesafioDia('imagens');
    liState.palavraSelecionada = null;
    if(liState.encontrados === liState.total){
      setTimeout(()=>{
        marcarModoConcluido('ligaimagem');
        addEstrelas(2);
        mostrarRecompensa({emoji:'🔗', titulo:'Todos os pares!', texto:'Você ligou todas as palavras às imagens e ganhou estrelas extras!'});
        irPara('home'); renderHome();
      }, 700);
    }
  }else{
    el.classList.add('shake');
    liState.palavraSelecionada.classList.add('shake');
    fb.textContent = '❌ Não é esse par, tente novamente.';
    fb.className = 'feedback-area bad';
    setTimeout(()=>{
      el.classList.remove('shake');
      if(liState.palavraSelecionada) liState.palavraSelecionada.classList.remove('shake','selected');
      liState.palavraSelecionada = null;
    }, 450);
  }
}

/* ==========================================================================
   11) MODO 6 — MEMÓRIA DAS LETRAS
   ========================================================================== */
const mmState = { primeira:null, segunda:null, travado:false, pares:0, totalPares:6, tentativas:0 };

function iniciarMemoria(){
  const escolhidas = amostra(PALAVRAS, mmState.totalPares);
  const cartas = [];
  escolhidas.forEach((item,i)=>{
    cartas.push({ id:i, tipo:'letra', valor:item.palavra[0], par:i });
    cartas.push({ id:i, tipo:'emoji', valor:item.emoji, par:i });
  });
  const baralho = embaralhar(cartas);

  mmState.primeira = null; mmState.segunda = null; mmState.travado = false;
  mmState.pares = 0; mmState.tentativas = 0;
  atualizarPlacarMemoria();

  const grid = document.getElementById('mm-grid');
  grid.innerHTML = '';
  baralho.forEach(c=>{
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.par = c.par;
    card.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-face memory-front">?</div>
        <div class="memory-face memory-back">${c.valor}</div>
      </div>`;
    card.addEventListener('click', ()=> virarCartaMemoria(card));
    grid.appendChild(card);
  });
  document.getElementById('mm-feedback').textContent = '';
  document.getElementById('mm-feedback').className = 'feedback-area';
}
function atualizarPlacarMemoria(){
  document.getElementById('mm-round').textContent = `Pares: ${mmState.pares} de ${mmState.totalPares} · Tentativas: ${mmState.tentativas}`;
}
function virarCartaMemoria(card){
  if(mmState.travado || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.add('flipped');
  if(!mmState.primeira){
    mmState.primeira = card;
    return;
  }
  mmState.segunda = card;
  mmState.travado = true;
  mmState.tentativas++;
  atualizarPlacarMemoria();
  const fb = document.getElementById('mm-feedback');

  if(mmState.primeira.dataset.par === mmState.segunda.dataset.par){
    mmState.primeira.classList.add('matched');
    mmState.segunda.classList.add('matched');
    mmState.pares++;
    atualizarPlacarMemoria();
    fb.textContent = '✅ Par encontrado!';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    resetarSelecaoMemoria();
    if(mmState.pares === mmState.totalPares){
      setTimeout(()=>{
        marcarModoConcluido('memoria');
        addEstrelas(2);
        mostrarRecompensa({emoji:'🧠', titulo:'Memória de campeão!', texto:'Você encontrou todos os pares!'});
        irPara('home'); renderHome();
      }, 600);
    }
  }else{
    fb.textContent = '❌ Não é par, tente lembrar na próxima!';
    fb.className = 'feedback-area bad';
    setTimeout(()=>{
      mmState.primeira.classList.remove('flipped');
      mmState.segunda.classList.remove('flipped');
      resetarSelecaoMemoria();
    }, 900);
  }
}
function resetarSelecaoMemoria(){
  mmState.primeira = null; mmState.segunda = null; mmState.travado = false;
}

/* ==========================================================================
   12) MODO 7 — ORDENE AS SÍLABAS
   ========================================================================== */
const osState = { rodada:0, total:5, atual:null, escolhidas:[] };

function iniciarOrdeneSilabas(){
  osState.rodada = 0;
  osState.total = 5;
  proximaRodadaOrdeneSilabas();
  document.getElementById('os-check').onclick = conferirOrdeneSilabas;
  document.getElementById('os-clear').onclick = limparOrdeneSilabas;
}
function proximaRodadaOrdeneSilabas(){
  osState.rodada++;
  if(osState.rodada > osState.total){
    marcarModoConcluido('ordenesilabas');
    addEstrelas(3);
    mostrarRecompensa({emoji:'🔀', titulo:'Palavras organizadas!', texto:'Você ordenou todas as sílabas e ganhou 3 estrelas!'});
    irPara('home'); renderHome();
    return;
  }
  document.getElementById('os-round').textContent = `Rodada ${osState.rodada} de ${osState.total}`;
  const item = amostra(PALAVRAS.filter(p=>p.silabas.length<=3), 1)[0];
  osState.atual = item;
  osState.escolhidas = [];
  document.getElementById('os-hint').textContent = `Dica: a palavra tem ${item.silabas.length} sílabas e é ${item.emoji}`;

  const bank = document.getElementById('os-bank');
  bank.innerHTML = '';
  embaralhar(item.silabas).forEach((sil, i)=>{
    const tile = document.createElement('button');
    tile.className = 'tile';
    tile.textContent = sil;
    tile.dataset.id = i;
    tile.addEventListener('click', ()=> escolherSilabaOS(tile, sil));
    bank.appendChild(tile);
  });
  document.getElementById('os-answer').innerHTML = '';
  document.getElementById('os-feedback').textContent = '';
  document.getElementById('os-feedback').className = 'feedback-area';
}
function escolherSilabaOS(tile, sil){
  if(tile.classList.contains('used')) return;
  tile.classList.add('used');
  osState.escolhidas.push(sil);
  const answer = document.getElementById('os-answer');
  const chip = document.createElement('button');
  chip.className = 'tile';
  chip.textContent = sil;
  chip.addEventListener('click', ()=>{
    // permite remover ao clicar de volta
    const idx = osState.escolhidas.indexOf(sil);
    if(idx > -1) osState.escolhidas.splice(idx,1);
    chip.remove();
    tile.classList.remove('used');
  });
  answer.appendChild(chip);
}
function limparOrdeneSilabas(){
  osState.escolhidas = [];
  document.getElementById('os-answer').innerHTML = '';
  document.querySelectorAll('#os-bank .tile').forEach(t=>t.classList.remove('used'));
}
function conferirOrdeneSilabas(){
  const fb = document.getElementById('os-feedback');
  const formada = osState.escolhidas.join('');
  const correta = osState.atual.silabas.join('');
  if(formada === correta){
    fb.textContent = `✅ Isso aí! A palavra é ${osState.atual.palavra}.`;
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    incrementarDesafioDia('silabas');
    setTimeout(proximaRodadaOrdeneSilabas, 1000);
  }else{
    fb.textContent = '❌ Ainda não formou a palavra certa. Tente de novo!';
    fb.className = 'feedback-area bad';
  }
}

/* ==========================================================================
   13) MODO 8 — MISSÃO DAS EMOÇÕES
   ========================================================================== */
const emState = { rodada:0, total:4 };

function iniciarEmocoes(){
  emState.rodada = 0;
  emState.total = CENARIOS_EMOCAO.length;
  proximaRodadaEmocoes();
}
function proximaRodadaEmocoes(){
  emState.rodada++;
  if(emState.rodada > emState.total){
    marcarModoConcluido('emocoes');
    addEstrelas(3);
    mostrarRecompensa({emoji:'💛', titulo:'Coração gigante!', texto:'Você demonstrou empatia em todas as situações!'});
    irPara('home'); renderHome();
    return;
  }
  document.getElementById('em-round').textContent = `Situação ${emState.rodada} de ${emState.total}`;
  const cen = CENARIOS_EMOCAO[emState.rodada-1];
  document.getElementById('em-scenario').textContent = cen.texto;
  const box = document.getElementById('em-options');
  box.innerHTML = '';
  embaralhar(cen.opcoes).forEach(op=>{
    const btn = document.createElement('button');
    btn.className = 'opt-tile';
    btn.innerHTML = `${op.emoji}<br><span style="font-size:.7rem">${op.label}</span>`;
    btn.addEventListener('click', ()=> responderEmocoes(op, btn));
    box.appendChild(btn);
  });
  document.getElementById('em-feedback').textContent = '';
  document.getElementById('em-feedback').className = 'feedback-area';
}
function responderEmocoes(opcao, btn){
  const fb = document.getElementById('em-feedback');
  document.querySelectorAll('#em-options .opt-tile').forEach(b=>b.disabled = true);
  if(opcao.correta){
    btn.classList.add('correct');
    fb.textContent = '✅ Ótima escolha! Isso mostra empatia.';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    setTimeout(proximaRodadaEmocoes, 1000);
  }else{
    btn.classList.add('wrong');
    fb.textContent = '❌ Vamos pensar em uma atitude mais gentil...';
    fb.className = 'feedback-area bad';
    setTimeout(proximaRodadaEmocoes, 1400);
  }
}

/* ==========================================================================
   14) MODO 9 — TRILHA DO CONHECIMENTO
   ========================================================================== */
const TRILHA_TIPOS = ['letra','fonema','silaba','palavra','imagem','letra'];
const trState = { atual:0, total: TRILHA_TIPOS.length };

function iniciarTrilha(){
  trState.atual = 0;
  document.getElementById('trilha-finish').style.display = 'none';
  document.getElementById('trilha-challenge').style.display = 'block';
  renderTrilhaTrack();
  abrirDesafioTrilha();
  document.getElementById('tr-restart').onclick = iniciarTrilha;
}
function renderTrilhaTrack(){
  const track = document.getElementById('trilha-track');
  track.innerHTML = '';
  const icones = { letra:'🔤', fonema:'🔊', silaba:'🧩', palavra:'✏️', imagem:'🔗' };
  TRILHA_TIPOS.forEach((tipo,i)=>{
    const node = document.createElement('div');
    node.className = 'trail-node ' + (i < trState.atual ? 'done' : (i === trState.atual ? 'current' : 'locked'));
    node.textContent = i < trState.atual ? '✓' : icones[tipo];
    track.appendChild(node);
  });
  const fim = document.createElement('div');
  fim.className = 'trail-node ' + (trState.atual >= trState.total ? 'done' : 'locked');
  fim.textContent = '🏁';
  track.appendChild(fim);
}
function abrirDesafioTrilha(){
  if(trState.atual >= trState.total){
    document.getElementById('trilha-challenge').style.display = 'none';
    document.getElementById('trilha-finish').style.display = 'block';
    marcarModoConcluido('trilha');
    addEstrelas(5);
    mostrarRecompensa({emoji:'🏆', titulo:'Trilha concluída!', texto:'Você percorreu toda a trilha!'});
    return;
  }
  const tipo = TRILHA_TIPOS[trState.atual];
  document.getElementById('tr-title').textContent = `Casa ${trState.atual+1} de ${trState.total}`;
  const body = document.getElementById('tr-body');
  const fb = document.getElementById('tr-feedback');
  fb.textContent = ''; fb.className = 'feedback-area';
  body.innerHTML = '';

  if(tipo === 'letra'){
    const opcoes = amostra(ALFABETO,6);
    const alvo = aleatorioDe(opcoes);
    body.innerHTML = `<p>Encontre a letra <strong style="font-size:1.4rem">${alvo}</strong></p><div class="options-grid" id="tr-opts"></div>`;
    embaralhar(opcoes).forEach(l=>{
      const btn = document.createElement('button');
      btn.className = 'opt-tile'; btn.textContent = l;
      btn.onclick = ()=> validarTrilha(l === alvo, btn);
      document.getElementById('tr-opts').appendChild(btn);
    });
  }
  if(tipo === 'fonema'){
    const opcoes = amostra(ALFABETO,4);
    const alvo = aleatorioDe(opcoes);
    body.innerHTML = `<button class="btn-sound" id="tr-play">🔊 Ouvir som</button><div class="options-grid" id="tr-opts"></div>`;
    document.getElementById('tr-play').onclick = ()=> falar(alvo);
    setTimeout(()=>falar(alvo), 300);
    embaralhar(opcoes).forEach(l=>{
      const btn = document.createElement('button');
      btn.className = 'opt-tile'; btn.textContent = l;
      btn.onclick = ()=> validarTrilha(l === alvo, btn);
      document.getElementById('tr-opts').appendChild(btn);
    });
  }
  if(tipo === 'silaba'){
    const alvo = gerarSilabaAleatoria();
    const opcoes = embaralhar([alvo, gerarSilabaAleatoria(), gerarSilabaAleatoria()]);
    body.innerHTML = `<p>Toque na sílaba <strong style="font-size:1.3rem">${alvo}</strong></p><div class="options-grid" id="tr-opts"></div>`;
    opcoes.forEach(s=>{
      const btn = document.createElement('button');
      btn.className = 'opt-tile'; btn.textContent = s;
      btn.onclick = ()=> validarTrilha(s === alvo, btn);
      document.getElementById('tr-opts').appendChild(btn);
    });
  }
  if(tipo === 'palavra'){
    const item = aleatorioDe(PALAVRAS);
    const lacuna = montarLacuna(item.palavra);
    body.innerHTML = `<div class="word-emoji">${item.emoji}</div><div class="word-blank">${lacuna.exibida}</div><div class="options-grid" id="tr-opts"></div>`;
    lacuna.opcoes.forEach(l=>{
      const btn = document.createElement('button');
      btn.className = 'opt-tile'; btn.textContent = l;
      btn.onclick = ()=> validarTrilha(l === lacuna.letraCorreta, btn);
      document.getElementById('tr-opts').appendChild(btn);
    });
  }
  if(tipo === 'imagem'){
    const certo = aleatorioDe(PALAVRAS);
    const opcoes = embaralhar([certo, ...amostra(PALAVRAS.filter(p=>p!==certo),2)]);
    body.innerHTML = `<p>Qual imagem é <strong>${certo.palavra}</strong>?</p><div class="options-grid" id="tr-opts"></div>`;
    opcoes.forEach(p=>{
      const btn = document.createElement('button');
      btn.className = 'opt-tile'; btn.textContent = p.emoji; btn.style.fontSize='2rem';
      btn.onclick = ()=> validarTrilha(p.palavra === certo.palavra, btn);
      document.getElementById('tr-opts').appendChild(btn);
    });
  }
}
function validarTrilha(correto, btn){
  const fb = document.getElementById('tr-feedback');
  document.querySelectorAll('#tr-opts .opt-tile').forEach(b=>b.disabled = true);
  if(correto){
    btn.classList.add('correct');
    fb.textContent = '✅ Avançando na trilha!';
    fb.className = 'feedback-area ok';
    addEstrelas(1);
    trState.atual++;
    setTimeout(()=>{ renderTrilhaTrack(); abrirDesafioTrilha(); }, 900);
  }else{
    btn.classList.add('wrong');
    fb.textContent = '❌ Tente novamente para avançar!';
    fb.className = 'feedback-area bad';
    setTimeout(()=> abrirDesafioTrilha(), 1200);
  }
}

/* ==========================================================================
   15) MODO 10 — DESAFIO DO DIA
   ========================================================================== */
const DESAFIO_META = { letras:5, fonemas:3, silabas:4, palavras:3, imagens:5 };
const DESAFIO_INFO = {
  letras:   { icon:'🔎', titulo:'Reconhecer letras' },
  fonemas:  { icon:'🔊', titulo:'Identificar fonemas' },
  silabas:  { icon:'🧩', titulo:'Formar sílabas' },
  palavras: { icon:'✏️', titulo:'Completar palavras' },
  imagens:  { icon:'🔗', titulo:'Relacionar imagens' },
};

function incrementarDesafioDia(chave){
  if(state.dailyDate !== hojeISO()){
    state.dailyDate = hojeISO();
    state.dailyProgress = { letras:0, fonemas:0, silabas:0, palavras:0, imagens:0 };
    state.dailyDone = false;
  }
  if(state.dailyProgress[chave] < DESAFIO_META[chave]){
    state.dailyProgress[chave]++;
  }
  verificarConclusaoDesafioDia();
  salvarEstado();
  if(document.getElementById('screen-desafio').classList.contains('active')){
    renderDesafioDia();
  }
}
function verificarConclusaoDesafioDia(){
  const completo = Object.keys(DESAFIO_META).every(k => state.dailyProgress[k] >= DESAFIO_META[k]);
  if(completo && !state.dailyDone){
    state.dailyDone = true;
    if(!state.diasDesafioConcluidos) state.diasDesafioConcluidos = [];
    if(!state.diasDesafioConcluidos.includes(state.dailyDate)) state.diasDesafioConcluidos.push(state.dailyDate);
    marcarModoConcluido('desafio');
    setTimeout(()=> mostrarRecompensa({emoji:'📅', titulo:'Desafio do dia completo!', texto:'Você concluiu todas as missões de hoje!'}), 400);
  }
}

function iniciarDesafioDia(){
  const dt = new Date();
  document.getElementById('dd-date').textContent = `Desafios de hoje — ${dt.toLocaleDateString('pt-BR')}`;
  renderDesafioDia();
}
function renderDesafioDia(){
  const list = document.getElementById('dd-list');
  list.innerHTML = '';
  Object.keys(DESAFIO_META).forEach(chave=>{
    const meta = DESAFIO_META[chave];
    const atual = state.dailyProgress[chave];
    const info = DESAFIO_INFO[chave];
    const completo = atual >= meta;
    const item = document.createElement('div');
    item.className = 'daily-item' + (completo ? ' complete' : '');
    item.innerHTML = `
      <div class="daily-icon">${info.icon}</div>
      <div class="daily-body">
        <div class="daily-title">${info.titulo}</div>
        <div class="daily-progress">${Math.min(atual,meta)} de ${meta} concluído${meta>1?'s':''}</div>
      </div>
      <div>${completo ? '<span class="daily-check">✅</span>' : `<button data-chave="${chave}">Jogar</button>`}</div>
    `;
    if(!completo){
      item.querySelector('button').addEventListener('click', ()=> irParaMissaoRelacionada(chave));
    }
    list.appendChild(item);
  });
  const fb = document.getElementById('dd-feedback');
  if(state.dailyDone){
    fb.textContent = '🏅 Você já concluiu o desafio de hoje. Volte amanhã para mais missões!';
    fb.className = 'feedback-area ok';
  }else{
    fb.textContent = '';
  }
}
function irParaMissaoRelacionada(chave){
  const destino = {
    letras:'cacaletras', fonemas:'qualsom', silabas:'silaba', palavras:'completapalavra', imagens:'ligaimagem'
  }[chave];
  irPara(destino);
}

/* --------------------------------------------------------------------------
   16) INICIALIZAÇÃO
   -------------------------------------------------------------------------- */
function iniciarApp(){
  renderHeader();
  renderHome();
  if(!state.perfilCriado){
    document.body.classList.add('onboarding');
    montarAvatarPicker();
    irPara('boasvindas');
  }else{
    irPara('home');
  }
}
iniciarApp();