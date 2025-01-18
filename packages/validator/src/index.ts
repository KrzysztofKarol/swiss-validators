// https://www.sg.ch/wirtschaft-arbeit/pki/zertifikat-beantragen-verlaengern-loeschen/regeln-namen-vornamen.html
interface Params {
  idNumber: string;
  idNumberCheckDigit: string;
  birthDate: string;
  birthDateCheckDigit: string;
  expirationDate: string;
  expirationDateCheckDigit: string;
  globalCheckDigit: string;
}

function validator({
  idNumber,
  idNumberCheckDigit,
  birthDate,
  birthDateCheckDigit,
  expirationDate,
  expirationDateCheckDigit,
  globalCheckDigit,
}: Params) {
  const idNumberArr = idNumber
    .split("")
    .map((idNumberPart) =>
      idNumberPart.replace(/[A-Z]/, (letter) =>
        (letter.charCodeAt(0) - 55).toString(),
      ),
    )
    .map(Number);
  const idNumberCheckDigitNum = Number(idNumberCheckDigit);
  const birthDateArr = birthDate.split("").map(Number);
  const birthDateCheckDigitNum = Number(birthDateCheckDigit);
  const expirationDateArr = expirationDate.split("").map(Number);
  const expirationDateCheckDigitNum = Number(expirationDateCheckDigit);
  const globalCheckDigitNum = Number(globalCheckDigit);

  const globalArr = [
    ...idNumberArr,
    0,
    idNumberCheckDigitNum,
    ...birthDateArr,
    birthDateCheckDigitNum,
    ...expirationDateArr,
    expirationDateCheckDigitNum,
  ];

  return (
    isCheckDigitValid(idNumberArr, idNumberCheckDigitNum) &&
    isCheckDigitValid(birthDateArr, birthDateCheckDigitNum) &&
    isCheckDigitValid(expirationDateArr, expirationDateCheckDigitNum) &&
    isCheckDigitValid(globalArr, globalCheckDigitNum)
  );
}

function isCheckDigitValid(numbersArr: number[], checkDigit: number) {
  const wages = [7, 3, 1];

  const sum = numbersArr.reduce(
    // @ts-ignore i mod 3 is always 0, 1 or 2
    (acc, digit, i) => acc + digit * wages[i % wages.length],
    0,
  );
  const remainder = sum % 10;

  return remainder === checkDigit;
}

export default validator;
