import "../chunk-BYZ2GIR3.js";
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["UNKNOWN"] = "unknown";
  Language2["EN"] = "en";
  Language2["ES"] = "es";
  Language2["PT"] = "pt";
  Language2["FR"] = "fr";
  Language2["DE"] = "de";
  Language2["RU"] = "ru";
  Language2["IT"] = "it";
  Language2["KO"] = "ko";
  Language2["JA"] = "ja";
  Language2["TR"] = "tr";
  Language2["PL"] = "pl";
  Language2["ZH"] = "zh";
  Language2["CA"] = "ca";
  Language2["NL"] = "nl";
  Language2["SV"] = "sv";
  Language2["ID"] = "id";
  Language2["HI"] = "hi";
  Language2["FI"] = "fi";
  Language2["VI"] = "vi";
  Language2["UK"] = "uk";
  Language2["EL"] = "el";
  Language2["MS"] = "ms";
  Language2["CS"] = "cs";
  Language2["RO"] = "ro";
  Language2["DA"] = "da";
  Language2["HU"] = "hu";
  Language2["TA"] = "ta";
  Language2["NO"] = "no";
  Language2["TH"] = "th";
  Language2["HR"] = "hr";
  Language2["BG"] = "bg";
  Language2["LT"] = "lt";
  Language2["LA"] = "la";
  Language2["MI"] = "mi";
  Language2["ML"] = "ml";
  Language2["CY"] = "cy";
  Language2["SK"] = "sk";
  Language2["TE"] = "te";
  Language2["LV"] = "lv";
  Language2["BN"] = "bn";
  Language2["SR"] = "sr";
  Language2["SL"] = "sl";
  Language2["KN"] = "kn";
  Language2["ET"] = "et";
  Language2["MK"] = "mk";
  Language2["BR"] = "br";
  Language2["EU"] = "eu";
  Language2["IS"] = "is";
  Language2["HY"] = "hy";
  Language2["NE"] = "ne";
  Language2["MN"] = "mn";
  Language2["BS"] = "bs";
  Language2["KK"] = "kk";
  Language2["SQ"] = "sq";
  Language2["SW"] = "sw";
  Language2["GL"] = "gl";
  Language2["MR"] = "mr";
  Language2["PA"] = "pa";
  Language2["SI"] = "si";
  Language2["KM"] = "km";
  Language2["SN"] = "sn";
  Language2["YO"] = "yo";
  Language2["SO"] = "so";
  Language2["AF"] = "af";
  Language2["OC"] = "oc";
  Language2["KA"] = "ka";
  Language2["BE"] = "be";
  Language2["TG"] = "tg";
  Language2["SD"] = "sd";
  Language2["GU"] = "gu";
  Language2["AM"] = "am";
  Language2["YI"] = "yi";
  Language2["LO"] = "lo";
  Language2["UZ"] = "uz";
  Language2["FO"] = "fo";
  Language2["HT"] = "ht";
  Language2["PS"] = "ps";
  Language2["TK"] = "tk";
  Language2["NN"] = "nn";
  Language2["MT"] = "mt";
  Language2["SA"] = "sa";
  Language2["LB"] = "lb";
  Language2["MY"] = "my";
  Language2["BO"] = "bo";
  Language2["TL"] = "tl";
  Language2["MG"] = "mg";
  Language2["AS"] = "as";
  Language2["TT"] = "tt";
  Language2["HAW"] = "haw";
  Language2["LN"] = "ln";
  Language2["HA"] = "ha";
  Language2["BA"] = "ba";
  Language2["JW"] = "jw";
  Language2["SU"] = "su";
  return Language2;
})(Language || {});
const LANGUAGES = Object.values(Language);
const LANGUAGE_NAME = {
  ["en" /* EN */]: "English",
  ["es" /* ES */]: "Spanish",
  ["pt" /* PT */]: "Portuguese",
  ["fr" /* FR */]: "French",
  ["de" /* DE */]: "German",
  ["ru" /* RU */]: "Russian",
  ["it" /* IT */]: "Italian",
  ["ko" /* KO */]: "Korean",
  ["ja" /* JA */]: "Japanese",
  ["tr" /* TR */]: "Turkish",
  ["pl" /* PL */]: "Polish",
  ["zh" /* ZH */]: "Chinese",
  ["ca" /* CA */]: "Catalan",
  ["nl" /* NL */]: "Dutch",
  ["sv" /* SV */]: "Swedish",
  ["id" /* ID */]: "Indonesian",
  ["hi" /* HI */]: "Hindi",
  ["fi" /* FI */]: "Finnish",
  ["vi" /* VI */]: "Vietnamese",
  ["uk" /* UK */]: "Ukrainian",
  ["el" /* EL */]: "Greek",
  ["cs" /* CS */]: "Czech",
  ["ro" /* RO */]: "Romanian",
  ["da" /* DA */]: "Danish",
  ["hu" /* HU */]: "Hungarian",
  ["ta" /* TA */]: "Tamil",
  ["no" /* NO */]: "Norwegian",
  ["th" /* TH */]: "Thai",
  ["hr" /* HR */]: "Croatian",
  ["bg" /* BG */]: "Bulgarian",
  ["lt" /* LT */]: "Lithuanian",
  ["la" /* LA */]: "Latin",
  ["mi" /* MI */]: "Maori",
  ["ml" /* ML */]: "Malayalam",
  ["sk" /* SK */]: "Slovak",
  ["te" /* TE */]: "Telugu",
  ["lv" /* LV */]: "Latvian",
  ["bn" /* BN */]: "Bengali",
  ["sr" /* SR */]: "Serbian",
  ["sl" /* SL */]: "Slovenian",
  ["kn" /* KN */]: "Kannada",
  ["et" /* ET */]: "Estonian",
  ["mk" /* MK */]: "Macedonian",
  ["br" /* BR */]: "Breton",
  ["eu" /* EU */]: "Basque",
  ["is" /* IS */]: "Icelandic",
  ["hy" /* HY */]: "Armenian",
  ["ne" /* NE */]: "Nepali",
  ["mn" /* MN */]: "Mongolian",
  ["bs" /* BS */]: "Bosnian",
  ["kk" /* KK */]: "Kazakh",
  ["sq" /* SQ */]: "Albanian",
  ["sw" /* SW */]: "Swahili",
  ["gl" /* GL */]: "Galician",
  ["mr" /* MR */]: "Marathi",
  ["pa" /* PA */]: "Punjabi",
  ["si" /* SI */]: "Sinhala",
  ["km" /* KM */]: "Khmer",
  ["sn" /* SN */]: "Shona",
  ["yo" /* YO */]: "Yoruba",
  ["so" /* SO */]: "Somali",
  ["af" /* AF */]: "Afrikaans",
  ["oc" /* OC */]: "Occitan",
  ["ka" /* KA */]: "Georgian",
  ["be" /* BE */]: "Belarusian",
  ["tg" /* TG */]: "Tajik",
  ["sd" /* SD */]: "Sindhi",
  ["gu" /* GU */]: "Gujarati",
  ["am" /* AM */]: "Amharic",
  ["yi" /* YI */]: "Yiddish",
  ["lo" /* LO */]: "Lao",
  ["uz" /* UZ */]: "Uzbek",
  ["fo" /* FO */]: "Faroese",
  ["ht" /* HT */]: "Haitian Creole",
  ["ps" /* PS */]: "Pashto",
  ["tk" /* TK */]: "Turkmen",
  ["nn" /* NN */]: "Norwegian Nynorsk",
  ["mt" /* MT */]: "Maltese",
  ["sa" /* SA */]: "Sanskrit",
  ["lb" /* LB */]: "Luxembourgish",
  ["my" /* MY */]: "Burmese",
  ["bo" /* BO */]: "Tibetan",
  ["tl" /* TL */]: "Tagalog",
  ["mg" /* MG */]: "Malagasy",
  ["as" /* AS */]: "Assamese",
  ["tt" /* TT */]: "Tatar",
  ["haw" /* HAW */]: "Hawaiian",
  ["ln" /* LN */]: "Lingala",
  ["ha" /* HA */]: "Hausa",
  ["ba" /* BA */]: "Bashkir",
  ["jw" /* JW */]: "Javanese",
  ["su" /* SU */]: "Sundanese"
  // Ignore these languages (high rate of hallucinations)
  // [Language.CY]: 'Welsh',
  // [Language.MS]: 'Malay',
  // Ignore these supported right-to-left languages
  // [Language.HE]: 'Hebrew',
  // [Language.AR]: 'Arabic',
  // [Language.FA]: 'Persian',
  // [Language.AZ]: 'Azerbaijani',
  // [Language.UR]: 'Urdu'
};
const MOST_POPULAR_LANGUAGES = [
  "en" /* EN */,
  "fr" /* FR */,
  "es" /* ES */,
  "pt" /* PT */,
  "de" /* DE */
];
export {
  LANGUAGES,
  LANGUAGE_NAME,
  Language,
  MOST_POPULAR_LANGUAGES
};
//# sourceMappingURL=transcription.js.map
