import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, LogIn, Mail, User } from "react-feather";
import man from "../../../assets/images/avtar/user.png";

import { LI, UL, Image, P } from "../../../AbstractElements";
import { Account, Inbox, LogOut, Taskboard } from "../../../Constant";

const UserHeader = () => {
  const navigate = useNavigate();
  const name = useState(localStorage.getItem("Name"));
  const role = useState(localStorage.getItem("Role"));

  const Logout = () => {
    localStorage.removeItem("profileURL");
    localStorage.removeItem("Profile");
    localStorage.removeItem("Name");
    localStorage.removeItem("Role");
    localStorage.setItem("login", false);
    navigate(`${process.env.PUBLIC_URL}/login`);
  };

  const UserMenuRedirect = (redirect) => {
    navigate(redirect);
  };

  return (
    <li className="profile-nav onhover-dropdown pe-0 py-0">
      <div className="media profile-media">
        <Image
          attrImage={{
            className: "b-r-10 m-0 img-30",
            src: `${man}`,
            alt: "",
          }}
        />
        <div className="media-body">
          <span>{name}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {role} <i className="middle fa fa-angle-down"></i>
          </P>
        </div>
      </div>
      <UL attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`${process.env.PUBLIC_URL}/dashboard/users/profile`),
          }}>
          <User />
          <span>{Account} </span>
        </LI>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/email-app`),
          }}>
          <Mail />
          <span>{Inbox}</span>
        </LI>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`${process.env.PUBLIC_URL}/app/todo-app/todo`),
          }}>
          <FileText />
          <span>{Taskboard}</span>
        </LI>
        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>{LogOut}</span>
        </LI>
      </UL>
    </li>
  );
};

export default UserHeader;
