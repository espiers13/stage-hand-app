function UserCard({ user }) {
  function handlePassword(e) {
    console.log("update password");
  }
  function handleDelete(e) {
    console.log("delete");
  }

  return (
    <div className="bg-slate-200 p-4 border-gray-200 py-6 px-6 text-center flex flex-col gap-2 text-sm rounded-lg mt-2 shadow-md">
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={handlePassword}
        className="bg-white rounded-xl p-1 hover:bg-gray-50 transition-colors"
      >
        Update password
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-300 rounded-xl p-1 hover:bg-red-400 transition-colors"
      >
        Delete account
      </button>
    </div>
  );
}

export default UserCard;
