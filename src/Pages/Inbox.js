import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "..";
import Sidebar from "../Components/Sidebar";

const Inbox = () => {
  const {
    data,
    setData,
    trashMails,
    setTrashMails,
    spammedMails,
    setSpammedMails,
    isLoading,
    error
  } = useContext(Context);

  const [isUnreadMailSelected, setIsUnreadMAilsSelected] = useState(false);

  const [isStarredMailsSelected, setIsStarredMailsSelected] = useState(false);

  const [searchText, setSearchText] = useState("");

  const unreadMails = data?.filter((e) => e.unread === true);

  const handleDeleteClick = (item, event) => {
    setTrashMails(
      data.map((mail) => mail.mId === item.mId)
        ? [...trashMails, item]
        : trashMails
    );
    setData(data.filter((mail) => mail.mId !== item.mId));
  };

  const handleAddToSpamClick = (item) => {
    setSpammedMails(
      data?.map((mail) => mail.mId === item.mId)
        ? [...spammedMails, item]
        : spammedMails
    );
    setData(data.filter((mail) => mail.mId !== item.mId));
  };

  const handleStarClick = (id) =>
    setData(
      data.map((mail) =>
        mail.mId === id ? { ...mail, isStarred: !mail.isStarred } : mail
      )
    ); ////////////////////////

  const handleMarkClick = (item) => {
    setData(
      data.map((e) => (e.mId === item.mId ? { ...e, unread: !e.unread } : e))
    );
  };

  const handleUnreadCheckboxClick = (event) => {
    const isChecked = event.target.checked;
    setIsUnreadMAilsSelected(isChecked);
  };

  const handleStarredCheckboxClick = (event) => {
    const isChecked = event.target.checked;
    setIsStarredMailsSelected(isChecked);
  };

  let mailsList = data;

  mailsList = isUnreadMailSelected
    ? mailsList.filter((mail) => mail.unread === true)
    : mailsList;

  mailsList = isStarredMailsSelected
    ? mailsList.filter((mail) => mail.isStarred === true)
    : mailsList;

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const displayedMails = mailsList.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      mail.content.toLowerCase().includes(searchText.toLowerCase())
  );

  if (error) {
    return (
      <div>
        <h4>Error : {error.message}</h4>
      </div>
    );
  }

  return (
    <div className="main--body">
      <Sidebar />
      <div>
        <input
          type="text"
          name="search"
          className="search-box"
          placeholder="Search mail"
          onChange={(event) => handleSearch(event)}
        />
        <fieldset>
          <legend>Filters</legend>
          <div className="inputs">
            <label>
              Show unread mails
              <input
                type="checkbox"
                name="Show unread mails"
                value="Show unread mails"
                checked={isUnreadMailSelected}
                onChange={handleUnreadCheckboxClick}
              />
            </label>
            <label>
              Show starred mails
              <input
                type="checkbox"
                name="Show starred mails"
                value="Show starred mails"
                checked={isStarredMailsSelected}
                onChange={handleStarredCheckboxClick}
              />
            </label>
          </div>
        </fieldset>
      </div>
      <h4>
        {displayedMails.length !== 0
          ? `Unread mails : ${unreadMails.length}`
          : ""}
      </h4>
      {isLoading ? (
        <h4>Mails loading...</h4>
      ) : displayedMails.length === 0 ? (
        <h4>No mails</h4>
      ) : (
        displayedMails.map((e) => (
          <div
            className="mails--box"
            key={e.mId}
            style={{ backgroundColor: e.unread ? "#f1f5f9" : "white" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Subject : {e.subject}</h4>
              <button
                className="star--btn"
                onClick={() => handleStarClick(e.mId)}
                style={{ backgroundColor: e.unread ? "#f1f5f9" : "white" }}
              >
                {e.isStarred ? "Unstar" : "Star"}
              </button>
            </div>
            <p>{e.content}</p>
            <p className="inbox--detail--link">
              <Link to={`/inbox/details/${e.mId}`}>View Details</Link>
            </p>
            <div className="inbox--btns">
              <button
                style={{
                  color: "red",
                  backgroundColor: e.unread ? "#f1f5f9" : "white"
                }}
                onClick={() => handleDeleteClick(e)}
              >
                Delete
              </button>
              <button
                style={{
                  color: "orange",
                  backgroundColor: e.unread ? "#f1f5f9" : "white"
                }}
                onClick={() => handleMarkClick(e)}
              >
                {e.unread ? "Mark as read" : "Mark as unread"}
              </button>
              <button
                style={{
                  color: "green",
                  backgroundColor: e.unread ? "#f1f5f9" : "white"
                }}
                onClick={() => handleAddToSpamClick(e)}
              >
                {spammedMails.includes(e)
                  ? "Reported as spam"
                  : "Report as Spam"}
              </button>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Inbox;
