const Quiz = ({ state, onAnswer }) => {
  const { questions, current, timer } = state;
  const q = questions[current];

  if (!q) return <div>Loading...</div>;

  return (
    <div>
      <p>
        Soal {current + 1} / {questions.length}
      </p>
      <p>Timer: {timer}s</p>

      <h3 dangerouslySetInnerHTML={{ __html: q.question }} />

      {q.options.map((opt, i) => (
        <button key={i} onClick={() => onAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
