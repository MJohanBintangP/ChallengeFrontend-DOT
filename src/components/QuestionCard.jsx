const QuestionCard = ({ question, answers, onSelect }) => {
  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      {answers.map((a) => (
        <button key={a} onClick={() => onSelect(a)}>
          {a}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
