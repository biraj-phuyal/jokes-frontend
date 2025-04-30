import { use, useEffect, useState } from "react";

const App = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="tab-container">
      <div className="tab-list">
        <button onClick={() => setTab("add")}> Add </button>
        <button onClick={() => setTab("randomJoke")}> Random Joke</button>
        <button onClick={() => setTab("allJokes")}>All Jokes</button>
      </div>
      <div className="tab-content">
        <TabContent tab={tab} />
      </div>
    </div>
  );
};

const TabContent = ({ tab }) => {
  if (tab == "randomJoke") return <RandomJoke />;
  else if (tab == "add") return <AddJoke />;
  else if (tab == "allJokes") return <AllJokes />;
  else return "";
};

const AllJokes = () => {
  const [all, setAll] = useState();
  const handleAllJokes = async () => {
    const response = await fetch("http://127.0.0.1:3000/jokes");
    console.log(response);
    const body = await response.json();
    setAll(body);
  };
  return (
    <div>
      <button onClick={handleAllJokes}>Pagman</button>
      {all ? (
        all.map((joke) => (
          <div>
            <Joke joke={joke} />
          </div>
        ))
      ) : (
        <div> No jokes </div>
      )}
    </div>
  );
};

const AddJoke = () => {
  return "add joke";
};

const RandomJoke = () => {
  const [joke, setJoke] = useState();

  const handleFetchJoke = async () => {
    const response = await fetch("http://127.0.0.1:3000/jokes/random");
    const body = await response.json();
    setJoke(body);
  };

  return (
    <div>
      <button onClick={handleFetchJoke}>Fetch Joke</button>
      <Joke joke={joke} />
    </div>
  );
};

const DeleteJoke = () => {
  const [joke, setJoke] = useState();

  const handleDeleteJoke = async () => {
    const response = await fetch("http://127.0.0.1:3000/jokes");
    const body = await response.json();
    setJoke(body);
  };

  return (
    <div>
      <button onClick={handleFetchJoke}>Fetch Joke</button>
      <Joke joke={joke} />
    </div>
  );
};

const Joke = ({ joke }) => {
  if (!joke) return <div> No joke </div>;
  return <div className="joke"> {joke.content} </div>;
};
export default App;
