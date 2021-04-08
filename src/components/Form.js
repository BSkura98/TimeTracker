import React from "react";

const Form = () => {
  return (
    <form>
      <input type="text" className="timer-input" />
      <button className="add-timer-button" type="submit">
        <i className="fas fa-plus-circle"></i>
      </button>
    </form>
  );
};

export default Form;
