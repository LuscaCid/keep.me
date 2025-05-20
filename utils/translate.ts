import { Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'APP_LANGUAGE';

const langIndexMap: { [key: string]: number } = {
  'pt': 0,
  'en': 1,
  'es': 2,
  'de': 3,
  'ru': 4,
  'ja': 5
};

// Traduções
const messages = {
  "add": ["Adicionar", "Add", "Añadir", "Hinzufügen", "Добавить", "追加"],
  "savings": ["Poupança", "Savings", "Ahorros", "Ersparnisse", "Сбережения", "貯金"],
  "earnings": ["Ganhos", "Earnings", "Ganancias", "Einnahmen", "Доходы", "収益"],
  "salary": ["Salário", "Salary", "Salario", "Gehalt", "Зарплата", "給料"],
  "shopping": ["Compras", "Shopping", "Compras", "Einkaufen", "Покупки", "買い物"],
  "Transactions": ["Transações", "Transactions", "Transacciones", "Transaktionen", "Транзакции", "取引"],
  "Income": ["Receita", "Income", "Ingresos", "Einkommen", "Доход", "収入"],
  "Outcome": ["Despesas", "Outcome", "Gastos", "Ausgaben", "Расходы", "支出"],
  "See all": ["Ver tudo", "See all", "Ver todo", "Alle anzeigen", "Посмотреть все", "すべて表示"],
  "Wallet": ["Carteira", "Wallet", "Cartera", "Brieftasche", "Кошелек", "財布"],
  "My Wallet": ["Minha Carteira", "My Wallet", "Mi Cartera", "Meine Brieftasche", "Мой кошелёк", "私の財布"],
  "Total balance": ["Saldo total", "Total balance", "Saldo total", "Gesamtsaldo", "Общий баланс", "合計残高"],
  "Good morning": ["Bom dia", "Good morning", "Buenos días", "Guten Morgen", "Доброе утро", "おはようございます"],
  "Good afternoon": [ "Boa tarde", "Good afternoon", "Buenas tardes", "Guten Tag", "Добрый день", "こんにちは" ],
  "Good night": [ "Boa noite", "Good night", "Buenas noches", "Gute Nacht", "Спокойной ночи",  "おやすみなさい" ],
  "Chat": ["Chat", "Chat", "Chat", "Chat", "Чат", "チャット"],
  "Profile": ["Perfil", "Profile", "Perfil", "Profil", "Профиль", "プロフィール"],
  "Shopping": ["Compras", "Shopping", "Compras", "Einkaufen", "Покупки", "買い物"]
};

let cachedLangIndex: number | null = null;

async function detectLanguage(): Promise<number> {
  if (cachedLangIndex !== null) return cachedLangIndex;

  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    const langCode = storedLang
      || (Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages?.[0]
        : NativeModules.I18nManager.localeIdentifier
      );

    const shortLang = langCode?.split(/[_-]/)[0]?.toLowerCase() ?? 'en';
    cachedLangIndex = langIndexMap[shortLang] ?? 1; // Default to English (1)
    return cachedLangIndex;
  } catch {
    cachedLangIndex = 1;
    return 1;
  }
}

export async function translate(key: keyof typeof messages): Promise<string> {
  const index = await detectLanguage();
  const fallbackIndex = 1; // English
  const entry = messages[key];

  if (!entry || entry.length === 0) return key;

  return entry[index] ?? entry[fallbackIndex] ?? key;
}
