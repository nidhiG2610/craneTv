import Navbar from "./Navbar";

export function AppHeader() {
  return (
    <header className="flex flex-col gap-3">
      <div className="brand">
        <div className="logo" aria-label="CraneTV logo">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 15C8 14 10 11 11.3 7.8C11.7 6.9 12.9 6.8 13.4 7.7C14.3 9.3 15.6 10.7 18.5 11.5C16.5 12.2 15.1 13.4 13.8 16.2C13.4 17 12.3 17.1 11.8 16.3C10.5 14.5 8.8 14.2 5 15Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div>
          <h1>CraneTV</h1>
          <p>Real picks from real fans.</p>
        </div>
      </div>
      <Navbar />
      {/* <div className="pill">Brand color: Deep Teal · Genre color shifts remembered</div> */}
    </header>
  );
}
