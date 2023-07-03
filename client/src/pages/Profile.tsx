import useLogout from "../hooks/useLogout";

function Profile(): JSX.Element {
    const { logout } = useLogout();
    return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;
