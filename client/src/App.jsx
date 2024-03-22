// import { useEffect, useState } from "react";
import { useState } from "react";
import "./App.css";

// This code is heavily inspired by milestone 5 & open weather activity

// The keyword getter and setter is specifically the user's input in the form. keyword is also one parameter in my external API. currently keywords my app takes are "sleep", "stress" and "exercise" but user could potentially type other health topics unrelated to sleep, if they want to.
function App() {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [topics, setTopics] = useState([]);
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
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  // activated when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    getTopics();
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
  const getTopics = async () => {
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
      const topicsArray = info.Result.Resources.Resource;
      setTopics(topicsArray);
      console.log(topicsArray);
      setError(false);
    } catch (e) {
      setError(true);
      setTopics(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>🌃 Best Rest 😴</h2>
      <h3>Your source for sleep tips from A to 💤</h3>
      <img
        src="https://static-00.iconduck.com/assets.00/sloth-emoji-1986x2048-p4zkd650.png"
        alt="A sloth emoji"
        width="200"
        height="400"
      />
      <div className="search">
        <form onSubmit={handleSubmit} className="input-form">
          <label htmlFor="keyword" className="keyword-input">
            Enter a topic:{" "}
          </label>
          <input
            type="text"
            name="keyword"
            value={keyword}
            // onChange={(e) => setKeyword(e.target.value)}
            onChange={handleInputChange}
            placeholder="ex: stress"
          />
          <div>
            <button type="submit" onClick={getTopics} className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* Error code below */}
      <div>
        {error && <div className="error"> Please enter a valid topic. </div>}
      </div>
      {loading && <div className="Loader" />}
      {/* Not sure if this code below is the right way to do this. It is inspired by the Openweather activity code */}
      <div className="topic-container">
        {topics.length
          ? topics.map((topic) => (
              <div key={topic.Id}>
                <div className="topic-info">
                  <div className="topic-id">
                    <h3>Topic ID: {topic.Id}</h3>
                  </div>
                </div>
                <div className="topic-title">
                  <h3>Topic title: {topic.Title}</h3>
                </div>
                <div className="topic-content">
                  <h3>Here is some more information about this topic:</h3>
                  <div>
                    {topic.Sections.section.map((item, index) => (
                      <div key={index}>
                        <h3>Title: {item.Title}</h3>
                        {/* <div>Content: {item.Content}</div> */}
                        <div
                          dangerouslySetInnerHTML={{ __html: item.Content }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="topic-image">
                  <h3>Image:</h3>
                  {/* <p>{topic.Resources.Resource.ImageUrl}</p> */}
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="disclaimer">
        <p className="disclaimer-tag">All health information provided by:</p>
        <a
          href="https://health.gov/myhealthfinder"
          title="MyHealthfinder"
          target="blank"
        >
          <div className="disclaimer-img">
            <img
              src="https://health.gov/themes/custom/healthfinder/images/MyHF.svg"
              alt="MyHealthfinder"
            />
          </div>
        </a>
      </div>
      {/* <footer>
        <a
          href="https://health.gov/myhealthfinder"
          title="MyHealthfinder"
          target="blank"
        >
          <img
            src="https://health.gov/themes/custom/healthfinder/images/MyHF.svg"
            alt="MyHealthfinder"
          />
        </a>
      </footer> */}
    </div>
  );
}

export default App;
