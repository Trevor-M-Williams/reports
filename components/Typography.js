export function H1({ text, styles }) {
  return (
    <h1 className={`mb-4 text-3xl font-medium ${styles ? styles : ""}`}>
      {text}
    </h1>
  );
}

export function H2({ text, styles }) {
  return (
    <h2 className={`text-2xl font-medium ${styles ? styles : ""}`}>{text}</h2>
  );
}

export function H3({ text, styles }) {
  return (
    <h3 className={`text-xl font-medium ${styles ? styles : ""}`}>{text}</h3>
  );
}

export function P({ text, styles }) {
  return <p className={`${styles ? styles : ""}`}>{text}</p>;
}
