export const fetchQuestions = async (amount = 10) => {
  const res = await fetch(`https://opentdb.com/api.php?${amount}}`);
  const data = await res.json();
  return data.results;
};
