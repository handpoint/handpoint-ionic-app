import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyService {

  private CURRENCIES: any[] = [
    { code: "AED", numCode: 784, fractionSize: 2, name: "United Arab Emirates dirham" },
    { code: "AFN", numCode: 971, fractionSize: 2, name: "Afghani" },
    { code: "ALL", numCode: 8, fractionSize: 2, name: "Lek" },
    { code: "AMD", numCode: 51, fractionSize: 0, name: "Armenian dram" },
    { code: "ANG", numCode: 532, fractionSize: 2, name: "Netherlands Antillean guilder" },
    { code: "AOA", numCode: 973, fractionSize: 1, name: "Kwanza" },
    { code: "ARS", numCode: 32, fractionSize: 2, name: "Argentine peso" },
    { code: "AUD", numCode: 36, fractionSize: 2, name: "Australian dollar" },
    { code: "AWG", numCode: 533, fractionSize: 2, name: "Aruban guilder" },
    { code: "AZN", numCode: 944, fractionSize: 2, name: "Azerbaijanian manat" },
    { code: "BAM", numCode: 977, fractionSize: 2, name: "Convertible marks" },
    { code: "BBD", numCode: 52, fractionSize: 2, name: "Barbados dollar" },
    { code: "BDT", numCode: 50, fractionSize: 2, name: "Bangladeshi taka" },
    { code: "BGN", numCode: 975, fractionSize: 2, name: "Bulgarian lev" },
    { code: "BHD", numCode: 48, fractionSize: 3, name: "Bahraini dinar" },
    { code: "BIF", numCode: 108, fractionSize: 0, name: "Burundian franc" },
    { code: "BMD", numCode: 60, fractionSize: 2, name: "Bermudian dollar" },
    { code: "BND", numCode: 96, fractionSize: 2, name: "Brunei dollar" },
    { code: "BOB", numCode: 68, fractionSize: 2, name: "Boliviano" },
    { code: "BOV", numCode: 984, fractionSize: 2, name: "Bolivian Mvdol (funds code)" },
    { code: "BRL", numCode: 986, fractionSize: 2, name: "Brazilian real" },
    { code: "BSD", numCode: 44, fractionSize: 2, name: "Bahamian dollar" },
    { code: "BTN", numCode: 64, fractionSize: 2, name: "Ngultrum" },
    { code: "BWP", numCode: 72, fractionSize: 2, name: "Pula" },
    { code: "BYR", numCode: 974, fractionSize: 0, name: "Belarusian ruble" },
    { code: "BZD", numCode: 84, fractionSize: 2, name: "Belize dollar" },
    { code: "CAD", numCode: 124, fractionSize: 2, name: "Canadian dollar" },
    { code: "CDF", numCode: 976, fractionSize: 2, name: "Franc Congolais" },
    { code: "CHF", numCode: 756, fractionSize: 2, name: "Swiss franc" },
    { code: "CLP", numCode: 152, fractionSize: 0, name: "Chilean peso" },
    { code: "CNY", numCode: 156, fractionSize: 1, name: "Chinese Yuan" },
    { code: "COP", numCode: 170, fractionSize: 0, name: "Colombian peso" },
    { code: "COU", numCode: 970, fractionSize: 2, name: "Unidad de Valor Real" },
    { code: "CRC", numCode: 188, fractionSize: 2, name: "Costa Rican colon" },
    { code: "CUC", numCode: 931, fractionSize: 2, name: "Cuban convertible peso" },
    { code: "CUP", numCode: 192, fractionSize: 2, name: "Cuban peso" },
    { code: "CVE", numCode: 132, fractionSize: 2, name: "Cape Verde escudo" },
    { code: "CZK", numCode: 203, fractionSize: 2, name: "Czech Koruna" },
    { code: "DJF", numCode: 262, fractionSize: 0, name: "Djibouti franc" },
    { code: "DKK", numCode: 208, fractionSize: 2, name: "Danish krone" },
    { code: "DOP", numCode: 214, fractionSize: 2, name: "Dominican peso" },
    { code: "DZD", numCode: 12, fractionSize: 2, name: "Algerian dinar" },
    { code: "EGP", numCode: 818, fractionSize: 2, name: "Egyptian pound" },
    { code: "ERN", numCode: 232, fractionSize: 2, name: "Nakfa" },
    { code: "ETB", numCode: 230, fractionSize: 2, name: "Ethiopian birr" },
    { code: "EUR", numCode: 978, fractionSize: 2, name: "Euro" },
    { code: "FJD", numCode: 242, fractionSize: 2, name: "Fiji dollar" },
    { code: "FKP", numCode: 238, fractionSize: 2, name: "Falkland Islands pound" },
    { code: "GBP", numCode: 826, fractionSize: 2, name: "Pound sterling" },
    { code: "GEL", numCode: 981, fractionSize: 2, name: "Lari" },
    { code: "GHS", numCode: 936, fractionSize: 2, name: "Cedi" },
    { code: "GIP", numCode: 292, fractionSize: 2, name: "Gibraltar pound" },
    { code: "GMD", numCode: 270, fractionSize: 2, name: "Dalasi" },
    { code: "GNF", numCode: 324, fractionSize: 0, name: "Guinea franc" },
    { code: "GTQ", numCode: 320, fractionSize: 2, name: "Quetzal" },
    { code: "GYD", numCode: 328, fractionSize: 2, name: "Guyana dollar" },
    { code: "HKD", numCode: 344, fractionSize: 2, name: "Hong Kong dollar" },
    { code: "HNL", numCode: 340, fractionSize: 2, name: "Lempira" },
    { code: "HRK", numCode: 191, fractionSize: 2, name: "Croatian kuna" },
    { code: "HTG", numCode: 332, fractionSize: 2, name: "Haiti gourde" },
    { code: "HUF", numCode: 348, fractionSize: 2, name: "Forint" },
    { code: "IDR", numCode: 360, fractionSize: 0, name: "Rupiah" },
    { code: "ILS", numCode: 376, fractionSize: 2, name: "Israeli new sheqel" },
    { code: "INR", numCode: 356, fractionSize: 2, name: "Indian rupee" },
    { code: "IQD", numCode: 368, fractionSize: 0, name: "Iraqi dinar" },
    { code: "IRR", numCode: 364, fractionSize: 0, name: "Iranian rial" },
    { code: "ISK", numCode: 352, fractionSize: 0, name: "Iceland krona" },
    { code: "JMD", numCode: 388, fractionSize: 2, name: "Jamaican dollar" },
    { code: "JOD", numCode: 400, fractionSize: 3, name: "Jordanian dinar" },
    { code: "JPY", numCode: 392, fractionSize: 0, name: "Japanese yen" },
    { code: "KES", numCode: 404, fractionSize: 2, name: "Kenyan shilling" },
    { code: "KGS", numCode: 417, fractionSize: 2, name: "Som" },
    { code: "KHR", numCode: 116, fractionSize: 0, name: "Riel" },
    { code: "KMF", numCode: 174, fractionSize: 0, name: "Comoro franc" },
    { code: "KPW", numCode: 408, fractionSize: 0, name: "North Korean won" },
    { code: "KRW", numCode: 410, fractionSize: 0, name: "South Korean won" },
    { code: "KWD", numCode: 414, fractionSize: 3, name: "Kuwaiti dinar" },
    { code: "KYD", numCode: 136, fractionSize: 2, name: "Cayman Islands dollar" },
    { code: "KZT", numCode: 398, fractionSize: 2, name: "Tenge" },
    { code: "LAK", numCode: 418, fractionSize: 0, name: "Kip" },
    { code: "LBP", numCode: 422, fractionSize: 0, name: "Lebanese pound" },
    { code: "LKR", numCode: 144, fractionSize: 2, name: "Sri Lanka rupee" },
    { code: "LRD", numCode: 430, fractionSize: 2, name: "Liberian dollar" },
    { code: "LSL", numCode: 426, fractionSize: 2, name: "Lesotho loti" },
    { code: "LTL", numCode: 440, fractionSize: 2, name: "Lithuanian litas" },
    { code: "LYD", numCode: 434, fractionSize: 3, name: "Libyan dinar" },
    { code: "MAD", numCode: 504, fractionSize: 2, name: "Moroccan dirham" },
    { code: "MDL", numCode: 498, fractionSize: 2, name: "Moldovan leu" },
    { code: "MGA", numCode: 969, fractionSize: 2, name: "Malagasy ariary" },
    { code: "MKD", numCode: 807, fractionSize: 2, name: "Denar" },
    { code: "MMK", numCode: 104, fractionSize: 0, name: "Kyat" },
    { code: "MNT", numCode: 496, fractionSize: 2, name: "Tughrik" },
    { code: "MOP", numCode: 446, fractionSize: 1, name: "Pataca" },
    { code: "MRO", numCode: 478, fractionSize: 2, name: "Mauritanian ouguiya" },
    { code: "MUR", numCode: 480, fractionSize: 2, name: "Mauritius rupee" },
    { code: "MVR", numCode: 462, fractionSize: 2, name: "Rufiyaa" },
    { code: "MWK", numCode: 454, fractionSize: 2, name: "Kwacha" },
    { code: "MXN", numCode: 484, fractionSize: 2, name: "Mexican peso" },
    { code: "MXV", numCode: 979, fractionSize: 2, name: "Mexican Unidad de Inversion" },
    { code: "MYR", numCode: 458, fractionSize: 2, name: "Malaysian ringgit" },
    { code: "MZN", numCode: 943, fractionSize: 2, name: "Metical" },
    { code: "NAD", numCode: 516, fractionSize: 2, name: "Namibian dollar" },
    { code: "NGN", numCode: 566, fractionSize: 2, name: "Naira" },
    { code: "NIO", numCode: 558, fractionSize: 2, name: "Cordoba oro" },
    { code: "NOK", numCode: 578, fractionSize: 2, name: "Norwegian krone" },
    { code: "NPR", numCode: 524, fractionSize: 2, name: "Nepalese rupee" },
    { code: "NZD", numCode: 554, fractionSize: 2, name: "New Zealand dollar" },
    { code: "OMR", numCode: 512, fractionSize: 3, name: "Rial Omani" },
    { code: "PAB", numCode: 590, fractionSize: 2, name: "Balboa" },
    { code: "PEN", numCode: 604, fractionSize: 2, name: "Nuevo sol" },
    { code: "PGK", numCode: 598, fractionSize: 2, name: "Kina" },
    { code: "PHP", numCode: 608, fractionSize: 2, name: "Philippine peso" },
    { code: "PKR", numCode: 586, fractionSize: 2, name: "Pakistan rupee" },
    { code: "PLN", numCode: 985, fractionSize: 2, name: "Zloty" },
    { code: "PYG", numCode: 600, fractionSize: 0, name: "Guarani" },
    { code: "QAR", numCode: 634, fractionSize: 2, name: "Qatari rial" },
    { code: "RON", numCode: 946, fractionSize: 2, name: "Romanian new leu" },
    { code: "RSD", numCode: 941, fractionSize: 2, name: "Serbian dinar" },
    { code: "RUB", numCode: 643, fractionSize: 2, name: "Russian rouble" },
    { code: "RWF", numCode: 646, fractionSize: 0, name: "Rwanda franc" },
    { code: "SAR", numCode: 682, fractionSize: 2, name: "Saudi riyal" },
    { code: "SBD", numCode: 90, fractionSize: 2, name: "Solomon Islands dollar" },
    { code: "SCR", numCode: 690, fractionSize: 2, name: "Seychelles rupee" },
    { code: "SDG", numCode: 938, fractionSize: 2, name: "Sudanese pound" },
    { code: "SEK", numCode: 752, fractionSize: 2, name: "Swedish krona/kronor" },
    { code: "SGD", numCode: 702, fractionSize: 2, name: "Singapore dollar" },
    { code: "SHP", numCode: 654, fractionSize: 2, name: "Saint Helena pound" },
    { code: "SLL", numCode: 694, fractionSize: 0, name: "Leone" },
    { code: "SOS", numCode: 706, fractionSize: 2, name: "Somali shilling" },
    { code: "SRD", numCode: 968, fractionSize: 2, name: "Surinam dollar" },
    { code: "SSP", numCode: 728, fractionSize: 2, name: "South Sudanese pound" },
    { code: "STD", numCode: 678, fractionSize: 0, name: "Dobra" },
    { code: "SYP", numCode: 760, fractionSize: 2, name: "Syrian pound" },
    { code: "SZL", numCode: 748, fractionSize: 2, name: "Lilangeni" },
    { code: "THB", numCode: 764, fractionSize: 2, name: "Baht" },
    { code: "TJS", numCode: 972, fractionSize: 2, name: "Somoni" },
    { code: "TMT", numCode: 934, fractionSize: 2, name: "Manat" },
    { code: "TND", numCode: 788, fractionSize: 3, name: "Tunisian dinar" },
    { code: "TOP", numCode: 776, fractionSize: 2, name: "Pa'anga" },
    { code: "TRY", numCode: 949, fractionSize: 2, name: "Turkish lira" },
    { code: "TTD", numCode: 780, fractionSize: 2, name: "Trinidad and Tobago dollar" },
    { code: "TWD", numCode: 901, fractionSize: 1, name: "New Taiwan dollar" },
    { code: "TZS", numCode: 834, fractionSize: 2, name: "Tanzanian shilling" },
    { code: "UAH", numCode: 980, fractionSize: 2, name: "Hryvnia" },
    { code: "UGX", numCode: 800, fractionSize: 0, name: "Uganda shilling" },
    { code: "USD", numCode: 840, fractionSize: 2, name: "US dollar" },
    { code: "UZS", numCode: 860, fractionSize: 2, name: "Uzbekistan som" },
    { code: "VEF", numCode: 937, fractionSize: 2, name: "Venezuelan bolivar fuerte" },
    { code: "VND", numCode: 704, fractionSize: 0, name: "Vietnamese Dong" },
    { code: "VUV", numCode: 548, fractionSize: 0, name: "Vatu" },
    { code: "WST", numCode: 882, fractionSize: 2, name: "Samoan tala" },
    { code: "XAF", numCode: 950, fractionSize: 0, name: "CFA franc BEAC" },
    { code: "XCD", numCode: 951, fractionSize: 2, name: "East Caribbean dollar" },
    { code: "XOF", numCode: 952, fractionSize: 0, name: "CFA Franc BCEAO" },
    { code: "XPF", numCode: 953, fractionSize: 0, name: "CFP franc" },
    { code: "YER", numCode: 886, fractionSize: 0, name: "Yemeni rial" },
    { code: "ZAR", numCode: 710, fractionSize: 2, name: "South African rand" },
    { code: "ZMW", numCode: 967, fractionSize: 2, name: "Kwacha" },
    { code: "ZWL", numCode: 932, fractionSize: 2, name: "Zimbabwe dollar" }
  ];

  public DEFAULT_CODE = "GBP";

  constructor() {
    this.CURRENCIES.sort(function (a, b) {
      return a.name == b.name ? 0 : +(a.name > b.name) || -1;
    });
  }

  /**
   * Returns an array of currencies sorted by name
   */
  getAll() {
    return this.CURRENCIES;
  }

  /**
   * get currency by code
   * @param code 
   */
  get(code: string) {
    for (var i = 0; i < this.CURRENCIES.length; i++) {
      if (this.CURRENCIES[i].code == code) {
        return this.CURRENCIES[i];
      }
    }
    return null;
  }

  getDefault() {
    return this.get(this.DEFAULT_CODE);
  }

  getDefaultCode() {
    return this.DEFAULT_CODE;
  }

}