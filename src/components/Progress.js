function Progress({ qAt, qOf, pAt, pOf, answer }) {
  return (
    <header className="progress">
      <progress max={qOf} value={qAt + Number(answer !== null)} />
      <p>
        Question <strong>{qAt + 1}</strong> / {qOf}
      </p>
      <p>
        <strong>{pAt}</strong> / {pOf} points
      </p>
    </header>
  );
}

export default Progress;
