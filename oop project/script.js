/* Learn-E-Fy main script
   - Dashboard / Modules / Profile / Quiz MCQ / Subject panel + Games (Memory, TicTacToe, Sudoku)
   - localStorage used for profile persistence
*/

// ---------- Data (quizzes, modules, games) ----------
const SUBJECTS = {
  OOP: {
    id: 'OOP',
    title: 'Object Oriented Programming',
    icon: '🧠',
    theoryMCQ: [
      { q: "Which is not an OOP principle?", opts: ["Encapsulation","Inheritance","Polymorphism","Compilation"], a: 3 },
      { q: "What is encapsulation?", opts: ["Wrapping data & methods","Inheriting methods","Overriding","Class definition"], a: 0 },
      { q: "Polymorphism allows:", opts: ["Multiple forms of data","Same interface different implementations","Faster CPU","None"], a: 1 }
    ]
  },
  DBMS: {
    id: 'DBMS',
    title: 'Database Management Systems',
    icon: '💾',
    theoryMCQ: [
      { q: "What is a primary key?", opts: ["Unique identifier","Index only","Password","Nullable field"], a: 0 },
      { q: "Normalization reduces:", opts: ["Speed","Redundancy","Security","None"], a: 1 },
      { q: "ACID stands for:", opts: ["A,C,I,D","Atomicity,Consistency,Isolation,Durability","Always Commit In Database","None"], a: 1 }
    ]
  },
  GK: {
    id: 'GK',
    title: 'General Knowledge',
    icon: '🌍',
    theoryMCQ: [
      { q: "Capital of France?", opts: ["Berlin","Paris","Madrid","Rome"], a: 1 },
      { q: "Red planet?", opts: ["Earth","Venus","Mars","Jupiter"], a: 2 },
      { q: "H2O is:", opts: ["Oxygen","Hydrogen","Salt","Water"], a: 3 }
    ]
  }
};

// ---------- Profile persistence ----------
const DEFAULT_PROFILE = { name: 'Alex', roll: '12345', email: 'alex@example.com', year: '2', age: '18', courses: ['OOP','DBMS'] };
function loadProfile() {
  const raw = localStorage.getItem('learn_efy_profile');
  return raw ? JSON.parse(raw) : DEFAULT_PROFILE;
}
function saveProfile(profile) {
  localStorage.setItem('learn_efy_profile', JSON.stringify(profile));
  updateTopMini(profile);
}

// ---------- UI helpers ----------
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

// Navigation
$all('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    $all('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const page = item.dataset.page;
    setPage(page);
  });
});

function setPage(page){
  const content = $('#content');
  $('#pageTitle').textContent = page[0].toUpperCase() + page.slice(1);
  if(page === 'dashboard') renderDashboard(content);
  else if(page === 'modules') renderModules(content);
  else if(page === 'tasks') content.innerHTML = `<div class="module-form"><h2>Tasks</h2><p class="small-muted">No tasks yet.</p></div>`;
  else if(page === 'profile') renderProfile(content);
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  const prof = loadProfile();
  updateTopMini(prof);
  setPage('dashboard');
  attachSubjectPanelNav();
});

// update top user/micro info
function updateTopMini(profile){
  $('#topUser').textContent = `${profile.name} • ${1250} XP`;
  $('#miniName').textContent = profile.name;
  $('.avatar').textContent = profile.name ? profile.name.charAt(0).toUpperCase() : 'A';
}

