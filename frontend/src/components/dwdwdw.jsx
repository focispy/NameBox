function RoleBadge({ role }) {
  const roleMap = {
    admin: { label: "ᴀᴅᴍɪɴ", bgColor: "#d32f2f" }, 
    manager: { label: "ᴍᴀɴᴀɢᴇʀ", bgColor: "#1976d2" }, 
    moder: { label: "ᴍᴏᴅᴇʀ", bgColor: "#121a2a" }, 
  };

  const { label, bgColor } = roleMap[role] || { label: "UNKNOWN", bgColor: "#777" };

  const style = {
    backgroundColor: bgColor,
    color: "#fff",
    fontVariantCaps: "small-caps",
    padding: "4px 12px",
    borderRadius: "8px",
    display: "inline-block",
    fontWeight: "600",
    minWidth: "90px",
    textAlign: "center",
    userSelect: "none",
  };

  return <span style={style}>{label}</span>;
}
