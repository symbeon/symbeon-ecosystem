#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const axeCore = require('axe-core')

async function run() {
  const distDir = path.resolve(__dirname, '..', 'dist')
  const indexPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found. Run `npm run build` first.')
    process.exit(2)
  }

  const html = fs.readFileSync(indexPath, 'utf8')
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' })
  const { window } = dom

  // Wait for any inline scripts to execute (small timeout)
  await new Promise((res) => setTimeout(res, 800))

  // Inject axe-core and run analysis
  const script = window.document.createElement('script')
  script.textContent = axeCore.source
  window.document.head.appendChild(script)

  try {
    const results = await window.axe.run(window.document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })
    const outPath = path.join(process.cwd(), 'axe-report.json')
    fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8')
    console.log('axe report written to', outPath)
    process.exit(0)
  } catch (err) {
    console.error('axe run failed:', err)
    process.exit(3)
  }
}

run()
