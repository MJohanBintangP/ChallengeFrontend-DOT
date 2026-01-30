function decodeHtml(str) {
  if (typeof str !== "string") return str;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

function shuffle(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isAllowedDifficulty(value) {
  return value === "easy" || value === "medium" || value === "hard";
}

function isAllowedType(value) {
  return value === "multiple" || value === "boolean";
}

/**
 * @param {{ amount?: number, category?: number, difficulty?: "easy"|"medium"|"hard", type?: "multiple"|"boolean" }} params
 */
export async function fetchOpenTdbQuestions({
  amount = 10,
  category,
  difficulty,
  type,
} = {}) {
  const url = new URL("https://opentdb.com/api.php");
  url.searchParams.set("amount", String(amount));
  if (typeof category === "number" && Number.isFinite(category)) {
    url.searchParams.set("category", String(category));
  }
  if (isAllowedDifficulty(difficulty)) {
    url.searchParams.set("difficulty", difficulty);
  }
  if (isAllowedType(type)) {
    url.searchParams.set("type", type);
  }

  const requestUrl = url.toString();
  let res = await fetch(requestUrl);

  if (res.status === 429) {
    await sleep(1200);
    res = await fetch(requestUrl);
  }

  if (res.status === 429) {
    throw new Error("Terlalu banyak request (429). Coba lagi sebentar.");
  }

  if (!res.ok) throw new Error(`OpenTDB fetch failed: HTTP ${res.status}`);

  const data = await res.json();
  if (!data || !Array.isArray(data.results)) {
    throw new Error("OpenTDB returned invalid payload");
  }

  return data.results.map((q) => {
    const correct = decodeHtml(q.correct_answer);
    const incorrect = (q.incorrect_answers || []).map(decodeHtml);

    return {
      ...q,
      question: decodeHtml(q.question),
      correct_answer: correct,
      incorrect_answers: incorrect,
      options: shuffle([correct, ...incorrect]),
    };
  });
}
