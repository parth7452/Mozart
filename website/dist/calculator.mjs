import {estimate} from './recovery.mjs';
const form = document.querySelector('#recovery-form');
const dollars = cents => '$'+((cents+50n)/100n).toLocaleString('en-US');
const fields = Object.fromEntries(['sales','deductions','recovery','fee'].map(id=>[id,document.querySelector('#calc-'+id)]));
function update() {
  const values = Object.fromEntries(Object.entries(fields).map(([id,field])=>[id,Number(field.value)]));
  const result = estimate({salesCents:BigInt(values.sales)*100000000n,deductionBps:values.deductions,recoveryBps:values.recovery*100,feeBps:values.fee*100});
  const labels = {sales:'$'+values.sales+'M',deductions:(values.deductions/100).toLocaleString('en-US')+'%',recovery:values.recovery+'%',fee:values.fee+'%'};
  for (const [id,field] of Object.entries(fields)) {
    document.querySelector('#calc-'+id+'-value').textContent=labels[id];
    field.setAttribute('aria-valuetext',labels[id]);
    field.style.setProperty('--filled',(Number(field.value)-Number(field.min))/(Number(field.max)-Number(field.min))*100+'%');
  }
  for (const key of ['deductions','recovered','fee','net']) document.querySelector('#result-'+key).textContent=dollars(result[key]);
  document.querySelector('#recovery-meter').style.setProperty('--recovered',values.recovery+'%');
  document.querySelector('#calc-formula').textContent=labels.sales+' annual retail sales × '+labels.deductions+' deductions × '+labels.recovery+' recovered';
}
form.querySelector('fieldset').disabled=false;
form.addEventListener('input',update);
form.addEventListener('submit',event=>event.preventDefault());
update();
