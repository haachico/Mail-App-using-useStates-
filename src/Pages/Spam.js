import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "..";
import Sidebar from "../Components/Sidebar";

const Spam = () => {
  const { spammedMails, setSpammedMails, data, setData } = useContext(Context);

  const handleMoveToInboxBtn = (item) => {
    setData(
      spammedMails.map((mail) => mail.mId === item.mId) ? [...data, item] : data
    );
    setSpammedMails(spammedMails.filter((mail) => mail.mId !== item.mId));
  };
  return (
    <div className="main--body">
      <Sidebar />
      {spammedMails.length > 0 ? (
        spammedMails.map((e) => (
          <div className="mails--box">
            <h4>Subject : {e.subject}</h4>

            <p>{e.content}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="inbox--detail--link">
                <Link to={`/inbox/details/${e.mId}`}>View Details</Link>
              </p>
              <button
                class="move-to-inbox--btn"
                onClick={() => handleMoveToInboxBtn(e)}
              >
                Not spam
              </button>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No spam here!</p>
      )}
    </div>
  );
};

export default Spam;
