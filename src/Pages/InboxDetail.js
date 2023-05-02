import { useParams } from "react-router-dom";
import { useContext } from "react";

import { Context } from "..";
import Sidebar from "../Components/Sidebar";

const InboxDetail = () => {
  const { backupData } = useContext(Context);
  const { mailId } = useParams();

  //used backup data and not data here because for eg when we delete an item from inbox and come in trash page and try to see view details of the deleted mail by looking it in data, we will get undefined because that particular item is not there because of bein deleted. SO using backup data here instead (mutatated) data.
  const mailDetail = backupData?.find((mail) => mail.mId == mailId);

  console.log(mailDetail, "Maildata");
  console.log(backupData, "backupdata");

  return (
    <div className="main--body">
      <Sidebar />
      <div className="details--box" key={mailDetail?.mId}>
        <h4>Subject : {mailDetail?.subject}</h4>
        <p style={{ padding: "1rem", margin: "1rem" }}>
          {" "}
          {mailDetail?.content}
        </p>
      </div>
    </div>
  );
};

export default InboxDetail;
