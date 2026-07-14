function UserCard({ user }) {
  return (
    <div className="bg-gray-50 p-4 border-gray-200 py-6 px-6 text-center flex flex-col gap-2 text-sm">
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserCard;
