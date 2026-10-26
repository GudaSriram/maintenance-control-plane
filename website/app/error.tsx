"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="empty-state">
      <h1>Something didn’t load.</h1>
      <p>
        Please try again. Your enquiry is only accepted after an explicit
        confirmation.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
