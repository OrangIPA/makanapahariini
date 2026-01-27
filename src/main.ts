import "./reset.css";
import "./style.css";

const sarapan = document.querySelector("#sarapan-display") as HTMLDivElement;
const makanSiang = document.querySelector("#makansiang-display") as HTMLDivElement;
const makanMalang = document.querySelector("#makanmalam-display") as HTMLDivElement;
const judul = document.querySelector('#judul') as HTMLDivElement;

const today = new Date();
const formatter = new Intl.DateTimeFormat("id", {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
})
judul.innerText = `Makan apa hari ini, ${formatter.format(today)}?`

const displays = [sarapan, makanSiang, makanMalang];

const WARUNG_LIST = [
  "Pamungkas",
  "Padang: Sabana",
  "Padang: POM",
  "CY The Second",
  "Mbak Eny",
  "Pakem",
  "Hara",
  "Wonder Kids",
  "Ngemie",
];

const seed =
  BigInt(
    parseInt(`${today.getFullYear()}${today.getMonth() + 1}${today.getDate() + 3}`),
  ) + 2n;


const g = BigInt(65537n);
const n = BigInt(187780411909n);

function modExp(base: bigint, exponent: bigint, modulus: bigint): BigInt {
  if (modulus <= 0n) {
    throw new Error("Modulus must be a positive integer.");
  }
  if (exponent < 0n) {
    throw new Error("Exponent must be a non-negative integer.");
  }

  let result = 1n;
  let b = base % modulus;
  let exp = exponent;

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * b) % modulus;
    }

    b = (b * b) % modulus;

    exp = exp >> 1n;
  }

  return result;
}

displays.forEach((v, i) => {
  const pseudorandom = modExp(g, seed * BigInt(i), n);
  const warungIndex = Math.floor(Number(pseudorandom) / Number(n) * (WARUNG_LIST.length));
  v.innerText = WARUNG_LIST[warungIndex];
});
