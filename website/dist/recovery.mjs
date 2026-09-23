// All currency arithmetic is integer cents. Rates are integer basis points.
export function estimate({salesCents, deductionBps, recoveryBps, feeBps}) {
  if (typeof salesCents !== 'bigint' || salesCents < 0n) throw new RangeError('Invalid sales');
  for (const rate of [deductionBps,recoveryBps,feeBps]) {
    if (!Number.isInteger(rate) || rate < 0 || rate > 10000) throw new RangeError('Invalid rate');
  }
  const portion = (cents,bps) => (cents * BigInt(bps) + 5000n) / 10000n;
  const deductions = portion(salesCents,deductionBps);
  const recovered = portion(deductions,recoveryBps);
  const fee = portion(recovered,feeBps);
  return {deductions,recovered,fee,net:recovered-fee};
}
