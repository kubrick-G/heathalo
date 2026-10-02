const scenarios = {
  today: { risk: 72, label: 'High', summary: 'Start with the blocks where exposure and vulnerability overlap.', temp: '96°F', index: '104°F', canopy: '18%', widths: ['84%', '91%', '32%'], impact: '18%', dateLabel: 'Today · Aug 14, 2026' },
  tomorrow: { risk: 84, label: 'Very high', summary: 'Tomorrow’s peak arrives earlier. Move water and check-ins to the south route.', temp: '99°F', index: '109°F', canopy: '18%', widths: ['92%', '98%', '32%'], impact: '24%', dateLabel: 'Tomorrow · Aug 15, 2026' },
  weekend: { risk: 63, label: 'Elevated', summary: 'A cooler wind helps, but low-canopy blocks still need a human check-in.', temp: '92°F', index: '98°F', canopy: '18%', widths: ['73%', '76%', '32%'], impact: '13%', dateLabel: 'Weekend · Aug 16, 2026' }
};
const blockData = {
  a: { name: 'Juniper Court', score: 91, detail: 'Low canopy, high renter density, and 3 cooling stops more than a 10-minute walk away.' },
  b: { name: 'Martin Avenue', score: 74, detail: 'Wide asphalt frontage and a senior housing cluster make the noon window the key intervention moment.' },
  c: { name: '7th + Pine', score: 82, detail: 'Transit transfer point with little shade. A mobile water stop can reach people already on the move.' },
  d: { name: 'Willow Park', score: 48, detail: 'More canopy and a nearby splash pad lower exposure, but the route still needs a clear signpost.' }
};
const residentActions = [
  { title: 'Check on two neighbors before the 11:00 peak', meta: '10 min · Juniper Court', tag: 'CARE ROUTE', done: true },
  { title: 'Fill a bottle and take the shaded route to Willow Park', meta: '15 min · bring water', tag: 'COOLING', done: false },
  { title: 'Share the closest open cooling stop', meta: '1 min · text or call', tag: 'OUTREACH', done: false }
];
const organizerActions = [
  { title: 'Stage water at the Juniper Court entrance', meta: 'Owner: Maya · due 10:30', tag: 'SUPPLY', done: true },
  { title: 'Pair a check-in volunteer with every 10-minute route', meta: 'Owner: Sam · 6 neighbors', tag: 'CARE ROUTE', done: false },
  { title: 'Request a pop-up shade tent for 7th + Pine', meta: 'Owner: Noor · due 12:00', tag: 'SHADE', done: false }
];
let currentMode = 'resident';
let actions = residentActions.map(x => ({...x}));
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function announce(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(announce.timer);
  announce.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}
function renderActions() {
  $('#actionList').innerHTML = actions.map((action, index) => `<div class="action-item ${action.done ? 'done' : ''}"><button class="check-button" type="button" data-action="${index}" aria-label="${action.done ? 'Mark incomplete' : 'Mark complete'}">✓</button><div><div class="action-title">${action.title}</div><span class="action-meta">${action.meta}</span></div><span class="action-tag">${action.tag}</span></div>`).join('');
  $('#doneCount').textContent = actions.filter(action => action.done).length;
  $('#metricActions').textContent = String(actions.length + 3).padStart(2, '0');
  $$('.check-button').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.action);
    actions[index].done = !actions[index].done;
    renderActions();
    announce(actions[index].done ? 'Plan item marked ready.' : 'Plan item moved back to your queue.');
  }));
}
function updateScenario(key) {
  const scenario = scenarios[key];
  $('#riskValue').textContent = scenario.risk;
  $('#riskLabel').textContent = scenario.label;
  $('#riskSummary').textContent = scenario.summary;
  $('#impactValue').textContent = `${scenario.impact}`;
  const factors = $('#riskFactors').querySelectorAll('.bar b');
  scenario.widths.forEach((width, index) => factors[index].style.width = width);
  const values = $('#riskFactors').querySelectorAll('strong');
  values[0].textContent = scenario.temp;
  values[1].textContent = scenario.index;
  announce(`Signal updated for ${scenario.dateLabel}.`);
}
function setBlock(key) {
  const block = blockData[key];
  $$('.block').forEach(button => button.classList.toggle('selected', button.dataset.block === key));
  $('#blockName').textContent = block.name;
  $('#blockScore').textContent = block.score;
  $('#blockDetail').textContent = block.detail;
  announce(`${block.name} selected as the planning focus.`);
}
$$('.block').forEach(button => button.addEventListener('click', () => setBlock(button.dataset.block)));
$('#scenarioSelect').addEventListener('change', event => updateScenario(event.target.value));
$$('.mode-button').forEach(button => button.addEventListener('click', () => {
  currentMode = button.dataset.mode;
  $$('.mode-button').forEach(item => item.classList.toggle('active', item === button));
  actions = (currentMode === 'resident' ? residentActions : organizerActions).map(x => ({...x}));
  $('#actionEyebrow').textContent = currentMode === 'resident' ? 'FOR YOU / NEXT 3 HOURS' : 'FOR ORGANIZERS / TODAY';
  $('#impactTitle').innerHTML = currentMode === 'resident' ? 'One cooler block<br />can protect 240 people.' : 'One coordinated route<br />can unlock 6 actions.';
  $('#impactBody').textContent = currentMode === 'resident' ? 'A coordinated check-in route plus two shade stops gives residents a reason to leave the hottest pavement.' : 'When a group sees the same priority, small supplies and human time can move together instead of arriving too late.';
  renderActions();
  announce(`${currentMode === 'resident' ? 'Resident' : 'Organizer'} plan loaded.`);
}));
$('#addActionButton').addEventListener('click', () => {
  actions.push({ title: currentMode === 'resident' ? 'Save the route for later' : 'Add a local note to the block record', meta: currentMode === 'resident' ? '1 min · this device' : '2 min · shared with the team', tag: 'NEW', done: false });
  renderActions();
  announce('A new plan item was added.');
});
$('#shareButton').addEventListener('click', async () => {
  const shareText = 'HeatHalo: Eastwood heat risk is 72/100. Start with Juniper Court.';
  try {
    if (navigator.share) await navigator.share({ title: 'HeatHalo snapshot', text: shareText, url: window.location.href });
    else if (navigator.clipboard) { await navigator.clipboard.writeText(shareText); announce('Snapshot copied to clipboard.'); }
    else announce(shareText);
  } catch { announce('Snapshot ready to share when you are.'); }
});
renderActions();
