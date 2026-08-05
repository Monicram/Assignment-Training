export function getReport(data: any[]) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    if (d.score >= 50) {
      result.push({ n: d.name.trim(), s: 'PASS' });
    } else {
      result.push({ n: d.name.trim(), s: 'FAIL' });
    }
  }
  return result;
}