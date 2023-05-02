import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "..";
import Sidebar from "../Components/Sidebar";

const Trash = () => {
  const { data, setData, trashMails, setTrashMails } = useContext(Context);

  const handleMoveToInboxClick = (item) => {
    setData(
      trashMails.map((mail) => mail.mId === item.mId) ? [...data, item] : data
    );
    setTrashMails(trashMails.filter((mail) => mail.mId !== item.mId));
  };
  return (
    <div className="main--body">
      <Sidebar />
      {trashMails.length > 0 ? (
        trashMails.map((e) => (
          <div className="mails--box">
            <h4>Subject : {e.subject}</h4>

            <p>{e.content}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="inbox--detail--link">
                <Link to={`/inbox/details/${e.mId}`}>View Details</Link>
              </p>
              <button
                className="move-to-inbox--btn"
                onClick={() => handleMoveToInboxClick(e)}
              >
                Move to inbox
              </button>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No trash here!</p>
      )}
    </div>
  );
};

export default Trash;