// ---------- Dashboard ----------
function renderDashboard(container){
  container.innerHTML = `
    <div class="dashboard-head">
      <h2>Welcome back!</h2>
      <p class="small-muted">Choose a subject to start learning.</p>
    </div>
    <div class="dashboard-grid">
      ${Object.values(SUBJECTS).map(s => `
        <div class="card">
          <div>
            <div class="icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p class="small-muted">Theory quizzes, modules and interactive games inside subject area.</p>
          </div>
          <div>
            <button onclick="startLearning('${s.id}')">Start Learning</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ---------- Profile ----------
function renderProfile(container){
  const prof = loadProfile();
  container.innerHTML = `
    <div class="module-form">
      <h2>Profile</h2>
      <label>Name</label>
      <input id="pfName" type="text" value="${escapeHtml(prof.name)}" />
      <label>Roll No</label>
      <input id="pfRoll" type="text" value="${escapeHtml(prof.roll)}" />
      <label>Email</label>
      <input id="pfEmail" type="email" value="${escapeHtml(prof.email)}" />
      <label>Year</label>
      <select id="pfYear">
        <option ${prof.year==='1'?'selected':''}>1</option>
        <option ${prof.year==='2'?'selected':''}>2</option>
        <option ${prof.year==='3'?'selected':''}>3</option>
        <option ${prof.year==='4'?'selected':''}>4</option>
      </select>
      <label>Age</label>
      <input id="pfAge" type="number" value="${escapeHtml(prof.age)}" />
      <label>Courses (hold ctrl / cmd to multi-select)</label>
      <select id="pfCourses" multiple size="3">
        <option value="OOP" ${prof.courses.includes('OOP')?'selected':''}>OOP</option>
        <option value="DBMS" ${prof.courses.includes('DBMS')?'selected':''}>DBMS</option>
        <option value="GK" ${prof.courses.includes('GK')?'selected':''}>General Knowledge</option>
      </select>
      <div style="margin-top:12px; display:flex; gap:8px;">
        <button onclick="saveProfileForm()">Save Changes</button>
        <button onclick="resetProfile()">Reset</button>
      </div>
    </div>
  `;
}

function saveProfileForm(){
  const p = {
    name: $('#pfName').value || '',
    roll: $('#pfRoll').value || '',
    email: $('#pfEmail').value || '',
    year: $('#pfYear').value || '',
    age: $('#pfAge').value || '',
    courses: Array.from($('#pfCourses').selectedOptions).map(o=>o.value)
  };
  saveProfile(p);
  alert('Profile saved locally!');
}

// reset to defaults
function resetProfile(){
  localStorage.removeItem('learn_efy_profile');
  renderProfile($('#content'));
  updateTopMini(loadProfile());
}

// ---------- Modules Page ----------
function renderModules(container){
  container.innerHTML = `
    <div class="module-form">
      <h2>Modules</h2>
      <label>Select Year</label>
      <select id="modYear">
        <option value="1">Year 1</option>
        <option value="2" selected>Year 2</option>
        <option value="3">Year 3</option>
        <option value="4">Year 4</option>
      </select>
      <label>Select Subject</label>
      <select id="modSubject">
        ${Object.values(SUBJECTS).map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
      </select>
      <button style="margin-top:12px;" onclick="openSubjectFromModules()">Open Subject</button>
      <p class="small-muted" style="margin-top:12px;">After submitting, a subject panel appears on the right with Videos, Notes, Quizzes, Rewards & Games.</p>
    </div>
  `;
}

// when user submits modules form
function openSubjectFromModules(){
  const year = $('#modYear').value;
  const sub = $('#modSubject').value;
  openSubjectPanel(sub, year);
}

// ---------- Subject Panel logic ----------
function openSubjectPanel(subjectId, year='') {
  const s = SUBJECTS[subjectId];
  if(!s) return alert('Subject not found');
  $('#subjectPanel').classList.remove('hidden');
  $('#subjectIcon').textContent = s.icon;
  $('#subjectTitle').textContent = `${s.title} ${year?`• Year ${year}`:''}`;
  // set default content to videos
  setActiveSubjectTab('videos');
  renderSubjectContent('videos', s);
}

function closeSubjectPanel(){
  $('#subjectPanel').classList.add('hidden');
}

function attachSubjectPanelNav(){
  document.addEventListener('click', e=>{
    const el = e.target.closest('.subject-nav');
    if(!el) return;
    $('.subject-nav')?.classList && $all('.subject-nav').forEach(x=>x.classList.remove('active'));
    el.classList.add('active');
    const tab = el.dataset.tab;
    const subjectTitle = $('#subjectTitle').textContent.split(' • ')[0];
    const s = Object.values(SUBJECTS).find(ss=>ss.title === subjectTitle) || Object.values(SUBJECTS)[0];
    renderSubjectContent(tab, s);
  });
}
function setActiveSubjectTab(tab){
  $all('.subject-nav').forEach(n => n.classList.remove('active'));
  const el = $all('.subject-nav').find(n => n.dataset.tab === tab);
  if(el) el.classList.add('active');
}

// Render subject content for each tab
function renderSubjectContent(tab, subject){
  const container = $('#subjectContent');
  if(tab === 'videos'){
    container.innerHTML = `<h3>Videos</h3><p class="small-muted">Curated videos for ${subject.title} (placeholders)</p>
      <ul>
        <li>Intro to ${subject.id} - 8:12</li>
        <li>Core Concepts - 12:04</li>
        <li>Sample Demo - 6:30</li>
      </ul>`;
  } else if(tab === 'notes'){
    container.innerHTML = `<h3>Notes</h3><p class="small-muted">Short notes and downloadable resources.</p>
      <p>- Summary of important topics for ${subject.title}</p>`;
  } else if(tab === 'quizzes'){
    // show subject MCQ list & button to open the quiz modal
    container.innerHTML = `<h3>Quizzes</h3><p class="small-muted">Theory MCQs for ${subject.title}</p>
      <div style="margin-top:8px;">
        <button onclick="openSubjectMCQ('${subject.id}')">Start Subject MCQ (4-options)</button>
      </div>`;
  } else if(tab === 'rewards'){
    container.innerHTML = `<h3>Rewards</h3><p class="small-muted">Badges and achievements you can earn.</p>
      <ul><li>First Lesson Complete</li><li>Quiz Master</li><li>Green Contributor</li></ul>`;
  } else if(tab === 'games'){
    // show games UI: memory, tic-tac-toe, sudoku
    container.innerHTML = `<h3>Games</h3>
      <div class="game-area">
        <div class="game-controls">
          <button onclick="startMemory()">Memory</button>
          <button onclick="startTicTacToe()">Tic-Tac-Toe</button>
          <button onclick="startSudoku()">Sudoku</button>
        </div>
        <div id="gameContainer"></div>
      </div>`;
  } else container.innerHTML = `<p>Coming soon...</p>`;
}

// ---------- Quiz Modal (MCQ) ----------
let activeQuiz = { subjectId: null, questions: [], index: 0 };

function startLearning(subjectId){
  // start the first MCQ of subject directly as requested (Start Learning from Dashboard)
  activeQuiz.subjectId = subjectId;
  activeQuiz.questions = SUBJECTS[subjectId].theoryMCQ || [];
  activeQuiz.index = 0;
  if(!activeQuiz.questions.length) return alert('No quiz questions available.');
  openQuizModal(subjectId);
}

function openSubjectMCQ(subjectId){
  activeQuiz.subjectId = subjectId;
  activeQuiz.questions = SUBJECTS[subjectId].theoryMCQ || [];
  if(!activeQuiz.questions.length) return alert('No subject MCQs.');
  activeQuiz.index = 0;
  openQuizModal(subjectId);
}

function openQuizModal(subjectId){
  $('#quizModal').classList.remove('hidden');
  renderQuizQuestion();
}

function closeQuiz(){
  $('#quizModal').classList.add('hidden');
  $('#quizFeedback').textContent = '';
}

function renderQuizQuestion(){
  const qObj = activeQuiz.questions[activeQuiz.index];
  $('#quizModalTitle').textContent = `${activeQuiz.subjectId} — Question ${activeQuiz.index+1}/${activeQuiz.questions.length}`;
  $('#quizQ').textContent = qObj.q;
  const opts = qObj.opts;
  const optsContainer = $('#quizOptions');
  optsContainer.innerHTML = opts.map((opt,i) => `<button class="option-btn" data-idx="${i}" onclick="selectOption(this, ${i})">${escapeHtml(opt)}</button>`).join('');
  $('#quizFeedback').textContent = '';
}

function selectOption(btn, idx){
  // remove classes
  $all('.option-btn').forEach(b => b.classList.remove('correct','wrong'));
  const qObj = activeQuiz.questions[activeQuiz.index];
  const correct = qObj.a;
  if(idx === correct){
    btn.classList.add('correct');
    $('#quizFeedback').textContent = '🎉 Congrats!'; 
    confettiBurst();
    setTimeout(()=> { // auto move to next after a short delay to let confetti show
      // if more questions exist stay, allow user to press Next; but we also give immediate congrats and let them press next
    },200);
  } else {
    btn.classList.add('wrong');
    $('#quizFeedback').textContent = "It's OK!! Try again.";
  }
}

function nextQuizQuestion(){
  if(activeQuiz.index < activeQuiz.questions.length - 1){
    activeQuiz.index++;
    renderQuizQuestion();
  } else {
    alert('You completed this quiz!');
    closeQuiz();
  }
}
function prevQuizQuestion(){
  if(activeQuiz.index > 0){
    activeQuiz.index--;
    renderQuizQuestion();
  }
}

// ---------- Confetti ----------
function confettiBurst(){
  const c = $('#confetti');
  const colors = ['#ff5252','#ffb74d','#4dd0e1','#81c784','#ba68c8','#ffd54f'];
  for(let i=0;i<30;i++){
    const node = document.createElement('div');
    node.className = 'confetti-piece';
    const size = Math.random()*8+6;
    node.style.width = `${size}px`;
    node.style.height = `${size*0.6}px`;
    node.style.background = colors[Math.floor(Math.random()*colors.length)];
    node.style.position = 'absolute';
    node.style.left = `${Math.random()*100}%`;
    node.style.top = `0%`;
    node.style.opacity = 0.95;
    node.style.transform = `rotate(${Math.random()*360}deg)`;
    node.style.borderRadius = '2px';
    node.style.zIndex = 1600;
    node.style.pointerEvents = 'none';
    node.style.transition = 'transform 1.2s cubic-bezier(.2,.7,.2,1), top 1.2s ease, opacity 1.2s ease';
    c.appendChild(node);
    // animate
    requestAnimationFrame(()=> {
      const dx = (Math.random()-0.5)*200;
      const dy = 400 + Math.random()*200;
      node.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`;
      node.style.top = `${dy}px`;
      node.style.opacity = 0;
    });
    // remove after
    setTimeout(()=> node.remove(), 1400);
  }
}

// ---------- Games: Memory ----------
let memoryState = {};
function startMemory(){
  const container = $('#gameContainer');
  container.innerHTML = `<div class="memory-wrap"><div class="small-muted">Find pairs</div><div id="memoryGrid" class="memory-grid"></div><div style="margin-top:8px;"><button onclick="startMemory()">Restart</button></div></div>`;
  const emojis = ['🐶','🐱','🦊','🐼','🐵','🦁','🐸','🐷'];
  const deck = shuffle([...emojis, ...emojis]);
  memoryState = { deck, revealed: [], matched: [] };
  const grid = $('#memoryGrid');
  grid.innerHTML = deck.map((em,i)=>`<div class="memory-card" data-index="${i}" onclick="flipCard(${i})">?</div>`).join('');
}

function flipCard(idx){
  if(memoryState.matched.includes(idx)) return;
  if(memoryState.revealed.includes(idx)) return;
  memoryState.revealed.push(idx);
  drawMemory();
  if(memoryState.revealed.length === 2){
    const [a,b] = memoryState.revealed;
    if(memoryState.deck[a] === memoryState.deck[b]){
      memoryState.matched.push(a,b);
      memoryState.revealed = [];
      if(memoryState.matched.length === memoryState.deck.length){
        setTimeout(()=> alert('You matched all pairs! 🎉'),300);
      }
    } else {
      setTimeout(()=> { memoryState.revealed = []; drawMemory(); }, 700);
    }
  }
}
function drawMemory(){
  const grid = $('#memoryGrid');
  grid.querySelectorAll('.memory-card').forEach(card=>{
    const i = Number(card.dataset.index);
    if(memoryState.matched.includes(i)){
      card.textContent = memoryState.deck[i];
      card.style.background = '#e6ffef';
    } else if(memoryState.revealed.includes(i)){
      card.textContent = memoryState.deck[i];
      card.style.background = '#fff';
    } else {
      card.textContent = '?';
      card.style.background = '#fff';
    }
  });
}

// ---------- Games: Tic Tac Toe ----------
let tttState = { grid: Array(9).fill(''), turn: 'X', over:false };
function startTicTacToe(){
  tttState = { grid: Array(9).fill(''), turn: 'X', over:false };
  const container = $('#gameContainer');
  container.innerHTML = `<div><div class="small-muted">Tic-Tac-Toe</div><div id="tttGrid" class="ttt-grid"></div><div style="margin-top:8px;"><button onclick="startTicTacToe()">Restart</button></div></div>`;
  const g = $('#tttGrid');
  g.innerHTML = Array.from({length:9}).map((_,i)=>`<div class="ttt-cell" data-i="${i}" onclick="tttPlay(${i})"></div>`).join('');
}

function tttPlay(i){
  if(tttState.over) return;
  if(tttState.grid[i]) return;
  tttState.grid[i] = tttState.turn;
  const el = document.querySelector(`.ttt-cell[data-i='${i}']`);
  el.textContent = tttState.turn;
  const winner = checkTTTWinner(tttState.grid);
  if(winner){
    tttState.over = true;
    setTimeout(()=> alert(`Player ${winner} wins!`), 150);
    return;
  }
  if(tttState.grid.every(x=>x)) { tttState.over = true; setTimeout(()=> alert("It's a draw!"),150); return; }
  tttState.turn = tttState.turn === 'X' ? 'O' : 'X';
}

function checkTTTWinner(g){
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(const [a,b,c] of lines){
    if(g[a] && g[a]===g[b] && g[a]===g[c]) return g[a];
  }
  return null;
}

// ---------- Games: Sudoku (simple prefilled) ----------
const SAMPLE_SUDOKU = [
  // 9x9 matrix; 0 for empty
  [5,3,0, 0,7,0, 0,0,0],
  [6,0,0, 1,9,5, 0,0,0],
  [0,9,8, 0,0,0, 0,6,0],
  [8,0,0, 0,6,0, 0,0,3],
  [4,0,0, 8,0,3, 0,0,1],
  [7,0,0, 0,2,0, 0,0,6],
  [0,6,0, 0,0,0, 2,8,0],
  [0,0,0, 4,1,9, 0,0,5],
  [0,0,0, 0,8,0, 0,7,9]
];
function startSudoku(){
  const container = $('#gameContainer');
  container.innerHTML = `<div><div class="small-muted">Sudoku</div><div id="sudokuBoard" class="sudoku-board"></div><div style="margin-top:8px;"><button onclick="checkSudoku()">Check</button><button style="margin-left:8px;" onclick="startSudoku()">Restart</button></div></div>`;
  const board = $('#sudokuBoard');
  board.innerHTML = '';
  for(let r=0;r<9;r++){
    for(let c=0;c<9;c++){
      const val = SAMPLE_SUDOKU[r][c];
      const wrap = document.createElement('div'); wrap.className='sudoku-cell';
      const input = document.createElement('input'); input.maxLength=1; input.type='text';
      input.value = val===0?'':val;
      if(val!==0){ input.disabled = true; input.style.background='#f3f7f6'; input.style.fontWeight='700'; }
      wrap.appendChild(input);
      board.appendChild(wrap);
    }
  }
}

function checkSudoku(){
  const inputs = Array.from($('#sudokuBoard').querySelectorAll('input'));
  // build matrix
  const matrix = [];
  for(let r=0;r<9;r++){
    const row = [];
    for(let c=0;c<9;c++){
      const v = inputs[r*9 + c].value.trim();
      row.push(Number(v) || 0);
    }
    matrix.push(row);
  }
  // very simple validation: no zeros and rows 1-9 contain unique 1-9, same for cols
  for(let r=0;r<9;r++){
    const set = new Set(matrix[r]);
    if(set.size !== 9 || matrix[r].some(x=>x<1||x>9)) return alert('Not solved correctly yet.');
  }
  for(let c=0;c<9;c++){
    const col = matrix.map(r=>r[c]);
    const set = new Set(col);
    if(set.size !== 9 || col.some(x=>x<1||x>9)) return alert('Not solved correctly yet.');
  }
  alert('Great! Sudoku solved (basic validation). 🎉');
}

// ---------- Utilities ----------
function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }
function escapeHtml(str){ return String(str).replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[s]); }
