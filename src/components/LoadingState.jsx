function LoadingState({
  message = "Loading...",
  detail = "",
}) {
  return (
    <div className="status-message">
      <p>{message}</p>

      {detail && <span>{detail}</span>}
    </div>
  );
}

export default LoadingState;