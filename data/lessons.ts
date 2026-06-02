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
    id: "main-2",
    course: "main",
    number: 2,
    title: "Урок 2",
    subtitle: "Множественное число. Прилагательное. Настоящее время",
    grammarTopic: "Мн. число сущ.; прилагательное; инфинитив и основа глагола; настоящее время",
    grammarCards: [
      {
        question: "Как образуется настоящее время глагола?",
        formula: "основа + تا/تی/تے + наст. форма глагола «быть» (ہے/ہیں)",
        example: { urdu: "وہ پڑھتا ہے", translit: "voh paṛhtā hai", translation: "Он читает" },
      },
      {
        question: "Как образуется множественное число существительных м.р.?",
        formula: "сущ. м.р. на -ā → окончание -e: لڑکا → لڑکے (мальчик → мальчики)",
        example: { urdu: "لڑکے", translit: "laṛke", translation: "мальчики" },
      },
      {
        question: "Что такое «основа глагола»?",
        formula: "инфинитив без نا: پڑھنا → پڑھ (читать → основа «читай-»)",
        example: { urdu: "پڑھنا", translit: "paṛhnā", translation: "читать" },
      },
    ],
    text: [
      { urdu: "یہ لڑکا پڑھتا ہے۔", translit: "yeh laṛkā paṛhtā hai.", translation: "Этот мальчик читает." },
      { urdu: "وہ لڑکی لکھتی ہے۔", translit: "voh laṛkī likhtī hai.", translation: "Та девочка пишет." },
      { urdu: "یہ کتاب اچھی ہے۔", translit: "yeh kitāb acchī hai.", translation: "Эта книга хорошая." },
      { urdu: "لڑکے کھیلتے ہیں۔", translit: "laṛke khelte haiṉ.", translation: "Мальчики играют." },
    ],
    vocabulary: [
      { urdu: "لڑکا", translit: "laṛkā", translation: "мальчик", gender: "м", type: "noun" },
      { urdu: "لڑکی", translit: "laṛkī", translation: "девочка", gender: "ж", type: "noun" },
      { urdu: "کتاب", translit: "kitāb", translation: "книга", gender: "ж", type: "noun" },
      { urdu: "پڑھنا", translit: "paṛhnā", translation: "читать", type: "verb" },
      { urdu: "لکھنا", translit: "likhnā", translation: "писать", type: "verb" },
      { urdu: "کھیلنا", translit: "khelnā", translation: "играть", type: "verb" },
      { urdu: "اچھا", translit: "acchā", translation: "хороший", type: "adj" },
      { urdu: "بڑا", translit: "baṛā", translation: "большой", type: "adj" },
    ],
    exercises: [
      { id: "m2-e1", type: "urdu_to_ru", prompt: "وہ لڑکا لکھتا ہے۔", answer: "Тот мальчик пишет." },
      { id: "m2-e2", type: "urdu_to_ru", prompt: "یہ کتاب اچھی ہے۔", answer: "Эта книга хорошая." },
      { id: "m2-e3", type: "ru_to_urdu", prompt: "Мальчики играют.", answer: "لڑکے کھیلتے ہیں۔" },
      { id: "m2-e4", type: "ru_to_urdu", prompt: "Та девочка читает.", answer: "وہ لڑکی پڑھتی ہے۔" },
      {
        id: "m2-e5",
        type: "choose",
        prompt: "Настоящее время: основа глагола + ?",
        answer: "تا/تی/تے + ہے/ہیں",
        options: ["گا/گی/گے", "تا/تی/تے + ہے/ہیں", "یا/ئی/ئے", "نا"],
      },
    ],
  },
  {
    id: "main-3",
    course: "main",
    number: 3,
    title: "Урок 3",
    subtitle: "Послелоги. Косвенная форма. Принадлежность",
    grammarTopic: "Простые и сложные послелоги; косвенная форма ед.ч.; выражение принадлежности",
    grammarCards: [
      {
        question: "Когда существительное принимает «косвенную форму»?",
        formula: "Перед послелогом: لڑکا (мальчик) → لڑکے کو (мальчику, -ā → -e)",
        example: { urdu: "لڑکے کو", translit: "laṛke ko", translation: "мальчику" },
      },
      {
        question: "Как выразить принадлежность (чей?)?",
        formula: "کا/کی/کے: X کا Y = Y X-а (согласуется с Y по роду/числу)",
        example: { urdu: "لڑکے کی کتاب", translit: "laṛke kī kitāb", translation: "книга мальчика" },
      },
      {
        question: "Основные послелоги?",
        formula: "کو — кому/что; میں — в; پر — на; سے — от/с; کے لیے — для; کے ساتھ — с (вместе)",
        example: { urdu: "گھر میں", translit: "ghar meṉ", translation: "дома (в доме)" },
      },
    ],
    text: [
      { urdu: "لڑکے کو کتاب دو۔", translit: "laṛke ko kitāb do.", translation: "Дай мальчику книгу." },
      { urdu: "وہ گھر میں ہے۔", translit: "voh ghar meṉ hai.", translation: "Он дома." },
      { urdu: "یہ میری کتاب ہے۔", translit: "yeh merī kitāb hai.", translation: "Это моя книга." },
    ],
    vocabulary: [
      { urdu: "گھر", translit: "ghar", translation: "дом", gender: "м", type: "noun" },
      { urdu: "کمرہ", translit: "kamrā", translation: "комната", gender: "м", type: "noun" },
      { urdu: "میز", translit: "mez", translation: "стол", gender: "ж", type: "noun" },
      { urdu: "کو", translit: "ko", translation: "послелог дат./вин. пад.", type: "phrase" },
      { urdu: "میں", translit: "meṉ", translation: "в, внутри", type: "phrase" },
      { urdu: "پر", translit: "par", translation: "на", type: "phrase" },
      { urdu: "سے", translit: "se", translation: "от, с", type: "phrase" },
      { urdu: "دینا", translit: "denā", translation: "давать", type: "verb" },
    ],
    exercises: [
      { id: "m3-e1", type: "urdu_to_ru", prompt: "وہ گھر میں ہے۔", answer: "Он дома." },
      { id: "m3-e2", type: "urdu_to_ru", prompt: "لڑکے کی کتاب", answer: "книга мальчика" },
      { id: "m3-e3", type: "ru_to_urdu", prompt: "на столе", answer: "میز پر" },
      {
        id: "m3-e4",
        type: "choose",
        prompt: "Какой послелог означает «для»?",
        answer: "کے لیے",
        options: ["کو", "میں", "کے لیے", "سے"],
      },
    ],
  },
  {
    id: "main-4",
    course: "main",
    number: 4,
    title: "Урок 4",
    subtitle: "Прошедшее время. Повелительное наклонение",
    grammarTopic: "Прош. несовершенное и продолженное; повелительное наклонение",
    grammarCards: [
      {
        question: "Прошедшее несовершенное время?",
        formula: "основа + تا/تی/تے + تھا/تھی/تھے (форма «быть» в прошедшем)",
        example: { urdu: "وہ پڑھتا تھا", translit: "voh paṛhtā thā", translation: "Он читал (обычно)" },
      },
      {
        question: "Прошедшее продолженное время?",
        formula: "основа + رہا/رہی/رہے + تھا/تھی/تھے",
        example: { urdu: "وہ پڑھ رہا تھا", translit: "voh paṛh rahā thā", translation: "Он читал (в тот момент)" },
      },
      {
        question: "Повелительное наклонение (вежливое)?",
        formula: "основа + یے/ئیے — вежл.: پڑھیے (читайте пожалуйста)",
        example: { urdu: "بیٹھیے", translit: "baiṭhiye", translation: "Садитесь (пожалуйста)" },
      },
    ],
    text: [
      { urdu: "وہ سوتا تھا۔", translit: "voh sotā thā.", translation: "Он спал (обычно)." },
      { urdu: "لڑکی پڑھ رہی تھی۔", translit: "laṛkī paṛh rahī thī.", translation: "Девочка читала (в тот момент)." },
      { urdu: "یہاں بیٹھیے۔", translit: "yahāṉ baiṭhiye.", translation: "Садитесь здесь." },
    ],
    vocabulary: [
      { urdu: "سونا", translit: "sonā", translation: "спать", type: "verb" },
      { urdu: "بیٹھنا", translit: "baiṭhnā", translation: "сидеть", type: "verb" },
      { urdu: "آنا", translit: "ānā", translation: "приходить", type: "verb" },
      { urdu: "جانا", translit: "jānā", translation: "идти", type: "verb" },
      { urdu: "یہاں", translit: "yahāṉ", translation: "здесь", type: "phrase" },
      { urdu: "وہاں", translit: "vahāṉ", translation: "там", type: "phrase" },
    ],
    exercises: [
      { id: "m4-e1", type: "urdu_to_ru", prompt: "وہ سوتا تھا۔", answer: "Он спал (обычно)." },
      { id: "m4-e2", type: "ru_to_urdu", prompt: "Девочка писала (в тот момент).", answer: "لڑکی لکھ رہی تھی۔" },
      {
        id: "m4-e3",
        type: "choose",
        prompt: "Прош. несов. = основа + تا + ?",
        answer: "تھا/تھی/تھے",
        options: ["ہے/ہیں", "تھا/تھی/تھے", "گا/گی/گے", "رہا/رہی/رہے"],
      },
    ],
  },
  {
    id: "main-5",
    course: "main",
    number: 5,
    title: "Урок 5",
    subtitle: "Степени сравнения. Придаточные. Суффикс -вала",
    grammarTopic: "Косвенная форма мн.ч.; степени сравнения; جو-придаточные; суффикс والا",
    grammarCards: [
      {
        question: "Как образуется сравнительная степень?",
        formula: "سے + прилагательное: X سے بڑا = больше чем X (досл. «от X большой»)",
        example: { urdu: "یہ اس سے بڑا ہے", translit: "yeh us se baṛā hai", translation: "Это больше, чем то" },
      },
      {
        question: "Превосходная степень?",
        formula: "سب سے + прилагательное: سب سے اچھا = самый хороший",
        example: { urdu: "سب سے اچھا", translit: "sab se acchā", translation: "самый хороший" },
      },
      {
        question: "Суффикс والا (вала)?",
        formula: "основа + والا/والی/والے = тот, кто делает / имеет: دودھ والا = молочник",
        example: { urdu: "دودھ والا", translit: "dūdh vālā", translation: "молочник" },
      },
    ],
    text: [
      { urdu: "یہ کتاب اس سے اچھی ہے۔", translit: "yeh kitāb us se acchī hai.", translation: "Эта книга лучше той." },
      { urdu: "سب سے بڑا لڑکا کون ہے؟", translit: "sab se baṛā laṛkā kaun hai?", translation: "Кто самый старший мальчик?" },
    ],
    vocabulary: [
      { urdu: "دودھ", translit: "dūdh", translation: "молоко", gender: "м", type: "noun" },
      { urdu: "سب", translit: "sab", translation: "все, всё", type: "phrase" },
      { urdu: "کون", translit: "kaun", translation: "кто", type: "phrase" },
      { urdu: "جو", translit: "jo", translation: "который (относ. мест.)", type: "phrase" },
      { urdu: "چھوٹا", translit: "choṭā", translation: "маленький", type: "adj" },
    ],
    exercises: [
      { id: "m5-e1", type: "urdu_to_ru", prompt: "سب سے اچھا", answer: "самый хороший" },
      { id: "m5-e2", type: "ru_to_urdu", prompt: "самый маленький", answer: "سب سے چھوٹا" },
      {
        id: "m5-e3",
        type: "choose",
        prompt: "Как сказать «больше, чем X»?",
        answer: "X سے بڑا",
        options: ["X سب سے بڑا", "X سے بڑا", "X کا بڑا", "X میں بڑا"],
      },
    ],
  },
  {
    id: "main-6",
    course: "main",
    number: 6,
    title: "Урок 6",
    subtitle: "Система прошедших времён. Глагол سکنا",
    grammarTopic: "Прош. совершенное, перфект, предпрошедшее; потенциальный глагол سکنا",
    grammarCards: [
      {
        question: "Прошедшее совершенное (что сделал)?",
        formula: "причастие сов. вида (основа + ا/ی/ے) + нет глагола «быть» (переходные согл. с объектом через نے)",
        example: { urdu: "وہ گیا", translit: "voh gayā", translation: "Он ушёл" },
      },
      {
        question: "Настоящее совершенное (перфект)?",
        formula: "причастие сов. вида + ہے/ہیں",
        example: { urdu: "وہ گیا ہے", translit: "voh gayā hai", translation: "Он ушёл (и сейчас его нет)" },
      },
      {
        question: "Потенциальный глагол سکنا (мочь)?",
        formula: "основа + سکنا → спрягается как обычный глагол",
        example: { urdu: "میں پڑھ سکتا ہوں", translit: "maiṉ paṛh saktā hūṉ", translation: "Я могу читать" },
      },
    ],
    text: [
      { urdu: "وہ گھر گیا۔", translit: "voh ghar gayā.", translation: "Он пошёл домой." },
      { urdu: "کیا تم آ سکتے ہو؟", translit: "kyā tum ā sakte ho?", translation: "Ты можешь прийти?" },
      { urdu: "میں نے کتاب پڑھی۔", translit: "maiṉ ne kitāb paṛhī.", translation: "Я прочитал книгу." },
    ],
    vocabulary: [
      { urdu: "جانا", translit: "jānā", translation: "идти, уходить", type: "verb" },
      { urdu: "آنا", translit: "ānā", translation: "приходить", type: "verb" },
      { urdu: "سکنا", translit: "saknā", translation: "мочь (потенц.)", type: "verb" },
      { urdu: "نے", translit: "ne", translation: "послелог субъекта перех. гл. в прош.", type: "phrase" },
      { urdu: "کیا", translit: "kyā", translation: "что; вопросит. частица", type: "phrase" },
    ],
    exercises: [
      { id: "m6-e1", type: "urdu_to_ru", prompt: "میں نے کتاب پڑھی۔", answer: "Я прочитал книгу." },
      { id: "m6-e2", type: "ru_to_urdu", prompt: "Я могу писать.", answer: "میں لکھ سکتا ہوں" },
      {
        id: "m6-e3",
        type: "choose",
        prompt: "С каким послелогом субъект переходного глагола в прош. совершенном?",
        answer: "نے",
        options: ["کو", "سے", "نے", "پر"],
      },
    ],
  },
  {
    id: "main-7",
    course: "main",
    number: 7,
    title: "Урок 7",
    subtitle: "Числительные. Условные придаточные",
    grammarTopic: "Интенсивные глаголы; числительные; условные придаточные (اگر)",
    grammarCards: [
      {
        question: "Условное придаточное (если...то)?",
        formula: "اگر + условие (сослаг./наст.) + تو + следствие",
        example: { urdu: "اگر تم آؤ تو میں جاؤں", translit: "agar tum āo to maiṉ jāūṉ", translation: "Если ты придёшь, то я пойду" },
      },
      {
        question: "Числительные 1–10?",
        formula: "ایک دو تین چار پانچ چھ سات آٹھ نو دس",
        example: { urdu: "پانچ کتابیں", translit: "pāṉc kitābeṉ", translation: "пять книг" },
      },
    ],
    text: [
      { urdu: "اگر بارش ہو تو گھر رہو۔", translit: "agar bārish ho to ghar raho.", translation: "Если пойдёт дождь, оставайся дома." },
      { urdu: "میرے پاس تین کتابیں ہیں۔", translit: "mere pās tīn kitābeṉ haiṉ.", translation: "У меня три книги." },
    ],
    vocabulary: [
      { urdu: "اگر", translit: "agar", translation: "если", type: "phrase" },
      { urdu: "تو", translit: "to", translation: "то (в условных)", type: "phrase" },
      { urdu: "بارش", translit: "bārish", translation: "дождь", gender: "ж", type: "noun" },
      { urdu: "ایک", translit: "ek", translation: "один", type: "phrase" },
      { urdu: "دو", translit: "do", translation: "два", type: "phrase" },
      { urdu: "تین", translit: "tīn", translation: "три", type: "phrase" },
      { urdu: "چار", translit: "cār", translation: "четыре", type: "phrase" },
      { urdu: "پانچ", translit: "pāṉc", translation: "пять", type: "phrase" },
    ],
    exercises: [
      { id: "m7-e1", type: "urdu_to_ru", prompt: "میرے پاس تین کتابیں ہیں۔", answer: "У меня три книги." },
      { id: "m7-e2", type: "ru_to_urdu", prompt: "Если придёт дождь — оставайся дома.", answer: "اگر بارش ہو تو گھر رہو۔" },
      {
        id: "m7-e3",
        type: "choose",
        prompt: "Как по-урду «пять»?",
        answer: "پانچ",
        options: ["چار", "چھ", "پانچ", "سات"],
      },
    ],
  },
  {
    id: "main-8",
    course: "main",
    number: 8,
    title: "Урок 8",
    subtitle: "Будущее время. Деепричастие предшествования",
    grammarTopic: "Простое будущее время; деепричастие предшествующего действия; придаточные причины",
    grammarCards: [
      {
        question: "Простое будущее время?",
        formula: "основа + گ-показатели: گا (м.ед.) / گی (ж.ед.) / گے (мн./веж.)",
        example: { urdu: "وہ جائے گا", translit: "voh jāegā", translation: "Он пойдёт" },
      },
      {
        question: "Деепричастие предшествующего действия?",
        formula: "основа + کر = сделав, после того как: کھا کر (поев, после еды)",
        example: { urdu: "پڑھ کر سویا", translit: "paṛh kar soyā", translation: "Поучившись, лёг спать" },
      },
    ],
    text: [
      { urdu: "کل وہ آئے گی۔", translit: "kal voh āegī.", translation: "Завтра она придёт." },
      { urdu: "کھانا کھا کر جاؤ۔", translit: "khānā khā kar jāo.", translation: "Поев, иди." },
    ],
    vocabulary: [
      { urdu: "کل", translit: "kal", translation: "завтра / вчера (контекст)", type: "phrase" },
      { urdu: "کھانا", translit: "khānā", translation: "еда; есть (глагол)", type: "noun" },
      { urdu: "کیونکہ", translit: "kyoṉkih", translation: "потому что", type: "phrase" },
      { urdu: "اس لیے", translit: "is liye", translation: "поэтому", type: "phrase" },
    ],
    exercises: [
      { id: "m8-e1", type: "urdu_to_ru", prompt: "کل وہ آئے گی۔", answer: "Завтра она придёт." },
      { id: "m8-e2", type: "ru_to_urdu", prompt: "Он пойдёт.", answer: "وہ جائے گا" },
      {
        id: "m8-e3",
        type: "choose",
        prompt: "Суффикс буд. вр. для ж.р. ед.ч.?",
        answer: "گی",
        options: ["گا", "گی", "گے", "گئے"],
      },
    ],
  },
  {
    id: "main-9",
    course: "main",
    number: 9,
    title: "Урок 9",
    subtitle: "Страдательный залог",
    grammarTopic: "Образование и употребление страдательного залога",
    grammarCards: [
      {
        question: "Как образуется страдательный залог?",
        formula: "причастие сов. вида + جانا (спрягается): لکھا جاتا ہے = пишется",
        example: { urdu: "یہ کتاب پڑھی جاتی ہے", translit: "yeh kitāb paṛhī jātī hai", translation: "Эта книга читается" },
      },
      {
        question: "Деятель в страдательном залоге?",
        formula: "деятель + سے: استاد سے پڑھایا جاتا ہے = преподаётся учителем",
        example: { urdu: "استاد سے", translit: "ustād se", translation: "учителем" },
      },
    ],
    text: [
      { urdu: "یہ کام کیا جاتا ہے۔", translit: "yeh kām kiyā jātā hai.", translation: "Эта работа делается." },
      { urdu: "اردو پاکستان میں بولی جاتی ہے۔", translit: "urdū pākistān meṉ bolī jātī hai.", translation: "На урду говорят в Пакистане." },
    ],
    vocabulary: [
      { urdu: "کام", translit: "kām", translation: "работа, дело", gender: "м", type: "noun" },
      { urdu: "استاد", translit: "ustād", translation: "учитель", gender: "м", type: "noun" },
      { urdu: "بولنا", translit: "bolnā", translation: "говорить", type: "verb" },
      { urdu: "پاکستان", translit: "pākistān", translation: "Пакистан", type: "noun" },
      { urdu: "اردو", translit: "urdū", translation: "урду", type: "noun" },
    ],
    exercises: [
      { id: "m9-e1", type: "urdu_to_ru", prompt: "اردو پاکستان میں بولی جاتی ہے۔", answer: "На урду говорят в Пакистане." },
      { id: "m9-e2", type: "ru_to_urdu", prompt: "Эта работа делается.", answer: "یہ کام کیا جاتا ہے۔" },
      {
        id: "m9-e3",
        type: "choose",
        prompt: "Страдательный залог = причастие сов. вида + ?",
        answer: "جانا (спрягается)",
        options: ["سکنا", "جانا (спрягается)", "رہنا", "دینا"],
      },
    ],
  },
  {
    id: "main-10",
    course: "main",
    number: 10,
    title: "Урок 10",
    subtitle: "Сослагательное наклонение",
    grammarTopic: "Сослагательное наклонение (простое и продолженное); придаточные цели",
    grammarCards: [
      {
        question: "Простое сослагательное наклонение?",
        formula: "основа (без окончаний для ед.ч. или + یں для мн.): جاؤں — пойду бы / пусть пойду",
        example: { urdu: "کاش وہ آئے", translit: "kāsh voh āe", translation: "Хоть бы он пришёл" },
      },
      {
        question: "Придаточное цели?",
        formula: "تاکہ + сослагательное: آیا تاکہ پڑھے = пришёл, чтобы учиться",
        example: { urdu: "آیا تاکہ پڑھے", translit: "āyā tākeh paṛhe", translation: "Пришёл, чтобы учиться" },
      },
    ],
    text: [
      { urdu: "کاش وہ یہاں ہوتا۔", translit: "kāsh voh yahāṉ hotā.", translation: "Хоть бы он был здесь." },
      { urdu: "وہ آیا تاکہ سیکھے۔", translit: "voh āyā tākeh seekhe.", translation: "Он пришёл, чтобы учиться." },
    ],
    vocabulary: [
      { urdu: "کاش", translit: "kāsh", translation: "хоть бы, если бы только", type: "phrase" },
      { urdu: "تاکہ", translit: "tākeh", translation: "чтобы (цель)", type: "phrase" },
      { urdu: "سیکھنا", translit: "sīkhnā", translation: "учиться (чему-то)", type: "verb" },
      { urdu: "چاہنا", translit: "cāhnā", translation: "хотеть", type: "verb" },
    ],
    exercises: [
      { id: "m10-e1", type: "urdu_to_ru", prompt: "کاش وہ یہاں ہوتا۔", answer: "Хоть бы он был здесь." },
      { id: "m10-e2", type: "ru_to_urdu", prompt: "Он пришёл, чтобы читать.", answer: "وہ آیا تاکہ پڑھے۔" },
      {
        id: "m10-e3",
        type: "choose",
        prompt: "«Хоть бы» по-урду?",
        answer: "کاش",
        options: ["اگر", "تاکہ", "کاش", "جو"],
      },
    ],
  },
  {
    id: "main-11",
    course: "main",
    number: 11,
    title: "Урок 11",
    subtitle: "Инфинитивные конструкции долженствования",
    grammarTopic: "Инфинитивные предложения долженствования; составные местоимения",
    grammarCards: [
      {
        question: "Как выразить «надо / нужно»?",
        formula: "субъект + کو + инфинитив + ہے/تھا: مجھے جانا ہے = мне надо идти",
        example: { urdu: "مجھے جانا ہے", translit: "mujhe jānā hai", translation: "Мне надо идти" },
      },
      {
        question: "«Должен» (چاہیے)?",
        formula: "субъект + کو + инфинитив + چاہیے: تمہیں پڑھنا چاہیے = тебе следует читать",
        example: { urdu: "تمہیں پڑھنا چاہیے", translit: "tumheṉ paṛhnā cāhiye", translation: "Тебе следует читать" },
      },
    ],
    text: [
      { urdu: "مجھے کل جانا ہے۔", translit: "mujhe kal jānā hai.", translation: "Мне завтра надо идти." },
      { urdu: "آپ کو یہ کتاب پڑھنی چاہیے۔", translit: "āp ko yeh kitāb paṛhnī cāhiye.", translation: "Вам следует прочитать эту книгу." },
    ],
    vocabulary: [
      { urdu: "مجھے", translit: "mujhe", translation: "мне (косвенная от میں)", type: "phrase" },
      { urdu: "تمہیں", translit: "tumheṉ", translation: "тебе (косвенная от تم)", type: "phrase" },
      { urdu: "آپ کو", translit: "āp ko", translation: "вам", type: "phrase" },
      { urdu: "چاہیے", translit: "cāhiye", translation: "нужно, следует", type: "phrase" },
    ],
    exercises: [
      { id: "m11-e1", type: "urdu_to_ru", prompt: "مجھے کل جانا ہے۔", answer: "Мне завтра надо идти." },
      { id: "m11-e2", type: "ru_to_urdu", prompt: "Тебе следует читать.", answer: "تمہیں پڑھنا چاہیے" },
      {
        id: "m11-e3",
        type: "choose",
        prompt: "«Нужно / надо» = субъект + کو + инфинитив + ?",
        answer: "ہے/تھا",
        options: ["ہے/تھا", "چاہیے", "سکتا", "جاتا"],
      },
    ],
  },
  {
    id: "main-12",
    course: "main",
    number: 12,
    title: "Урок 12",
    subtitle: "Каузативные глаголы",
    grammarTopic: "Понудительные (каузативные) глаголы; причастия непосредственного предшествования",
    grammarCards: [
      {
        question: "Как образуются каузативные глаголы?",
        formula: "основа + وا + нā: پڑھنا → پڑھوانا (заставить читать / дать прочитать)",
        example: { urdu: "میں نے پڑھوایا", translit: "maiṉ ne paṛhvāyā", translation: "Я заставил прочитать" },
      },
      {
        question: "Каузатив I (прямой)?",
        formula: "основа + ā + nā: کھانا → کھلانا (кормить — заставить есть)",
        example: { urdu: "ماں نے بچے کو کھلایا", translit: "māṉ ne bacce ko khilāyā", translation: "Мама покормила ребёнка" },
      },
    ],
    text: [
      { urdu: "استاد نے طالب علم سے لکھوایا۔", translit: "ustād ne ṭālib-e-ilm se likhvāyā.", translation: "Учитель заставил ученика написать." },
      { urdu: "ماں نے بچے کو کھلایا۔", translit: "māṉ ne bacce ko khilāyā.", translation: "Мама покормила ребёнка." },
    ],
    vocabulary: [
      { urdu: "طالب علم", translit: "ṭālib-e-ilm", translation: "студент, ученик", gender: "м", type: "noun" },
      { urdu: "ماں", translit: "māṉ", translation: "мама", gender: "ж", type: "noun" },
      { urdu: "بچہ", translit: "baccā", translation: "ребёнок", gender: "м", type: "noun" },
      { urdu: "کھلانا", translit: "khilānā", translation: "кормить (кауз. от کھانا)", type: "verb" },
      { urdu: "لکھوانا", translit: "likhvānā", translation: "заставить писать (кауз. II)", type: "verb" },
    ],
    exercises: [
      { id: "m12-e1", type: "urdu_to_ru", prompt: "استاد نے طالب علم سے لکھوایا۔", answer: "Учитель заставил ученика написать." },
      { id: "m12-e2", type: "ru_to_urdu", prompt: "Мама покормила ребёнка.", answer: "ماں نے بچے کو کھلایا۔" },
      {
        id: "m12-e3",
        type: "choose",
        prompt: "Каузатив II образуется как?",
        answer: "основа + وا + نا",
        options: ["основа + نا", "основа + وا + نا", "основа + ā + نا", "основа + کر"],
      },
    ],
  },
];

export const allLessons = [...introLessons, ...mainLessons];
