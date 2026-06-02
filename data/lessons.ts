export type WordCard = {
  urdu: string;
  translit: string;
  translation: string;
  gender?: "м" | "ж";
  type?: "noun" | "verb" | "adj" | "phrase";
};

export type GrammarCard = {
  question: string;
  formula: string;
  example: { urdu: string; translit: string; translation: string };
};

export type Exercise = {
  id: string;
  type: "ru_to_urdu" | "urdu_to_ru" | "choose";
  prompt: string;
  answer: string;
  options?: string[];
};

export type Lesson = {
  id: string;
  course: "intro" | "main";
  number: number;
  title: string;
  subtitle: string;
  grammarTopic: string;
  grammarCards: GrammarCard[];
  text: { urdu: string; translit: string; translation: string }[];
  vocabulary: WordCard[];
  exercises: Exercise[];
};

export const introLessons: Lesson[] = [
  {
    id: "intro-1",
    course: "intro",
    number: 1,
    title: "Урок 1",
    subtitle: "Алиф, Бе, Пе, Те, Се",
    grammarTopic: "Первая группа букв",
    grammarCards: [
      {
        question: "Как пишется «алиф» в начале слова?",
        formula: "ا — соединяется только с предыдущей буквой, не соединяется со следующей",
        example: { urdu: "اب", translit: "ab", translation: "сейчас" },
      },
      {
        question: "Чем отличаются ب، پ، ت، ث?",
        formula: "Один контур — разные точки: ب (1 снизу), پ (3 снизу), ت (2 сверху), ث (3 сверху)",
        example: { urdu: "باپ", translit: "bāp", translation: "отец" },
      },
    ],
    text: [
      { urdu: "اب", translit: "ab", translation: "сейчас" },
      { urdu: "باپ", translit: "bāp", translation: "отец" },
      { urdu: "آب", translit: "āb", translation: "вода" },
    ],
    vocabulary: [
      { urdu: "اب", translit: "ab", translation: "сейчас", type: "phrase" },
      { urdu: "باپ", translit: "bāp", translation: "отец", gender: "м", type: "noun" },
      { urdu: "آب", translit: "āb", translation: "вода", gender: "ж", type: "noun" },
      { urdu: "تب", translit: "tab", translation: "тогда", type: "phrase" },
    ],
    exercises: [
      { id: "i1-e1", type: "urdu_to_ru", prompt: "اب", answer: "сейчас" },
      { id: "i1-e2", type: "urdu_to_ru", prompt: "باپ", answer: "отец" },
      { id: "i1-e3", type: "ru_to_urdu", prompt: "вода", answer: "آب" },
      {
        id: "i1-e4",
        type: "choose",
        prompt: "Сколько точек у буквы پ?",
        answer: "3 снизу",
        options: ["1 снизу", "2 сверху", "3 снизу", "3 сверху"],
      },
    ],
  },
  {
    id: "intro-2",
    course: "intro",
    number: 2,
    title: "Урок 2",
    subtitle: "Джим, Че, Хе, Хе",
    grammarTopic: "Вторая группа букв",
    grammarCards: [
      {
        question: "Как различить ج، چ، ح، خ?",
        formula: "Один контур: ج (точка снизу), چ (3 снизу), ح (без точек), خ (точка сверху)",
        example: { urdu: "جاپان", translit: "jāpān", translation: "Япония" },
      },
    ],
    text: [
      { urdu: "جاپان", translit: "jāpān", translation: "Япония" },
      { urdu: "چاپ", translit: "cāp", translation: "печать" },
    ],
    vocabulary: [
      { urdu: "جاپان", translit: "jāpān", translation: "Япония", type: "noun" },
      { urdu: "چاپ", translit: "cāp", translation: "печать", gender: "ж", type: "noun" },
      { urdu: "حال", translit: "hāl", translation: "состояние", gender: "м", type: "noun" },
      { urdu: "خاص", translit: "xāṣ", translation: "особый", type: "adj" },
    ],
    exercises: [
      { id: "i2-e1", type: "urdu_to_ru", prompt: "حال", answer: "состояние" },
      { id: "i2-e2", type: "urdu_to_ru", prompt: "خاص", answer: "особый" },
      {
        id: "i2-e3",
        type: "choose",
        prompt: "У какой буквы точка сверху?",
        answer: "خ",
        options: ["ج", "چ", "ح", "خ"],
      },
    ],
  },
];

