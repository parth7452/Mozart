import assert from 'node:assert/strict';
import {estimate} from '../dist/recovery.mjs';
const defaults={salesCents:1000000000n,deductionBps:500,recoveryBps:2000,feeBps:0};
assert.deepEqual(estimate(defaults),{deductions:50000000n,recovered:10000000n,fee:0n,net:10000000n});
assert.equal(estimate({...defaults,feeBps:2500}).net,7500000n);
for (const key of ['deductionBps','recoveryBps']) assert.equal(estimate({...defaults,[key]:0}).recovered,0n);
assert.equal(estimate({...defaults,feeBps:10000}).net,0n);
assert.equal(estimate({...defaults,salesCents:50000000000n,deductionBps:1500,recoveryBps:10000}).recovered,7500000000n);
assert.equal(estimate({...defaults,salesCents:0n}).net,0n);
assert.throws(()=>estimate({...defaults,recoveryBps:10001}),RangeError);
assert.throws(()=>estimate({...defaults,feeBps:1.5}),RangeError);
for(let rate=0;rate<=10000;rate+=125){const e=estimate({...defaults,feeBps:rate});assert.equal(e.fee+e.net,e.recovered);assert(e.net>=0n);assert(e.recovered<=e.deductions);}
console.log('Recovery scenarios and integer-cent invariants passed.');
