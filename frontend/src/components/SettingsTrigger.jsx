import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

const SettingsTrigger = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: 24,
          cursor: "pointer",
        }}
        onClick={() => setShowModal(true)}
      >
        ⋮
      </div>
      {showModal && (
        <SettingsModal
          onClose={() => setShowModal(false)}
          activeCategory="members"
        />
      )}
    </>
  );
};

export default SettingsTrigger;
