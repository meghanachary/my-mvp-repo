// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";

// This code is heavily inspired by milestone 5 & open weather activity

// The keyword getter and setter is specifically the user's input in the form. keyword is also one parameter in my external API. currently keywords my app takes are "sleep", "stress" and "exercise"
function App() {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [topic, setTopic] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  // const [selectedTopic, setSelectedTopic] = useState(null);
  const [error, setError] = useState("");

  // keeping this code just in case
  // useEffect(() => {
  //   getTopics();
  // }, []);

  // const getTopics = () => {
  //   fetch("/api/topics")
  //     .then((response) => response.json())
  //     .then((topics) => {
  //       setTopics(topics);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // // This code below is specifically for the user to click on the topic of their choice, from the list. Clicking a topic will return a blurb of text information about that specific topic.
  // const handleSelectedTopic = async (id) => {
  //   // requirements: GET method, /api/topics/:id
  //   try {
  //     const result = await fetch(`/api/topics/${id}`);
  //     const topic = await result.json();
  //     setSelectedTopic(topic);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // This is my second attempt, trying to fetch the data from the EXTERNAL api.

  // this is for the keyword user input. the user can type "sleep", "stress" or
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // activated when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    getTopic();
  };

  // Keeping this code here just in case. the .then version
  //  const getTopic = () => {
  //   fetch(`https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=${keyword}`)
  //     .then((response) => response.json())
  //     .then((topic) => {
  //       setTopic(topic);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //This one is based off of the Openweather activity
  const getTopic = async () => {
    try {
      setLoading(true);
      if (!keyword.trim()) {
        return;
      }

      const url = `https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword=${keyword}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch topic`);
      }

      const info = await res.json();
      console.log(info);
      setTopic(info);
      setError(false);
    } catch (e) {
      setError(true);
      setTopic(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Best Rest</h1>
      <h3>Your source for sleep tips from A to 💤</h3>
      <img src="https://static-00.iconduck.com/assets.00/sloth-emoji-1986x2048-p4zkd650.png" />
      <div className="search">
        <form onSubmit={handleSubmit} className="input-form">
          <label htmlFor="keyword" className="keyword-input">
            What are you looking for?{" "}
          </label>
          <input
            type="text"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter your topic here"
          />
          <div>
            <button type="submit" onClick={getTopic} className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* The code below will display if there's an error */}
      <div>
        {error && <div className="error"> Please enter a valid topic. </div>}

        {loading && <div className="Loader" />}

        {topic ? (
          <div className="container">
            <div className="topic-info">
              <div className="topic-id">
                <p>
                  {/*Need to test, and see if I can fetch the right info using the correct params from the health API */}
                  {topic.Result.Resources.Resource.Id}
                </p>
              </div>
            </div>
            <div className="topic-title">
              <p>{topic.Result.Resources.Resource.Title}°f</p>
            </div>
            <div className="topic-content">
              <h3>Here is some information about this topic:</h3>
              <p>{topic.Result.Resources.Resource.Content}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className="App">
  //       <h1>Best Rest</h1>
  //       <h3>Offering sleep tips from A to ZZZ</h3>
  //       <img src="https://static-00.iconduck.com/assets.00/sloth-emoji-1986x2048-p4zkd650.png" />
  //       <form onSubmit={handleSubmit} className="input-form">
  //         <label htmlFor="keyword" className="keyword-input">
  //           Enter a topic here:{" "}
  //         </label>
  //         <input type="text" name="keyword" />
  //       </form>
  //     </div>
  //   </>
  // );
}

export default App;
