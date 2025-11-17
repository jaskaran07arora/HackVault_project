const terminal = document.getElementById('terminal');
const leaderList = document.getElementById('leaderList');
const actionButtons = document.querySelectorAll('[data-action]');

const logs = [
  '[INFO] Connecting to microservices...',
  '[INFO] RabbitMQ queues online',
  '[WARN] Unusual login detected on port 4001',
  '[INFO] Redis cache active',
  '[ALERT] Admin token leaked!',
  '[INFO] Self-healing triggered via Kubernetes...',
  '[SUCCESS] System stabilized ✅'
];

function appendLog(text){
  terminal.textContent += `\n${text}`;
  terminal.scrollTop = terminal.scrollHeight;
}

function trigger(service){
  appendLog(`[ACTION] Attacking ${service}-service...`);
  setTimeout(()=>{
    const randomLog = logs[Math.floor(Math.random()*logs.length)];
    appendLog(randomLog);
    updateLeaderboard(service);
  }, 700 + Math.random()*800);
}

function updateLeaderboard(service){
  const points = Math.floor(Math.random()*500 + 100);
  const li = document.createElement('li');
  li.innerHTML = `<span>${service.toUpperCase()}_Hacker</span><span>${points} pts</span>`;
  leaderList.prepend(li);
  if(leaderList.children.length > 6) leaderList.removeChild(leaderList.lastChild);
}

actionButtons.forEach(btn=>{
  btn.addEventListener('click', ()=> trigger(btn.getAttribute('data-action')));
});

// periodic fake log generation
setInterval(()=>{
  const randomLog = logs[Math.floor(Math.random()*logs.length)];
  appendLog(randomLog);
}, 4500);

// initial boot messages
appendLog('[SYSTEM] Booting HackVault...');
setTimeout(()=>appendLog('[SYSTEM] Services discovered: login,file,api,admin,secret'),500);
setTimeout(()=>appendLog('[SYSTEM] Ready for demo — press any card button'),1200);
