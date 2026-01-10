import countries from "world-countries";

// Map country codes to phone codes
const phoneCodeMap = {
  US: "+1",
  CA: "+1",
  GB: "+44",
  AU: "+61",
  DE: "+49",
  FR: "+33",
  IT: "+39",
  ES: "+34",
  NL: "+31",
  BE: "+32",
  CH: "+41",
  AT: "+43",
  SE: "+46",
  NO: "+47",
  DK: "+45",
  FI: "+358",
  PL: "+48",
  PT: "+351",
  GR: "+30",
  IE: "+353",
  CZ: "+420",
  HU: "+36",
  RO: "+40",
  BG: "+359",
  HR: "+385",
  SK: "+421",
  SI: "+386",
  LT: "+370",
  LV: "+371",
  EE: "+372",
  LU: "+352",
  MT: "+356",
  CY: "+357",
  IS: "+354",
  JP: "+81",
  CN: "+86",
  IN: "+91",
  KR: "+82",
  ID: "+62",
  TH: "+66",
  VN: "+84",
  PH: "+63",
  MY: "+60",
  SG: "+65",
  TW: "+886",
  HK: "+852",
  MO: "+853",
  BD: "+880",
  PK: "+92",
  LK: "+94",
  MM: "+95",
  KH: "+855",
  LA: "+856",
  BN: "+673",
  TL: "+670",
  AF: "+93",
  IR: "+98",
  IQ: "+964",
  SA: "+966",
  AE: "+971",
  IL: "+972",
  JO: "+962",
  LB: "+961",
  SY: "+963",
  KW: "+965",
  QA: "+974",
  BH: "+973",
  OM: "+968",
  YE: "+967",
  TR: "+90",
  RU: "+7",
  KZ: "+7",
  UA: "+380",
  BY: "+375",
  MD: "+373",
  GE: "+995",
  AM: "+374",
  AZ: "+994",
  UZ: "+998",
  TJ: "+992",
  TM: "+993",
  KG: "+996",
  MN: "+976",
  BR: "+55",
  MX: "+52",
  AR: "+54",
  CO: "+57",
  CL: "+56",
  PE: "+51",
  VE: "+58",
  EC: "+593",
  BO: "+591",
  PY: "+595",
  UY: "+598",
  CR: "+506",
  PA: "+507",
  DO: "+1",
  CU: "+53",
  GT: "+502",
  HN: "+504",
  NI: "+505",
  SV: "+503",
  BZ: "+501",
  JM: "+1",
  TT: "+1",
  BB: "+1",
  BS: "+1",
  AG: "+1",
  DM: "+1",
  GD: "+1",
  LC: "+1",
  VC: "+1",
  KN: "+1",
  ZA: "+27",
  EG: "+20",
  NG: "+234",
  KE: "+254",
  ET: "+251",
  GH: "+233",
  TZ: "+255",
  UG: "+256",
  DZ: "+213",
  SD: "+249",
  MA: "+212",
  AO: "+244",
  MZ: "+258",
  MG: "+261",
  CM: "+237",
  CI: "+225",
  NE: "+227",
  BF: "+226",
  ML: "+223",
  SN: "+221",
  GN: "+224",
  LR: "+231",
  SL: "+232",
  TG: "+228",
  BJ: "+229",
  MU: "+230",
  MR: "+222",
  GM: "+220",
  GW: "+245",
  GQ: "+240",
  ST: "+239",
  CV: "+238",
  ZW: "+263",
  ZM: "+260",
  MW: "+265",
  LS: "+266",
  BW: "+267",
  NA: "+264",
  SZ: "+268",
  DJ: "+253",
  ER: "+291",
  SO: "+252",
  RW: "+250",
  BI: "+257",
  TD: "+235",
  CF: "+236",
  GA: "+241",
  CG: "+242",
  CD: "+243",
  SS: "+211",
  NZ: "+64",
  FJ: "+679",
  PG: "+675",
  SB: "+677",
  VU: "+678",
  NC: "+687",
  PF: "+689",
  WS: "+685",
  TO: "+676",
  TV: "+688",
  KI: "+686",
  NR: "+674",
  FM: "+691",
  MH: "+692",
  PW: "+680",
  AS: "+1",
  GU: "+1",
  MP: "+1",
  VI: "+1",
  PR: "+1",
};

// Get emoji flag for country
function getCountryFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Create countries list with phone codes
export const allCountries = countries
  .map((country) => {
    // Try to get phone code from country's callingCodes, otherwise use our map
    let phoneCode = null;

    // world-countries uses 'callingCode' property (array)
    if (
      country.callingCode &&
      Array.isArray(country.callingCode) &&
      country.callingCode.length > 0
    ) {
      phoneCode = `+${country.callingCode[0]}`;
    } else if (
      country.callingCodes &&
      Array.isArray(country.callingCodes) &&
      country.callingCodes.length > 0
    ) {
      phoneCode = `+${country.callingCodes[0]}`;
    } else {
      phoneCode = phoneCodeMap[country.cca2] || null;
    }

    if (!phoneCode) return null;

    return {
      code: phoneCode,
      name: country.name.common,
      iso: country.cca2,
      flag: getCountryFlag(country.cca2),
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

// Get country by phone code
export function getCountryByCode(phoneCode) {
  return allCountries.find((c) => c.code === phoneCode) || allCountries[0];
}
