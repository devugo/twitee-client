const UserProfile = ({ name, signOut }: { name: string; signOut: () => void }) => {
  return (
    <div className="user-profile">
      <p>
        <span className="user-name">Welcome, {name}</span>{' '}
        <span className="user-signout" onClick={signOut}>
          Sign out
        </span>
      </p>
    </div>
  );
};

export default UserProfile;
