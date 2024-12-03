import { States } from './States';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '2rem',
      }}
    >
      <h1>Select Location</h1>
      <States />
    </div>
  );
}

export default App;
