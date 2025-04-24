import { use, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [joke, setJoke] = useState();

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleJoke = async () => {
    const response = await fetch("http://127.0.0.1:3000/jokes/random");
    const body = await response.json();
    setJoke(body);
  };
  return (
    <div>
      <h1>Hello World {count}</h1>
      <button onClick={handleClick}> Add </button>
      <button onClick={handleJoke}> Random Joke</button>
      <Joke joke={joke} />
    </div>
  );
};

const Joke = ({ joke }) => {
  if (!joke) return <div> No joke </div>;
  return <div> {joke.content} </div>;
};
export default App;
