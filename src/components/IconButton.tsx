import "./IconButton.css";
const IconButton: React.FC<{
  iconSrc: string;
  name: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ iconSrc, name, onClick }) => {
  return (
    <div className="icon-button" onClick={onClick}>
      <div>
        <img className="img" alt={iconSrc} src={iconSrc} />
      </div>
      {name}
    </div>
  );
};
export default IconButton;
