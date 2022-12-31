import { Button, Typography } from "@mui/material";
import React from "react";
// import QuestionairesList from "../../mocks/Questionaires.json";
import "./styles/style.css";
import Fuse from "fuse.js";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteQuestionaire, getQuestionaires, getQuestionairesByFixture } from "../../api/Questionaire";
import { toast } from "react-toastify";

export default function Questionaires() {
  const [questionaires, setQuestionaires] = React.useState([]);
  const [filteredQuestionaires, setFilteredQuestionaires] = React.useState([]);
  const navigate = useNavigate();
  const params = useLocation()

  const filter = (e) => {
    const options = {
      includeScore: true,
      keys: ["questionaires", "marketplaceSlug"],
    };

    const fuse = new Fuse(questionaires, options);
    const result = fuse.search(e.target.value);
    setFilteredQuestionaires(result);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const res = await getQuestionairesByFixture(params.state.fixtureId);
      setQuestionaires(res.data.questionaire.reverse());
    })();
  }, []);

  const handleQuestinaireDelete = async (_id) => {
    toast("Marketplace added to delete queue!");
    setQuestionaires(questionaires.filter((i) => i._id !== _id));
    await deleteQuestionaire(_id);
    toast("Marketplace deleted successfully!");
  };
  {console.log(filteredQuestionaires)}
  return (
    <div className="questionaire__container">
      <h1 className="title">Active Questionaires</h1>

      <div className="search__container">
        <i className="ri-search-line"></i>{" "}
        <input
          onChange={filter}
          type="text"
          placeholder="Search Questionaires..."
        />
      </div>

      <div className="questionaire__items">
        {/* <Button
          className="questionaire__item newQuestionaire"
          onClick={() => navigate("new")}
        >
          <i className="ri-add-line"></i>
          <Typography variant="p">New Questionaire</Typography>
        </Button> */}

        {filteredQuestionaires.length > 0
          ? filteredQuestionaires.map((data, index) => {
            console.log(data)
              return (
                <div className="questionaire__item" key={index}>
                  <img
                    src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                    loading="lazy"
                  />
                  <div className="marketplaceSlug">
                    {/* <b>Marketplace</b>: {data?.item?.marketplaceSlug} */}
                  </div>
                  <div className="fixture">
                    {/* <b>Fixture</b>: {data?.item?.fixtureId} */}
                  </div>
                 
                  <ul>
                    {data?.item?.questionaires.map((question, index) => {
                   
                      return <li key={index}>{question}</li>;
                    })}
                  </ul>
                  <div className="actions">
                    <Button
                      onClick={() => navigate("edit")}
                      className="editBtn"
                    >
                      <i className="ri-settings-line"></i> Edit
                    </Button>
                   
                    <Button
                      className="resultBtn"
                      onClick={() =>
                        navigate("/results/new", {
                          state: {
                            questionaireId: data?.item?._id,
                            

                          },
                        })
                      }
                    >
                      <i className="ri-gamepad-line"></i> Set Result
                    </Button>
                    <Button
                      onClick={() => handleQuestinaireDelete(data.item._id)}
                      className="deleteBtn"
                    >
                      <i className="ri-delete-bin-5-line"></i> Delete
                    </Button>
                  </div>
                </div>
              );
            })
          : questionaires.map((data, index) => {
             
              return (
                <div className="questionaire__item" key={index}>
                  <img
                    src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                    loading="lazy"
                  />

                  <div className="marketplaceSlug">
                    {/* <b>Marketplace</b>: {data.marketplaceSlug} */}
                  </div>
                  <div className="fixture">
                    <b>Fixture</b>: {data?.fixtureId?.HomeTeam} vs{" "}
                    {data?.fixtureId?.AwayTeam}
                  </div>
                  <div style={{ display: "flex" }}>
                    <ul>
                      {data?.questionaires.questions.map((question, index) => {
                        return <li key={index}>{question}</li>;
                      })}
                    </ul>
                    <ul>
                      {data?.questionaires.points.map((point, index) => {
                        return (
                          <li
                            key={index}
                            style={{ listStyle: "none", color: "green" }}
                          >
                            {point}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="actions">
                    <Button
                      onClick={() =>
                        navigate("edit", {
                          state: data,
                        })
                      }
                      className="editBtn"
                    >
                      <i className="ri-settings-line"></i> Edit
                    </Button>
                    <Button
                      className="resultBtn"
                      onClick={() =>
                        navigate(`/results/new`, {
                          state: {
                            questions: data?.questionaires,
                            qid: data?._id,
                          },
                        })
                      }
                    >
                      <i className="ri-gamepad-line"></i> Set Result
                    </Button>
                    <Button
                      onClick={() => handleQuestinaireDelete(data._id)}
                      className="deleteBtn"
                    >
                      <i className="ri-delete-bin-5-line"></i> Delete
                    </Button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
