import loadingIconImage from "../assets/loading_icon.gif";

function LoadingIcon(): JSX.Element {
    return <img className="h-auto w-6" src={loadingIconImage} alt="Loading spinner" />;
}

export default LoadingIcon;