export const mainLessons: Lesson[] = [
  {
    id: "main-1",
    course: "main",
    number: 1,
    title: "Урок 1 — bāт чīт (Знакомство)",
    subtitle: "Знакомство. Профессии. Национальности",
    grammarTopic: "Именное сказуемое; согласование местоимений; کون ہے",
    grammarCards: [
      {
        question: "Как строится именное сказуемое в урду?",
        formula: "подлежащее + существительное/прилагательное + ہے/ہیں: وہ صحافی ہے = Он журналист",
        example: { urdu: "وہ صحافی ہے", translit: "voh ṣaḥāfī hai", translation: "Он журналист" },
      },
      {
        question: "Как спросить «кто это?»?",
        formula: "یہ/وہ + کون + ہے؟ — вопрос о личности: یہ آدمی کون ہے؟ = Кто этот человек?",
        example: { urdu: "یہ آدمی کون ہے؟", translit: "yeh ādmī kaun hai?", translation: "Кто этот человек?" },
      },
      {
        question: "Как согласуется притяжательное местоимение میرا?",
        formula: "میرا (м.р.) / میری (ж.р.) / میرے (мн.ч.): میرا نام = моё имя; میری کتاب = моя книга",
        example: { urdu: "میرا نام اِگور ہے", translit: "merā nām Igor hai", translation: "Меня зовут Игорь" },
      },
    ],
    text: [
      { urdu: "یہ آدمی کون ہے؟ وہ صحافی ہے۔", translit: "yeh ādmī kaun hai? voh ṣaḥāfī hai.", translation: "Кто этот человек? Он журналист." },
      { urdu: "میرا نام اِگور ہے۔ میں طالب علم ہوں۔", translit: "merā nām Igor hai. maiṉ ṭālib-e-ilm hūṉ.", translation: "Меня зовут Игорь. Я студент." },
      { urdu: "وہ بھی طالب علم ہیں۔", translit: "voh bhī ṭālib-e-ilm haiṉ.", translation: "Они тоже студенты." },
      { urdu: "یہ میرا دوست ہے۔", translit: "yeh merā dost hai.", translation: "Это мой друг." },
    ],
    vocabulary: [
      { urdu: "آدمی", translit: "ādmī", translation: "человек", gender: "м", type: "noun" },
      { urdu: "صحافی", translit: "ṣaḥāfī", translation: "журналист", gender: "м", type: "noun" },
      { urdu: "طالب علم", translit: "ṭālib-e-ilm", translation: "студент", gender: "м", type: "noun" },
      { urdu: "استاد", translit: "ustād", translation: "преподаватель", gender: "м", type: "noun" },
      { urdu: "دوست", translit: "dost", translation: "друг", gender: "м", type: "noun" },
      { urdu: "نام", translit: "nām", translation: "имя", gender: "м", type: "noun" },
      { urdu: "کون", translit: "kaun", translation: "кто", type: "phrase" },
      { urdu: "بھی", translit: "bhī", translation: "тоже, также", type: "phrase" },
      { urdu: "نہیں", translit: "nahīṉ", translation: "нет, не", type: "phrase" },
      { urdu: "ہندوستانی", translit: "hindustānī", translation: "индийский", type: "adj" },
    ],
    exercises: [
      { id: "m1-e1", type: "urdu_to_ru", prompt: "یہ آدمی کون ہے؟ وہ صحافی ہے۔", answer: "Кто этот человек? Он журналист." },
      { id: "m1-e2", type: "urdu_to_ru", prompt: "وہ بھی طالب علم ہیں۔", answer: "Они тоже студенты." },
      { id: "m1-e3", type: "ru_to_urdu", prompt: "Меня зовут Игорь. Я студент.", answer: "میرا نام اِگور ہے۔ میں طالب علم ہوں۔" },
      { id: "m1-e4", type: "ru_to_urdu", prompt: "Это мой друг.", answer: "یہ میرا دوست ہے۔" },
      {
        id: "m1-e5",
        type: "choose",
        prompt: "Как сказать «журналист» по-урду?",
        answer: "صحافی",
        options: ["استاد", "صحافی", "دوست", "آدمی"],
      },
      {
        id: "m1-e6",
        type: "choose",
        prompt: "«Кто Вы?» по-урду?",
        answer: "آپ کون ہیں؟",
        options: ["آپ کیا ہیں؟", "آپ کون ہیں؟", "آپ کہاں ہیں؟", "آپ کیسے ہیں؟"],
      },
    ],
  },
  {
    id: "main-2",
    course: "main",
    number: 2,
    title: "Урок 2 — мīрā хāндāн (Моя семья)",
    subtitle: "Семья. Настоящее время. Глаголы جانا، دیکھنا، چاہنا",
    grammarTopic: "Настоящее время глагола; множественное число существительных; глаголы движения и желания",
    grammarCards: [
      {
        question: "Как образуется настоящее время глагола?",
        formula: "основа + تا/تی/تے + ہے/ہیں: وہ جاتا ہے = Он идёт; وہ جاتی ہے = Она идёт",
        example: { urdu: "وہ اسکول جاتا ہے", translit: "voh iskūl jātā hai", translation: "Он идёт в школу" },
      },
      {
        question: "Как выразить желание (хотеть + инфинитив)?",
        formula: "субъект + инфинитив + چاہتا/چاہتی ہے: وہ جانا چاہتا ہے = Он хочет идти",
        example: { urdu: "وہ اسکول جانا چاہتا ہے", translit: "voh iskūl jānā cāhtā hai", translation: "Он хочет идти в школу" },
      },
      {
        question: "Как образуется множественное число существительных м.р. на -ā?",
        formula: "сущ. м.р. на -ā → -e: بھائی остаётся; لڑکا → لڑکے; خاندان не меняется",
        example: { urdu: "میرا خاندان بڑا ہے", translit: "merā xāndān baṛā hai", translation: "Моя семья большая" },
      },
    ],
    text: [
      { urdu: "میرا خاندان بڑا ہے۔", translit: "merā xāndān baṛā hai.", translation: "Моя семья большая." },
      { urdu: "وہ اسکول جانا چاہتا ہے۔", translit: "voh iskūl jānā cāhtā hai.", translation: "Он хочет идти в школу." },
      { urdu: "ہم گھر جاتے ہیں۔", translit: "ham ghar jāte haiṉ.", translation: "Мы идём домой." },
      { urdu: "میری بہن کتاب دیکھتی ہے۔", translit: "merī bahan kitāb dekhtī hai.", translation: "Моя сестра смотрит книгу." },
    ],
    vocabulary: [
      { urdu: "خاندان", translit: "xāndān", translation: "семья", gender: "м", type: "noun" },
      { urdu: "ابا", translit: "abbā", translation: "папа", gender: "м", type: "noun" },
      { urdu: "اماں", translit: "ammāṉ", translation: "мама", gender: "ж", type: "noun" },
      { urdu: "بھائی", translit: "bhāī", translation: "брат", gender: "м", type: "noun" },
      { urdu: "بہن", translit: "bahan", translation: "сестра", gender: "ж", type: "noun" },
      { urdu: "جانا", translit: "jānā", translation: "идти, уходить", type: "verb" },
      { urdu: "دیکھنا", translit: "dekhnā", translation: "смотреть, видеть", type: "verb" },
      { urdu: "چاہنا", translit: "cāhnā", translation: "хотеть", type: "verb" },
      { urdu: "لکھنا", translit: "likhnā", translation: "писать", type: "verb" },
      { urdu: "پڑھنا", translit: "paṛhnā", translation: "читать, учиться", type: "verb" },
    ],
    exercises: [
      { id: "m2-e1", type: "urdu_to_ru", prompt: "وہ اسکول جانا چاہتا ہے۔", answer: "Он хочет идти в школу." },
      { id: "m2-e2", type: "urdu_to_ru", prompt: "میرا خاندان بڑا ہے۔", answer: "Моя семья большая." },
      { id: "m2-e3", type: "ru_to_urdu", prompt: "Мы идём домой.", answer: "ہم گھر جاتے ہیں۔" },
      { id: "m2-e4", type: "ru_to_urdu", prompt: "Моя сестра пишет.", answer: "میری بہن لکھتی ہے۔" },
      {
        id: "m2-e5",
        type: "choose",
        prompt: "Настоящее время: основа глагола + ?",
        answer: "تا/تی/تے + ہے/ہیں",
        options: ["گا/گی/گے", "تا/تی/تے + ہے/ہیں", "یا/ئی/ئے", "رہا/رہی/رہے + ہے"],
      },
      {
        id: "m2-e6",
        type: "choose",
        prompt: "«Брат» по-урду?",
        answer: "بھائی",
        options: ["بہن", "بھائی", "ابا", "اماں"],
      },
    ],
  },
  {
    id: "main-3",
    course: "main",
    number: 3,
    title: "Урок 3 — Расписание. Учёба. Числительные 11–20",
    subtitle: "Распорядок дня. Послелоги. Настоящее продолженное",
    grammarTopic: "Настоящее продолженное время (رہا ہے); выражение времени; послелоги",
    grammarCards: [
      {
        question: "Как образуется настоящее продолженное время?",
        formula: "основа + رہا/رہی/رہے + ہے/ہیں: وہ پڑھ رہا ہے = Он читает (сейчас)",
        example: { urdu: "وہ پڑھ رہا ہے", translit: "voh paṛh rahā hai", translation: "Он читает (сейчас)" },
      },
      {
        question: "Как выразить время суток (в N часов)?",
        formula: "число + بجے = в ... часов: نو بجے = в 9 часов; کس وقت = в котором часу",
        example: { urdu: "پڑھائی نو بجے شروع ہوتی ہے", translit: "paṛhāī nau baje shurū hotī hai", translation: "Учёба начинается в 9 часов" },
      },
      {
        question: "Числительные 11–20 в урду?",
        formula: "گیارہ(11) بارہ(12) تیرہ(13) چودہ(14) پندرہ(15) سولہ(16) سترہ(17) اٹھارہ(18) انیس(19) بیس(20)",
        example: { urdu: "بیس طالب علم", translit: "bīs ṭālib-e-ilm", translation: "двадцать студентов" },
      },
    ],
    text: [
      { urdu: "آپ کس وقت اٹھتے ہیں؟", translit: "āp kis vaqt uṭhte haiṉ?", translation: "В котором часу Вы встаёте?" },
      { urdu: "پڑھائی نو بجے شروع ہوتی ہے۔", translit: "paṛhāī nau baje shurū hotī hai.", translation: "Учёба начинается в 9 часов." },
      { urdu: "آپ کہاں جا رہے ہیں؟", translit: "āp kahāṉ jā rahe haiṉ?", translation: "Куда Вы идёте?" },
      { urdu: "ابھی اماں اور دادی کیا کر رہی ہیں؟", translit: "abhī ammāṉ aur dādī kyā kar rahī haiṉ?", translation: "Что делают сейчас мама и бабушка?" },
    ],
    vocabulary: [
      { urdu: "وقت", translit: "vaqt", translation: "время", gender: "м", type: "noun" },
      { urdu: "پڑھائی", translit: "paṛhāī", translation: "учёба", gender: "ж", type: "noun" },
      { urdu: "شروع", translit: "shurū", translation: "начало; начинаться", type: "noun" },
      { urdu: "اٹھنا", translit: "uṭhnā", translation: "вставать", type: "verb" },
      { urdu: "ابھی", translit: "abhī", translation: "сейчас, прямо сейчас", type: "phrase" },
      { urdu: "دادی", translit: "dādī", translation: "бабушка (по отцу)", gender: "ж", type: "noun" },
      { urdu: "کہاں", translit: "kahāṉ", translation: "где, куда", type: "phrase" },
      { urdu: "بجے", translit: "baje", translation: "часов (при времени)", type: "phrase" },
      { urdu: "گیارہ", translit: "gyārah", translation: "одиннадцать", type: "phrase" },
      { urdu: "بیس", translit: "bīs", translation: "двадцать", type: "phrase" },
    ],
    exercises: [
      { id: "m3-e1", type: "urdu_to_ru", prompt: "آپ کس وقت اٹھتے ہیں؟", answer: "В котором часу Вы встаёте?" },
      { id: "m3-e2", type: "urdu_to_ru", prompt: "ابھی اماں اور دادی کیا کر رہی ہیں؟", answer: "Что делают сейчас мама и бабушка?" },
      { id: "m3-e3", type: "ru_to_urdu", prompt: "Куда Вы идёте?", answer: "آپ کہاں جا رہے ہیں؟" },
      { id: "m3-e4", type: "ru_to_urdu", prompt: "Учёба начинается в 9 часов.", answer: "پڑھائی نو بجے شروع ہوتی ہے۔" },
      {
        id: "m3-e5",
        type: "choose",
        prompt: "Настоящее продолженное = основа + ?",
        answer: "رہا/رہی/رہے + ہے/ہیں",
        options: ["تا/تی/تے + ہے/ہیں", "رہا/رہی/رہے + ہے/ہیں", "گا/گی/گے", "یا/ئی/ئے + ہے"],
      },
      {
        id: "m3-e6",
        type: "choose",
        prompt: "«В 9 часов» по-урду?",
        answer: "نو بجے",
        options: ["نو وقت", "نو بجے", "نو گھنٹے", "نو سے"],
      },
    ],
  },
  {
    id: "main-4",
    course: "main",
    number: 4,
    title: "Урок 4 — Местоимения. Прошедшее время. Повелительное",
    subtitle: "Косвенные формы местоимений. Прош. время. Повел. наклонение",
    grammarTopic: "Косвенные формы местоимений (مجھے/تمہیں/اسے/ہمیں/انہیں); прошедшее продолженное; повелительное наклонение",
    grammarCards: [
      {
        question: "Косвенные формы личных местоимений?",
        formula: "میں→مجھے, تم→تمہیں, وہ→اسے, ہم→ہمیں, وہ(мн.)→انہیں: وہ ہمیں جانتے ہیں = Они знают нас",
        example: { urdu: "وہ ہمیں جانتے ہیں", translit: "voh hameṉ jānte haiṉ", translation: "Они знают нас" },
      },
      {
        question: "Прошедшее продолженное время?",
        formula: "основа + رہا/رہی/رہے + تھا/تھی/تھے: لڑکی لکھ رہی تھی = Девочка писала (в тот момент)",
        example: { urdu: "لڑکی لکھ رہی تھی", translit: "laṛkī likh rahī thī", translation: "Девочка писала (в тот момент)" },
      },
      {
        question: "Повелительное наклонение (вежливое и нейтральное)?",
        formula: "нейтральное: основа + و (для ты): جاؤ; вежливое: основа + یے/ئیے: جایئے (идите)",
        example: { urdu: "یہاں آئیے", translit: "yahāṉ āiye", translation: "Идите сюда (пожалуйста)" },
      },
    ],
    text: [
      { urdu: "وہ ہمیں جانتے ہیں۔", translit: "voh hameṉ jānte haiṉ.", translation: "Они знают нас." },
      { urdu: "ہم انہیں جانتے ہیں۔", translit: "ham unheṉ jānte haiṉ.", translation: "Мы знаем их." },
      { urdu: "وہ ہمارے پاس آ رہی ہے۔", translit: "voh hamāre pās ā rahī hai.", translation: "Она идёт к нам." },
      { urdu: "لڑکی لکھ رہی تھی۔", translit: "laṛkī likh rahī thī.", translation: "Девочка писала (в тот момент)." },
    ],
    vocabulary: [
      { urdu: "مجھے", translit: "mujhe", translation: "мне, меня", type: "phrase" },
      { urdu: "تمہیں", translit: "tumheṉ", translation: "тебе, тебя", type: "phrase" },
      { urdu: "اسے", translit: "use", translation: "ему/ей, его/её", type: "phrase" },
      { urdu: "ہمیں", translit: "hameṉ", translation: "нам, нас", type: "phrase" },
      { urdu: "انہیں", translit: "unheṉ", translation: "им, их", type: "phrase" },
      { urdu: "جاننا", translit: "jānnā", translation: "знать", type: "verb" },
      { urdu: "پاس", translit: "pās", translation: "рядом, у (кого-то)", type: "phrase" },
      { urdu: "آنا", translit: "ānā", translation: "приходить", type: "verb" },
    ],
    exercises: [
      { id: "m4-e1", type: "urdu_to_ru", prompt: "وہ ہمیں جانتے ہیں۔", answer: "Они знают нас." },
      { id: "m4-e2", type: "urdu_to_ru", prompt: "لڑکی لکھ رہی تھی۔", answer: "Девочка писала (в тот момент)." },
      { id: "m4-e3", type: "ru_to_urdu", prompt: "Мы знаем их.", answer: "ہم انہیں جانتے ہیں۔" },
      { id: "m4-e4", type: "ru_to_urdu", prompt: "Она идёт к нам.", answer: "وہ ہمارے پاس آ رہی ہے۔" },
      {
        id: "m4-e5",
        type: "choose",
        prompt: "Косвенная форма от ہم (мы)?",
        answer: "ہمیں",
        options: ["مجھے", "تمہیں", "ہمیں", "انہیں"],
      },
      {
        id: "m4-e6",
        type: "choose",
        prompt: "Прош. продолженное = основа + رہا + ?",
        answer: "تھا/تھی/تھے",
        options: ["ہے/ہیں", "تھا/تھی/تھے", "گا/گی/گے", "ہو/ہوں"],
      },
    ],
  },
  {
    id: "main-5",
    course: "main",
    number: 5,
    title: "Урок 5 — āб о hавā (Климат и погода). Числительные 30–40",
    subtitle: "Климат. Степени сравнения. Суффикс والا. Числительные 30–40",
    grammarTopic: "Сравнительная степень (سے + прил.); превосходная степень (سب سے + прил.); суффикс والا",
    grammarCards: [
      {
        question: "Как образуется сравнительная степень?",
        formula: "X + سے + прилагательное: یہ اس سے بہتر ہے = Это лучше, чем то (досл. «от того лучше»)",
        example: { urdu: "یہ آب و ہوا اس سے بہتر ہے", translit: "yeh āb-o-havā us se behtar hai", translation: "Этот климат лучше, чем тот" },
      },
      {
        question: "Как образуется превосходная степень?",
        formula: "سب سے + прилагательное: سب سے گرم موسم = самый жаркий сезон",
        example: { urdu: "سب سے گرم موسم", translit: "sab se garm mausam", translation: "самый жаркий сезон" },
      },
      {
        question: "Суффикс والا (вала)?",
        formula: "существительное/глагол + والا/والی/والے = тот, кто делает/связан: چائے والا = чайщик",
        example: { urdu: "گرمیوں والا موسم", translit: "garmiyoṉ vālā mausam", translation: "летний сезон" },
      },
    ],
    text: [
      { urdu: "گرمیوں میں بہت گرمی ہوتی ہے۔", translit: "garmiyoṉ meṉ bahut garmī hotī hai.", translation: "Летом очень жарко." },
      { urdu: "سردیوں میں برف پڑتی ہے۔", translit: "sardiyoṉ meṉ barf paṛtī hai.", translation: "Зимой идёт снег." },
      { urdu: "یہ آب و ہوا اس سے بہتر ہے۔", translit: "yeh āb-o-havā us se behtar hai.", translation: "Этот климат лучше, чем тот." },
      { urdu: "پاکستان میں سب سے گرم موسم گرمیاں ہیں۔", translit: "pākistān meṉ sab se garm mausam garmiyāṉ haiṉ.", translation: "Самый жаркий сезон в Пакистане — лето." },
    ],
    vocabulary: [
      { urdu: "آب و ہوا", translit: "āb-o-havā", translation: "климат", gender: "ж", type: "noun" },
      { urdu: "گرمی", translit: "garmī", translation: "жара, тепло", gender: "ж", type: "noun" },
      { urdu: "سردی", translit: "sardī", translation: "холод", gender: "ж", type: "noun" },
      { urdu: "بارش", translit: "bārish", translation: "дождь", gender: "ж", type: "noun" },
      { urdu: "برف", translit: "barf", translation: "снег", gender: "ж", type: "noun" },
      { urdu: "موسم", translit: "mausam", translation: "погода, сезон", gender: "м", type: "noun" },
      { urdu: "گرمیاں", translit: "garmiyāṉ", translation: "лето", gender: "ж", type: "noun" },
      { urdu: "سردیاں", translit: "sardiyāṉ", translation: "зима", gender: "ж", type: "noun" },
      { urdu: "بہتر", translit: "behtar", translation: "лучше", type: "adj" },
      { urdu: "تیس", translit: "tīs", translation: "тридцать", type: "phrase" },
    ],
    exercises: [
      { id: "m5-e1", type: "urdu_to_ru", prompt: "گرمیوں میں بہت گرمی ہوتی ہے۔", answer: "Летом очень жарко." },
      { id: "m5-e2", type: "urdu_to_ru", prompt: "سردیوں میں برف پڑتی ہے۔", answer: "Зимой идёт снег." },
      { id: "m5-e3", type: "ru_to_urdu", prompt: "Этот климат лучше, чем тот.", answer: "یہ آب و ہوا اس سے بہتر ہے۔" },
      { id: "m5-e4", type: "ru_to_urdu", prompt: "Самый жаркий сезон.", answer: "سب سے گرم موسم" },
      {
        id: "m5-e5",
        type: "choose",
        prompt: "Превосходная степень образуется как?",
        answer: "سب سے + прилагательное",
        options: ["سے + прилагательное", "سب سے + прилагательное", "بہت + прилагательное", "والا + прилагательное"],
      },
      {
        id: "m5-e6",
        type: "choose",
        prompt: "«Снег» по-урду?",
        answer: "برف",
        options: ["بارش", "گرمی", "برف", "موسم"],
      },
    ],
  },
  {
    id: "main-6",
    course: "main",
    number: 6,
    title: "Урок 6 — ریل کا سفر (Путешествие на поезде)",
    subtitle: "Путешествие на самолёте и поезде. Перфект. Глагол سکنا",
    grammarTopic: "Прошедшее совершенное с نے; перфект (причастие + ہے); потенциальный глагол سکنا",
    grammarCards: [
      {
        question: "Конструкция نے для переходных глаголов в прошедшем совершенном?",
        formula: "субъект + نے + объект + причастие: اس نے ٹکٹ دکھایا = Он предъявил билет",
        example: { urdu: "اس نے ٹکٹ دکھایا", translit: "us ne ṭikaṭ dikhāyā", translation: "Он предъявил билет" },
      },
      {
        question: "Настоящее совершенное (перфект)?",
        formula: "причастие сов. вида + ہے/ہیں: وہ آیا ہے = Он пришёл (и сейчас здесь)",
        example: { urdu: "وہ آیا ہے", translit: "voh āyā hai", translation: "Он пришёл (и сейчас здесь)" },
      },
      {
        question: "Потенциальный глагол سکنا (мочь)?",
        formula: "основа + سکنا → спрягается: میں لکھ سکتا ہوں = Я могу писать",
        example: { urdu: "میں لکھ سکتا ہوں", translit: "maiṉ likh saktā hūṉ", translation: "Я могу писать" },
      },
    ],
    text: [
      { urdu: "اس نے ٹکٹ دکھایا۔", translit: "us ne ṭikaṭ dikhāyā.", translation: "Он предъявил билет." },
      { urdu: "میں لکھ سکتا ہوں۔", translit: "maiṉ likh saktā hūṉ.", translation: "Я могу писать." },
      { urdu: "سگریٹ پینا منع ہے۔", translit: "sigareṭ pīnā manā hai.", translation: "Курить запрещено." },
      { urdu: "ہوائی جہاز آٹھ سو کلومیٹر فی گھنٹہ کی رفتار سے اڑتا ہے۔", translit: "havāī jahāz āṭh sau kilomīṭar fī ghanṭah kī raftār se uṛtā hai.", translation: "Самолёт летит со скоростью 800 км/ч." },
    ],
    vocabulary: [
      { urdu: "ہوائی جہاز", translit: "havāī jahāz", translation: "самолёт", gender: "м", type: "noun" },
      { urdu: "ریل گاڑی", translit: "rel gāṛī", translation: "поезд", gender: "ж", type: "noun" },
      { urdu: "ٹکٹ", translit: "ṭikaṭ", translation: "билет", gender: "м", type: "noun" },
      { urdu: "سامان", translit: "sāmān", translation: "багаж, вещи", gender: "м", type: "noun" },
      { urdu: "مسافر", translit: "musāfir", translation: "пассажир, путешественник", gender: "м", type: "noun" },
      { urdu: "سکنا", translit: "saknā", translation: "мочь (потенциальный)", type: "verb" },
      { urdu: "دکھانا", translit: "dikhānā", translation: "показывать, предъявлять", type: "verb" },
      { urdu: "منع", translit: "manā", translation: "запрещено", type: "adj" },
      { urdu: "رفتار", translit: "raftār", translation: "скорость", gender: "ж", type: "noun" },
    ],
    exercises: [
      { id: "m6-e1", type: "urdu_to_ru", prompt: "اس نے ٹکٹ دکھایا۔", answer: "Он предъявил билет." },
      { id: "m6-e2", type: "urdu_to_ru", prompt: "سگریٹ پینا منع ہے۔", answer: "Курить запрещено." },
      { id: "m6-e3", type: "ru_to_urdu", prompt: "Я могу писать.", answer: "میں لکھ سکتا ہوں۔" },
      { id: "m6-e4", type: "ru_to_urdu", prompt: "Он предъявил билет.", answer: "اس نے ٹکٹ دکھایا۔" },
      {
        id: "m6-e5",
        type: "choose",
        prompt: "С каким послелогом субъект переходного глагола в прош. совершенном?",
        answer: "نے",
        options: ["کو", "سے", "نے", "پر"],
      },
      {
        id: "m6-e6",
        type: "choose",
        prompt: "«Самолёт» по-урду?",
        answer: "ہوائی جہاز",
        options: ["ریل گاڑی", "ہوائی جہاز", "مسافر", "ٹکٹ"],
      },
    ],
  },
  {
    id: "main-7",
    course: "main",
    number: 7,
    title: "Урок 7 — خریداری (Покупки). Числительные 50–60",
    subtitle: "Покупки. Магазин. Интенсивные глаголы. Условные придаточные",
    grammarTopic: "Интенсивные/завершительные глаголы (لینا/دینا/جانا после основы); условное اگر...تو; числительные 50–60",
    grammarCards: [
      {
        question: "Что такое интенсивные (завершительные) глаголы?",
        formula: "основа + لینا (для себя) / دینا (для другого): خرید لینا = купить (себе); خرید لو = купи",
        example: { urdu: "اگر آئے تو خرید لو", translit: "agar āe to xarīd lo", translation: "Если придёт — купи" },
      },
      {
        question: "Условное придаточное (если...то)?",
        formula: "اگر + сослагательное + تو + повелительное/будущее: اگر آئے تو جاؤ",
        example: { urdu: "اگر آئے تو خرید لو", translit: "agar āe to xarīd lo", translation: "Если придёт — купи" },
      },
      {
        question: "Числительные 50–60?",
        formula: "پچاس(50) اکیاون(51) باون(52) ترپن(53) چون(54) پچپن(55) چھپن(56) ستاون(57) اٹھاون(58) انسٹھ(59) ساٹھ(60)",
        example: { urdu: "پچاس روپے", translit: "pacās rupe", translation: "пятьдесят рупий" },
      },
    ],
    text: [
      { urdu: "یہ کپڑا کتنے کا ہے؟", translit: "yeh kaṛpā kitne kā hai?", translation: "Сколько стоит эта ткань?" },
      { urdu: "مجھے یہ زیورات پسند ہیں۔", translit: "mujhe yeh zīvarāt pasand haiṉ.", translation: "Мне нравятся эти украшения." },
      { urdu: "اگر آئے تو خرید لو۔", translit: "agar āe to xarīd lo.", translation: "Если придёт — купи." },
      { urdu: "دکاندار خریدار کی مدد کرتا ہے۔", translit: "dukāndār xarīdār kī madad kartā hai.", translation: "Продавец помогает покупателю." },
    ],
    vocabulary: [
      { urdu: "دکان", translit: "dukān", translation: "магазин, лавка", gender: "ж", type: "noun" },
      { urdu: "دکاندار", translit: "dukāndār", translation: "продавец", gender: "м", type: "noun" },
      { urdu: "خریدار", translit: "xarīdār", translation: "покупатель", gender: "м", type: "noun" },
      { urdu: "قیمت", translit: "qīmat", translation: "цена", gender: "ж", type: "noun" },
      { urdu: "کپڑا", translit: "kaṛpā", translation: "ткань, одежда", gender: "м", type: "noun" },
      { urdu: "زیور", translit: "zīvar", translation: "украшение", gender: "м", type: "noun" },
      { urdu: "مدد", translit: "madad", translation: "помощь", gender: "ж", type: "noun" },
      { urdu: "پسند", translit: "pasand", translation: "нравиться, нравится", type: "phrase" },
      { urdu: "پچاس", translit: "pacās", translation: "пятьдесят", type: "phrase" },
    ],
    exercises: [
      { id: "m7-e1", type: "urdu_to_ru", prompt: "یہ کپڑا کتنے کا ہے؟", answer: "Сколько стоит эта ткань?" },
      { id: "m7-e2", type: "urdu_to_ru", prompt: "دکاندار خریدار کی مدد کرتا ہے۔", answer: "Продавец помогает покупателю." },
      { id: "m7-e3", type: "ru_to_urdu", prompt: "Мне нравятся эти украшения.", answer: "مجھے یہ زیورات پسند ہیں۔" },
      { id: "m7-e4", type: "ru_to_urdu", prompt: "Если придёт — купи.", answer: "اگر آئے تو خرید لو۔" },
      {
        id: "m7-e5",
        type: "choose",
        prompt: "«Продавец» по-урду?",
        answer: "دکاندار",
        options: ["خریدار", "دکاندار", "مسافر", "دوست"],
      },
      {
        id: "m7-e6",
        type: "choose",
        prompt: "Интенсивный глагол «купить (себе)» — это?",
        answer: "خرید لینا",
        options: ["خرید دینا", "خرید لینا", "خرید جانا", "خریدنا"],
      },
    ],
  },
  {
    id: "main-8",
    course: "main",
    number: 8,
    title: "Урок 8 — عجائب گھر کی سیر (Экскурсия в музей). Числительные 60–70",
    subtitle: "Музей. Исламабад. Будущее время. Деепричастие",
    grammarTopic: "Будущее простое время (گا/گی/گے); деепричастие предшествования (основа + کر); числительные 60–70",
    grammarCards: [
      {
        question: "Простое будущее время?",
        formula: "основа + گا (м.ед.) / گی (ж.ед.) / گے (мн./веж.): کل وہ آئے گی = Завтра она придёт",
        example: { urdu: "کل وہ آئے گی", translit: "kal voh āegī", translation: "Завтра она придёт" },
      },
      {
        question: "Деепричастие предшествующего действия?",
        formula: "основа + کر = «сделав, после того как»: کھانا کھا کر جاؤ = Поев, иди",
        example: { urdu: "کھانا کھا کر جاؤ", translit: "khānā khā kar jāo", translation: "Поев, иди" },
      },
      {
        question: "Числительные 60–70?",
        formula: "ساٹھ(60) اکسٹھ(61) باسٹھ(62) تریسٹھ(63) چونسٹھ(64) پینسٹھ(65) چھیاسٹھ(66) سڑسٹھ(67) اڑسٹھ(68) انہتر(69) ستر(70)",
        example: { urdu: "ساٹھ طالب علم", translit: "sāṭh ṭālib-e-ilm", translation: "шестьдесят студентов" },
      },
    ],
    text: [
      { urdu: "ہم نے تاریخی عجائب گھر دیکھا۔", translit: "ham ne tārīxī ajāib-ghar dekhā.", translation: "Мы посетили исторический музей." },
      { urdu: "کل وہ آئے گی۔", translit: "kal voh āegī.", translation: "Завтра она придёт." },
      { urdu: "اسلام آباد پاکستان کا دارالحکومت ہے۔", translit: "islām-ābād pākistān kā dārul-hukūmat hai.", translation: "Исламабад — столица Пакистана." },
      { urdu: "کھانا کھا کر جاؤ۔", translit: "khānā khā kar jāo.", translation: "Поев, иди." },
    ],
    vocabulary: [
      { urdu: "عجائب گھر", translit: "ajāib-ghar", translation: "музей", gender: "м", type: "noun" },
      { urdu: "تاریخ", translit: "tārīx", translation: "история", gender: "ж", type: "noun" },
      { urdu: "گائیڈ", translit: "gāiḍ", translation: "экскурсовод", gender: "м", type: "noun" },
      { urdu: "نمائش", translit: "numāish", translation: "выставка", gender: "ж", type: "noun" },
      { urdu: "اسلام آباد", translit: "islām-ābād", translation: "Исламабад", type: "noun" },
      { urdu: "کراچی", translit: "karācī", translation: "Карачи", type: "noun" },
      { urdu: "دارالحکومت", translit: "dārul-hukūmat", translation: "столица", gender: "м", type: "noun" },
      { urdu: "تاریخی", translit: "tārīxī", translation: "исторический", type: "adj" },
      { urdu: "ساٹھ", translit: "sāṭh", translation: "шестьдесят", type: "phrase" },
    ],
    exercises: [
      { id: "m8-e1", type: "urdu_to_ru", prompt: "ہم نے تاریخی عجائب گھر دیکھا۔", answer: "Мы посетили исторический музей." },
      { id: "m8-e2", type: "urdu_to_ru", prompt: "اسلام آباد پاکستان کا دارالحکومت ہے۔", answer: "Исламабад — столица Пакистана." },
      { id: "m8-e3", type: "ru_to_urdu", prompt: "Завтра она придёт.", answer: "کل وہ آئے گی۔" },
      { id: "m8-e4", type: "ru_to_urdu", prompt: "Поев, иди.", answer: "کھانا کھا کر جاؤ۔" },
      {
        id: "m8-e5",
        type: "choose",
        prompt: "Суффикс будущего времени для ж.р. ед.ч.?",
        answer: "گی",
        options: ["گا", "گی", "گے", "گئے"],
      },
      {
        id: "m8-e6",
        type: "choose",
        prompt: "«Музей» по-урду?",
        answer: "عجائب گھر",
        options: ["نمائش", "عجائب گھر", "گائیڈ", "تاریخ"],
      },
    ],
  },
  {
    id: "main-9",
    course: "main",
    number: 9,
    title: "Урок 9 — ڈاک خانہ / بینک (Почта. Банк. Телефон). Числительные 70–80",
    subtitle: "Почта. Банк. Телефон. Страдательный залог",
    grammarTopic: "Страдательный залог: причастие + جانا; числительные 70–80",
    grammarCards: [
      {
        question: "Как образуется страдательный залог?",
        formula: "причастие сов. вида + جانا (спрягается): خط لکھا جاتا ہے = Письмо пишется",
        example: { urdu: "خط لکھا جاتا ہے", translit: "xaṭ likhā jātā hai", translation: "Письмо пишется" },
      },
      {
        question: "Страдательный залог в прошедшем времени?",
        formula: "причастие + جانا в прошедшем: خط لکھا گیا = Письмо было написано",
        example: { urdu: "خط لکھا گیا", translit: "xaṭ likhā gayā", translation: "Письмо было написано" },
      },
      {
        question: "Числительные 70–80?",
        formula: "ستر(70) اکہتر(71) بہتر(72) تہتر(73) چوہتر(74) پچہتر(75) چھہتر(76) ستتر(77) اٹھہتر(78) اناسی(79) اسی(80)",
        example: { urdu: "ستر روپے", translit: "sattar rupe", translation: "семьдесят рупий" },
      },
    ],
    text: [
      { urdu: "ٹیلیفون مصروف ہے۔", translit: "ṭelīfon maṣrūf hai.", translation: "Телефон занят." },
      { urdu: "اس نے خط ڈاک باکس میں ڈالا۔", translit: "us ne xaṭ ḍāk bāks meṉ ḍālā.", translation: "Он опустил письмо в почтовый ящик." },
      { urdu: "خط لکھا گیا۔", translit: "xaṭ likhā gayā.", translation: "Письмо было написано." },
      { urdu: "بینک میں کھاتہ کھولنا ہے۔", translit: "baink meṉ khātah kholnā hai.", translation: "Нужно открыть счёт в банке." },
    ],
    vocabulary: [
      { urdu: "ڈاک خانہ", translit: "ḍāk-xānah", translation: "почта, почтовое отделение", gender: "м", type: "noun" },
      { urdu: "خط", translit: "xaṭ", translation: "письмо", gender: "м", type: "noun" },
      { urdu: "بینک", translit: "baink", translation: "банк", gender: "м", type: "noun" },
      { urdu: "ٹیلیفون", translit: "ṭelīfon", translation: "телефон", gender: "м", type: "noun" },
      { urdu: "مصروف", translit: "maṣrūf", translation: "занятый, занят", type: "adj" },
      { urdu: "کھاتہ", translit: "khātah", translation: "счёт (банковский)", gender: "м", type: "noun" },
      { urdu: "ڈالنا", translit: "ḍālnā", translation: "бросать, класть", type: "verb" },
      { urdu: "کھولنا", translit: "kholnā", translation: "открывать", type: "verb" },
      { urdu: "ستر", translit: "sattar", translation: "семьдесят", type: "phrase" },
    ],
    exercises: [
      { id: "m9-e1", type: "urdu_to_ru", prompt: "ٹیلیفون مصروف ہے۔", answer: "Телефон занят." },
      { id: "m9-e2", type: "urdu_to_ru", prompt: "خط لکھا گیا۔", answer: "Письмо было написано." },
      { id: "m9-e3", type: "ru_to_urdu", prompt: "Он опустил письмо в почтовый ящик.", answer: "اس نے خط ڈاک باکس میں ڈالا۔" },
      { id: "m9-e4", type: "ru_to_urdu", prompt: "Открыть счёт в банке.", answer: "بینک میں کھاتہ کھولنا" },
      {
        id: "m9-e5",
        type: "choose",
        prompt: "Страдательный залог = причастие сов. вида + ?",
        answer: "جانا (спрягается)",
        options: ["سکنا", "جانا (спрягается)", "رہنا", "دینا"],
      },
      {
        id: "m9-e6",
        type: "choose",
        prompt: "«Письмо» по-урду?",
        answer: "خط",
        options: ["کھاتہ", "خط", "ڈاک خانہ", "ٹیلیفون"],
      },
    ],
  },
  {
    id: "main-10",
    course: "main",
    number: 10,
    title: "Урок 10 — ٹیلی ویژن (Телевидение). Числительные 80–90",
    subtitle: "Телевидение. Лахор. Сослагательное наклонение",
    grammarTopic: "Сослагательное наклонение (простое и продолженное); تاکہ (чтобы); کاش (хоть бы); числительные 80–90",
    grammarCards: [
      {
        question: "Простое сослагательное наклонение?",
        formula: "основа (ед.ч.) или + یں (мн.ч.): وہ آئے = пусть он придёт / он пришёл бы; کاش وہ ہوتا = хоть бы он был",
        example: { urdu: "کاش وہ یہاں ہوتا", translit: "kāsh voh yahāṉ hotā", translation: "Хоть бы он был здесь" },
      },
      {
        question: "Придаточное цели с تاکہ?",
        formula: "главное предложение + تاکہ + сослагательное: وہ آیا تاکہ سیکھے = Он пришёл, чтобы учиться",
        example: { urdu: "وہ آیا تاکہ سیکھے", translit: "voh āyā tākeh seekhe", translation: "Он пришёл, чтобы учиться" },
      },
      {
        question: "Числительные 80–90?",
        formula: "اسی(80) اکیاسی(81) بیاسی(82) تراسی(83) چوراسی(84) پچاسی(85) چھیاسی(86) ستاسی(87) اٹھاسی(88) نواسی(89) نوے(90)",
        example: { urdu: "اسی فیصد", translit: "assī fīṣad", translation: "восемьдесят процентов" },
      },
    ],
    text: [
      { urdu: "ٹیلی ویژن کی بڑی اہمیت ہے۔", translit: "ṭelī vizan kī baṛī ahmiyat hai.", translation: "Телевидение имеет большое значение." },
      { urdu: "کاش وہ یہاں ہوتا۔", translit: "kāsh voh yahāṉ hotā.", translation: "Хоть бы он был здесь." },
      { urdu: "وہ آیا تاکہ سیکھے۔", translit: "voh āyā tākeh seekhe.", translation: "Он пришёл, чтобы учиться." },
      { urdu: "ہم تفریحی پروگرام دیکھتے ہیں۔", translit: "ham tafriḥī progrām dekhte haiṉ.", translation: "Мы смотрим развлекательную программу." },
    ],
    vocabulary: [
      { urdu: "ٹیلی ویژن", translit: "ṭelī vizan", translation: "телевидение", gender: "м", type: "noun" },
      { urdu: "پروگرام", translit: "progrām", translation: "программа", gender: "м", type: "noun" },
      { urdu: "تفریح", translit: "tafrīḥ", translation: "развлечение, отдых", gender: "ж", type: "noun" },
      { urdu: "اہمیت", translit: "ahmiyat", translation: "значение, важность", gender: "ж", type: "noun" },
      { urdu: "لاہور", translit: "lāhor", translation: "Лахор", type: "noun" },
      { urdu: "کاش", translit: "kāsh", translation: "хоть бы, если бы только", type: "phrase" },
      { urdu: "تاکہ", translit: "tākeh", translation: "чтобы (цель)", type: "phrase" },
      { urdu: "تفریحی", translit: "tafriḥī", translation: "развлекательный", type: "adj" },
      { urdu: "اسی", translit: "assī", translation: "восемьдесят", type: "phrase" },
    ],
    exercises: [
      { id: "m10-e1", type: "urdu_to_ru", prompt: "ٹیلی ویژن کی بڑی اہمیت ہے۔", answer: "Телевидение имеет большое значение." },
      { id: "m10-e2", type: "urdu_to_ru", prompt: "ہم تفریحی پروگرام دیکھتے ہیں۔", answer: "Мы смотрим развлекательную программу." },
      { id: "m10-e3", type: "ru_to_urdu", prompt: "Хоть бы он был здесь.", answer: "کاش وہ یہاں ہوتا۔" },
      { id: "m10-e4", type: "ru_to_urdu", prompt: "Он пришёл, чтобы учиться.", answer: "وہ آیا تاکہ سیکھے۔" },
      {
        id: "m10-e5",
        type: "choose",
        prompt: "«Хоть бы» по-урду?",
        answer: "کاش",
        options: ["اگر", "تاکہ", "کاش", "جو"],
      },
      {
        id: "m10-e6",
        type: "choose",
        prompt: "«Чтобы» (цель) по-урду?",
        answer: "تاکہ",
        options: ["کیونکہ", "اگر", "تاکہ", "جب"],
      },
    ],
  },
  {
    id: "main-11",
    course: "main",
    number: 11,
    title: "Урок 11 — اسپتال میں (В больнице). Числительные 90–100",
    subtitle: "Больница. Здоровье. Конструкции долженствования",
    grammarTopic: "Конструкция долженствования (کو + инфинитив + ہے/چاہیے); сложные послелоги; числительные 90–100",
    grammarCards: [
      {
        question: "Как выразить «надо / нужно»?",
        formula: "субъект + کو + инфинитив + ہے/تھا: مجھے ڈاکٹر کے پاس جانا ہے = Мне нужно идти к врачу",
        example: { urdu: "مجھے ڈاکٹر کے پاس جانا ہے", translit: "mujhe ḍākṭar ke pās jānā hai", translation: "Мне нужно идти к врачу" },
      },
      {
        question: "Как выразить «следует» (چاہیے)?",
        formula: "субъект + کو + инфинитив + چاہیے: آپ کو دوا لینی چاہیے = Вам следует принимать лекарство",
        example: { urdu: "آپ کو دوا لینی چاہیے", translit: "āp ko davā lenī cāhiye", translation: "Вам следует принимать лекарство" },
      },
      {
        question: "Числительные 90–100?",
        formula: "نوے(90) اکانوے(91) بانوے(92) ترانوے(93) چورانوے(94) پچانوے(95) چھیانوے(96) ستانوے(97) اٹھانوے(98) ننانوے(99) سو(100)",
        example: { urdu: "سو فیصد", translit: "sau fīṣad", translation: "сто процентов" },
      },
    ],
    text: [
      { urdu: "مجھے ڈاکٹر کے پاس جانا ہے۔", translit: "mujhe ḍākṭar ke pās jānā hai.", translation: "Мне нужно идти к врачу." },
      { urdu: "آپ کو دوا لینی چاہیے۔", translit: "āp ko davā lenī cāhiye.", translation: "Вам следует принимать лекарство." },
      { urdu: "بخار بڑھ گیا۔", translit: "bukhār baṛh gayā.", translation: "Температура поднялась." },
      { urdu: "ڈاکٹر مریض کا معائنہ کرتا ہے۔", translit: "ḍākṭar marīz kā muāinah kartā hai.", translation: "Врач осматривает больного." },
    ],
    vocabulary: [
      { urdu: "ڈاکٹر", translit: "ḍākṭar", translation: "врач", gender: "м", type: "noun" },
      { urdu: "مریض", translit: "marīz", translation: "больной, пациент", gender: "м", type: "noun" },
      { urdu: "دوا", translit: "davā", translation: "лекарство", gender: "ж", type: "noun" },
      { urdu: "بخار", translit: "bukhār", translation: "температура, жар", gender: "м", type: "noun" },
      { urdu: "اسپتال", translit: "aspitāl", translation: "больница", gender: "м", type: "noun" },
      { urdu: "معائنہ", translit: "muāinah", translation: "осмотр", gender: "м", type: "noun" },
      { urdu: "چاہیے", translit: "cāhiye", translation: "нужно, следует", type: "phrase" },
      { urdu: "نوے", translit: "nave", translation: "девяносто", type: "phrase" },
      { urdu: "سو", translit: "sau", translation: "сто", type: "phrase" },
    ],
    exercises: [
      { id: "m11-e1", type: "urdu_to_ru", prompt: "مجھے ڈاکٹر کے پاس جانا ہے۔", answer: "Мне нужно идти к врачу." },
      { id: "m11-e2", type: "urdu_to_ru", prompt: "ڈاکٹر مریض کا معائنہ کرتا ہے۔", answer: "Врач осматривает больного." },
      { id: "m11-e3", type: "ru_to_urdu", prompt: "Вам следует принимать лекарство.", answer: "آپ کو دوا لینی چاہیے۔" },
      { id: "m11-e4", type: "ru_to_urdu", prompt: "Температура поднялась.", answer: "بخار بڑھ گیا۔" },
      {
        id: "m11-e5",
        type: "choose",
        prompt: "«Надо» = субъект + کو + инфинитив + ?",
        answer: "ہے/تھا",
        options: ["ہے/تھا", "چاہیے", "سکتا", "جاتا"],
      },
      {
        id: "m11-e6",
        type: "choose",
        prompt: "«Больница» по-урду?",
        answer: "اسپتال",
        options: ["دوا", "مریض", "اسپتال", "بخار"],
      },
    ],
  },
  {
    id: "main-12",
    course: "main",
    number: 12,
    title: "Урок 12 — ماسکو (Москва)",
    subtitle: "Москва. Гостиница. Каузативные глаголы",
    grammarTopic: "Каузативные глаголы: кауз. I (основа + ā + nā) и кауз. II (основа + وا + نا)",
    grammarCards: [
      {
        question: "Каузатив I (прямой): заставить сделать напрямую?",
        formula: "основа + ā + nā: کھانا → کھلانا (кормить); پڑھنا → پڑھانا (обучать/заставить читать)",
        example: { urdu: "ماں نے بچے کو کھلایا", translit: "māṉ ne bacce ko khilāyā", translation: "Мама покормила ребёнка" },
      },
      {
        question: "Каузатив II (косвенный): заставить через посредника?",
        formula: "основа + وا + نا: لکھنا → لکھوانا (велеть написать); پڑھنا → پڑھوانا",
        example: { urdu: "استاد نے طالب علم سے لکھوایا", translit: "ustād ne ṭālib-e-ilm se likhvāyā", translation: "Учитель заставил ученика написать" },
      },
      {
        question: "Как определить субъект-посредник при каузативе II?",
        formula: "исполнитель действия при کауз. II стоит с послелогом سے: طالب علم سے لکھوایا = велел ученику написать",
        example: { urdu: "اس نے ہمیں فہرست میں لکھوایا", translit: "us ne hameṉ fehrist meṉ likhvāyā", translation: "Он записал нас в список" },
      },
    ],
    text: [
      { urdu: "استاد نے طالب علم سے لکھوایا۔", translit: "ustād ne ṭālib-e-ilm se likhvāyā.", translation: "Учитель заставил ученика написать." },
      { urdu: "ماں نے بچے کو کھلایا۔", translit: "māṉ ne bacce ko khilāyā.", translation: "Мама покормила ребёнка." },
      { urdu: "ماسکو ایک سیاسی اور ثقافتی مرکز ہے۔", translit: "māsko ek siyāsī aur s̱aqāfatī markaz hai.", translation: "Москва — политический и культурный центр." },
      { urdu: "اس نے ہمیں فہرست میں لکھوایا۔", translit: "us ne hameṉ fehrist meṉ likhvāyā.", translation: "Он записал нас в список." },
    ],
    vocabulary: [
      { urdu: "ماسکو", translit: "māsko", translation: "Москва", type: "noun" },
      { urdu: "یونیورسٹی", translit: "yūnīvarsiṭī", translation: "университет", gender: "ж", type: "noun" },
      { urdu: "میٹرو", translit: "meṭro", translation: "метро", gender: "м", type: "noun" },
      { urdu: "ہوٹل", translit: "hoṭal", translation: "гостиница, отель", gender: "м", type: "noun" },
      { urdu: "یادگار", translit: "yādgār", translation: "памятник, достопримечательность", gender: "ж", type: "noun" },
      { urdu: "فہرست", translit: "fehrist", translation: "список", gender: "ж", type: "noun" },
      { urdu: "کھلانا", translit: "khilānā", translation: "кормить (кауз. I от کھانا)", type: "verb" },
      { urdu: "لکھوانا", translit: "likhvānā", translation: "велеть написать (кауз. II от لکھنا)", type: "verb" },
      { urdu: "مرکز", translit: "markaz", translation: "центр", gender: "м", type: "noun" },
      { urdu: "ثقافتی", translit: "s̱aqāfatī", translation: "культурный", type: "adj" },
    ],
    exercises: [
      { id: "m12-e1", type: "urdu_to_ru", prompt: "استاد نے طالب علم سے لکھوایا۔", answer: "Учитель заставил ученика написать." },
      { id: "m12-e2", type: "urdu_to_ru", prompt: "ماسکو ایک سیاسی اور ثقافتی مرکز ہے۔", answer: "Москва — политический и культурный центр." },
      { id: "m12-e3", type: "ru_to_urdu", prompt: "Мама покормила ребёнка.", answer: "ماں نے بچے کو کھلایا۔" },
      { id: "m12-e4", type: "ru_to_urdu", prompt: "Он записал нас в список.", answer: "اس نے ہمیں فہرست میں لکھوایا۔" },
      {
        id: "m12-e5",
        type: "choose",
        prompt: "Каузатив II образуется как?",
        answer: "основа + وا + نا",
        options: ["основа + نا", "основа + وا + نا", "основа + ā + نا", "основа + کر"],
      },
      {
        id: "m12-e6",
        type: "choose",
        prompt: "Каузатив I от کھانا (есть)?",
        answer: "کھلانا",
        options: ["کھانا", "کھلانا", "کھلوانا", "کھا کر"],
      },
    ],
  },
];

export const allLessons = [...introLessons, ...mainLessons];
