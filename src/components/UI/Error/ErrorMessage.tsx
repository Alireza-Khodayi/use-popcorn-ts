interface IProps {
  message: string;
}
function ErrorMessage({ message }: IProps) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

export default ErrorMessage;
