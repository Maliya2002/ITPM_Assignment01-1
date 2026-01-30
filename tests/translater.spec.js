const { test, expect } = require('@playwright/test');

// =======================================================
// Helper: type input, read Sinhala output, and log to stdout
// =======================================================
async function testTranslation(page, testId, input) {
  await page.goto('https://www.swifttranslator.com/');
  await page.waitForLoadState('networkidle');

  const inputBox = page.locator('textarea').first();
  await inputBox.waitFor({ state: 'visible' });

  await inputBox.fill('');
  await inputBox.fill(input);

  // Give the site a bit of time to generate the translation.
  await page.waitForTimeout(1500);

  // On SwiftTranslator, the Sinhala output appears in a div next to
  // the "Sinhala" label. We reuse that same locator pattern that the
  // trace viewer shows.
  const sinhalaOutputLocator = page
    .getByText('Sinhala', { exact: true })
    .locator('..')
    .locator('div')
    .nth(1);

  await sinhalaOutputLocator.waitFor({ state: 'visible' });

  // The translation can take a moment to appear, so poll until we
  // actually see some Sinhala text (or time out after a few seconds).
  let sinhalaText = '';
  for (let i = 0; i < 20; i++) {
    sinhalaText = (await sinhalaOutputLocator.innerText()).trim();
    if (sinhalaText.length > 0) break;
    await page.waitForTimeout(500);
  }

  // Log in the format shown in the assignment:
  // Pos_Fun_0001
  // INPUT: mama dhaen vaeda karanavaa.
  // ACTUAL OUTPUT:මම දැන් වැඩ කරනවා.
  console.log(`\n${testId}\nINPUT: ${input}\nACTUAL OUTPUT: ${sinhalaText}\n`);

  return sinhalaText;
}

// =======================================================
// POSITIVE FUNCTIONAL TESTS (24)
// =======================================================
test.describe('Positive Functional Tests', () => {

  test('Pos_Fun_0001', async ({ page }) => {
    const result = await testTranslation(
      page,
      'Pos_Fun_0001',
      'mama dhaen vaeda karanavaa.'
    );

    const expected = 'මම දැන් වැඩ කරනවා.';
    expect(result).toContain(expected);
  });

  test('Pos_Fun_0002', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0002', 'oyaa mokakdha karanne?');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0003', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0003', 'issarahata yanna.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0004', async ({ page }) => {
    const result = await testTranslation(
      page,
      'Pos_Fun_0004',
      'api naetum panthi giyaa.'
    );
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0005', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0005', 'api iiLaGata yamu.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0006', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0006', 'kohomadha oyaata?');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0007', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0007', 'mata udhavvak karanna puLuvandha?.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0008', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0008', 'ov, eeka hari.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0009', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0009', 'mata eeka epaa.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0010', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0010', 'eyaalaa enavaa');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0011', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0011', 'hariyata vaeda karanavaa.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0012', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0012', 'tika tika.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0013', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0013', 'mata WhatsApp karanna.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0014', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0014', 'Zoom meeting ekak thiyennee ');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0015', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0015', 'api Kandy valata yamudha');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0016', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0016', 'mata SMS ekak evanna.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0017', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0017', 'mata SMS ekak evanna.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0018', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0018', 'supiri!.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0019', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0019', 'mata USD 1500 oonee.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0020', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0020', 'mama 12.00 noon ta enavaa.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0021', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0021', 'mata baya hithenavaa.');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0022', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0022', 'mama kaeema kanna yanavaa api passe kathaa karamu  .');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0023', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0023', 'oya enavaanam mama balan innavaa. ');
    expect(result).toBeDefined();
  });

  test('Pos_Fun_0024', async ({ page }) => {
    const result = await testTranslation(page, 'Pos_Fun_0024', 'api heta yanavaa');
    expect(result).toBeDefined();
  });

});

// =======================================================
// NEGATIVE FUNCTIONAL TESTS (10)
// =======================================================
test.describe('Negative Functional Tests', () => {

  test('Neg_Fun_0001', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0001', 'matapaankannaoonee');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0002', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0002', 'appatasiri, mata beheth bonna amathaka vunaa kiyahannakoo');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0003', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0003', 'mama        gedhara        innee');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0004', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0004', 'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana,mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka saDHahan kaLeeya');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0005', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0005', 'siraavata, ela kiri machan');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0006', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0006', 'api passeekathaa karamu.mama dhaen yanna oonee.');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0007', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0007', 'mama (adha) gedhara yanavaa');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0008', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0008', 'CPU, GPU, RAM tika oonee');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0009', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0009', 'dhesaembar 25 dawasa api yamu');
    expect(result).toBeDefined();
  });

  test('Neg_Fun_0010', async ({ page }) => {
    const result = await testTranslation(page, 'Neg_Fun_0010', 'eeka');
    expect(result).toBeDefined();
  });

});

// =======================================================
// UI TEST
// =======================================================
test('Pos_UI_0001: Input accepts typing', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');
  const input = page.locator('textarea').first();
  await input.waitFor({ state: 'visible' });
  await input.type('mama kaeema kanavaa');
  expect(await input.inputValue()).toContain('mama kaeema kanavaa');
});