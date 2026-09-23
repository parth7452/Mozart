// Confirmed contact destination for Mozart Financial.
const CONTACT_URL = 'https://calendly.com/parthpahuja/30min?month=2026-09';
const CONTACT_LABEL = 'Prefer email? start@mozart.financial';
document.querySelector('#contact-cta').href = CONTACT_URL;
document.querySelector('#contact-email').textContent = CONTACT_LABEL;
document.querySelector('#year').textContent = new Date().getFullYear();

const field = document.querySelector('#score-bars');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heights = [19,32,48,26,64,45,72,38,57,83,48,66,35,79,52,92,59,73,41,68,87,48,64,34,75,55,88,43,65,37,53,72,45,61,29,47,34,21];
const bars = heights.map((height, index) => {
  const bar = document.createElement('span');
  bar.className = 'score-bar';
  bar.style.setProperty('--bar-height', `${height}%`);
  bar.style.setProperty('--bar-offset', `${Math.sin(index * 1.9) * 28}px`);
  bar.style.setProperty('--bar-opacity', index % 5 === 0 ? '.82' : '.28');
  field.append(bar);
  return bar;
});
let paused = reducedMotion.matches;
let inSync = false;
let interval;

function compose() {
  inSync = !inSync;
  bars.forEach((bar, index) => {
    const wave = 22 + 53 * Math.abs(Math.sin(index * .18));
    bar.style.setProperty('--bar-height', `${inSync ? wave : heights[index]}%`);
    bar.style.setProperty('--bar-offset', inSync ? '0px' : `${Math.sin(index * 1.9) * 28}px`);
    bar.style.setProperty('--bar-opacity', inSync ? '.65' : index % 5 === 0 ? '.82' : '.28');
  });
}
function updateMotion() {
  clearInterval(interval);
  if (!paused && !document.hidden) interval = setInterval(compose, 3300);
}
reducedMotion.addEventListener('change', event => { paused = event.matches; updateMotion(); });
document.addEventListener('visibilitychange', updateMotion);
updateMotion();

// This is a local search over published answers, not a model or a remote chat.
const faqForm = document.querySelector('#faq-form');
const faqQuestion = document.querySelector('#faq-question');
const faqResults = document.querySelector('#faq-results');
const faqStatus = document.querySelector('#faq-status');
const faqItems = [...document.querySelectorAll('.faq-item')];
const faqEntries = faqItems.map(item => ({
  title: item.querySelector('summary').textContent.trim(),
  keywords: item.dataset.keywords.split(' '),
  answer: item.querySelector('.faq-answer')
}));
faqEntries.push(
  {title: 'Are recoveries guaranteed?', keywords: ['guarantee', 'guaranteed', 'success', 'rate', 'win', 'results'], text: 'No. Outcomes depend on the evidence, retailer requirements, and the merits of the deduction. Mozart helps your team prepare a clear case; it does not guarantee a recovery.'},
  {title: 'Which retailers can I work with?', keywords: ['retailer', 'retailers', 'walmart', 'target', 'amazon', 'supported', 'coverage'], text: 'Coverage depends on the retailer and the documents available. Contact our team with the retailers you work with so we can confirm the fit for your workflow.'},
  {title: 'Can I delete my data or disconnect?', keywords: ['delete', 'deletion', 'disconnect', 'revoke', 'remove', 'export', 'cancel'], text: 'You can revoke QuickBooks access through Intuit’s connected-app controls. To request an export, deletion, or account closure, email start@mozart.financial. Disconnecting stops future access; deletion is a separate request and some legal or audit retention exceptions may apply.'}
);
faqForm.hidden = false;
faqForm.addEventListener('submit', event => {
  event.preventDefault();
  const question = faqQuestion.value.trim();
  if (!question) { faqQuestion.value = ''; faqQuestion.reportValidity(); return; }
  const words = new Set(question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' '));
  const ranked = faqEntries.map(entry => ({entry, score: entry.keywords.filter(word => words.has(word)).length})).sort((a,b) => b.score-a.score);
  const exact = faqEntries.find(entry => entry.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() === [...words].join(' ').trim());
  const match = exact || (ranked[0].score > 0 ? ranked[0].entry : null);
  document.querySelectorAll('.faq-item[open]').forEach(item => { item.open = false; });
  const result = document.createElement('details');
  result.className = 'faq-item';
  result.open = true;
  const summary = document.createElement('summary');
  summary.append(document.createTextNode(question));
  const chevron = document.createElement('span');
  chevron.className = 'faq-chevron'; chevron.setAttribute('aria-hidden','true'); summary.append(chevron);
  const answer = document.createElement('div'); answer.className = 'faq-answer';
  const source = document.createElement('p'); source.className = 'faq-source';
  source.textContent = match ? 'Related FAQ · '+match.title : 'A question for our team'; answer.append(source);
  if (match?.answer) { answer.append(match.answer.querySelector('p').cloneNode(true)); }
  else { const copy = document.createElement('p'); copy.textContent = match ? match.text : 'We do not have a published answer for that yet. Our team can help — send us your question.'; answer.append(copy); }
  const contact = document.createElement('a');
  contact.textContent = match ? 'Need more detail? Email our team ↗' : 'Email this question ↗';
  contact.href = 'mailto:start@mozart.financial?subject='+encodeURIComponent('Question about Mozart')+'&body='+encodeURIComponent(question);
  const contactLine = document.createElement('p'); contactLine.style.marginTop = '14px'; contactLine.append(contact); answer.append(contactLine);
  result.append(summary,answer); faqResults.append(result);
  if (faqResults.children.length > 5) faqResults.firstElementChild.remove();
  faqStatus.textContent = match ? 'Related answer added: '+match.title : 'No published answer found. An email link is available.';
  faqQuestion.value = ''; summary.focus();
});
