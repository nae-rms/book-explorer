function ErrorState({
  message = "Something went wrong.",
  detail = "",
}) {
  return (
    <div className="status-message error">
      <p>{message}</p>

      {detail && <span>{detail}</span>}
    </div>
  );
}

export default ErrorState;