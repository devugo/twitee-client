const TwitButton = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <div className="twit-button__container">
      <button className="twit-button" onClick={clickHandler}>
        Twit
      </button>
    </div>
  );
};

export default TwitButton;
