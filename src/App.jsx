import { useState } from "react";

const App = () => {
  const [tab, setTab] = useState("add");

  return (
    <div className="tab-container">
      <div className="tab-list">
        <button onClick={() => setTab("add")}> Add </button>
        <button onClick={() => setTab("randomJoke")}>Random</button>
        <button onClick={() => setTab("allJokes")}>List</button>
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
    const body = await response.json();
    setAll(body);
  };
  return (
    <div>
      <button onClick={handleAllJokes}> Jokes </button>
      {all ? (
        all.map((joke, index) => (
          <div key={index}>
            <Joke joke={joke} />
          </div>
        ))
      ) : (
        <div className="noJoke"></div>
      )}
    </div>
  );
};

const AddJoke = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [joke, setAdd] = useState();

  const handleAddJoke = async () => {
    const jokeData = {
      humour: topText,
      context: bottomText,
    };

    const response = await fetch("http://127.0.0.1:3000/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData),
    });

    const body = await response.json();
    setAdd(body);
  };

  return (
    <div>
      <input
        className="inputs"
        onChange={(e) => setTopText(e.target.value)}
        type="text"
        required
        placeholder="Humour"
      />
      <input
        className="inputs2"
        onChange={(e) => setBottomText(e.target.value)}
        type="text"
        required
        placeholder="Context"
      />
      <button className="add" onClick={handleAddJoke}>
        create
      </button>
      {<Joke joke={joke} />}
    </div>
  );
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
      <button className="fetch" onClick={handleFetchJoke}>
        find
      </button>
      <Joke className="joke_content" joke={joke} />
    </div>
  );
};

const Joke = ({ joke }) => {
  if (!joke) return <div className="noJoke"> No joke yet </div>;
  return <div className="joke"> {joke.content} </div>;
};

export default App;
