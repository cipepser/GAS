const sheet = SpreadsheetApp.create("fibonacci").getActiveSheet()
sheet.getRange(1, 1).setValue(1)
sheet.getRange(2, 1).setValue(1)

function fibonacci(n: number): void {
  let Fi_1 = sheet.getRange(n-1, 1).getValue() as number
  let Fi_2 = sheet.getRange(n-2, 1).getValue() as number
  sheet.getRange(n, 1).setValue(Fi_1 + Fi_2)
}

function exec(n: number) {
  for (let i = 3; i <= n; i++) {
    fibonacci(i)
  }
}

function main() {
  exec(10)
}