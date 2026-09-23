# Mozart Financial website

Isolated snapshot of the live static website, with privacy and terms/EULA pages added September 23, 2026. Deploy from this directory to the existing Vercel `mozart` project. The parent app is not part of this deployment.

Run `npm run build`; deploy with `vercel deploy --prod`. Legal pages: `/privacy`, `/terms`; aliases: `/privacy-policy`, `/terms-of-service`, `/eula`.

Contact uses the existing public address start@mozart.financial. Policy does not assert an unverified corporate entity, postal address, certification, specific retention period, or governing jurisdiction. Maintain the policy as processing practices change; publication is not Intuit approval or a legal compliance audit.

## Recovery calculator and graphics

`/calculator.mjs` binds the inputs; `/recovery.mjs` calculates integer cents. Run `npm test` for scenario and boundary checks. Defaults ($10M annual sales, 5% deductions, 20% recovered, 0% fee) are illustrative and editable, not benchmarks. Fee defaults to excluded; no time savings are counted as recovered cash. Inputs stay in the browser.

The footer landscape is original generated artwork, compressed as a JPEG and styled with a navy overlay. Decorative documents and process diagrams use CSS. The site keeps Helvetica and the existing navy/lime system.
