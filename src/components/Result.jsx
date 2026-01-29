const Result = ({ state, onRestart, onLogout }) => {
  const { answers, questions } = state;
  const total = questions.length;
  const answered = answers.length;
  const correct = answers.filter((a) => a.isCorrect).length;
  const wrong = answered - correct;

  return (
    <div className="result-container">
      <h2>Hasil Kuis</h2>
      <p>Total Soal: {total}</p>
      <p>Jumlah Dijawab: {answered}</p>
      <p>Benar: {correct}</p>
      <p>Salah: {wrong}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onRestart}>Ulangi Kuis</button>
        <button onClick={onLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Result;
