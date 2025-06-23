import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loader, user } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  // Dummy data for modal
  const userImg = "https://randomuser.me/api/portraits/men/1.jpg";
  const dummyBio =
    "Passionate developer. Loves clean code, coffee, and solving problems. Always learning.";

  return loader ? (
    <Loader />
  ) : (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={userImg}
          alt="User Avatar"
          className="profile-avatar"
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer" }}
        />
        <h1
          className="profile-name"
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer" }}
        >
          {user?.name}
        </h1>
        <h2 className="profile-email">{user?.email}</h2>
      </div>

      {showModal && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="profile-modal scale-in">
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img src={userImg} alt="User Avatar" className="modal-avatar" />
            <h2 className="modal-name">{user?.name}</h2>
            <p className="modal-email">{user?.email}</p>
            <p className="modal-bio">{dummyBio}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
