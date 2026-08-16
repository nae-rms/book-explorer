function EmptyState({
  message = "Nothing found.",
  detail = "",
}) {
  return (
    <div className="status-message">
      <p>{message}</p>

      {detail && <span>{detail}</span>}
    </div>
  );
}

export default EmptyState;