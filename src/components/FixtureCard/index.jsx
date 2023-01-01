import React from "react";
import { Button, Stack, styled, Switch, Typography } from "@mui/material";
import { getAllPredictionsByFixture } from "../../api/Marketplace";
import { updateFixtureStatus } from "../../api/Fixture";
import { useNavigate } from "react-router-dom";
import clubFlags from "../../helpers/EPLFlags.json";
import CarabaoClubFlags from "../../helpers/EFLFlags.json";
import EPLFlags from "../../helpers/EPLFlags.json";
import GetFlags from "../utils/GetFlags";

const FixtureCard = ({ fixture, handleFixtureDelete }) => {
  console.log(fixture);
  const [switchValue, setSV] = React.useState(
    fixture?.status[0]?.status == "open" ? true : false
  );
  const navigate = useNavigate();

  const { HomeTeamFlag, AwayTeamFlag } = GetFlags();

  const handleSwitch = async (e) => {
    setSV(!switchValue);
    let mode = "";
    if (e.target.value == "on") {
      mode = "open";
    } else {
      mode = "closed";
    }
    const status = await updateFixtureStatus(fixture._id, mode);
    console.log(status);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#68a94d" : "#68a94d",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));



  return (
    <div className="fixture__item">
      <div className="fixture">
        <p className="title">
          <b>
            <i className="ri-gamepad-line"></i> Marketplace
          </b>
          : {fixture.marketplaceSlug}
        </p>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Closed</Typography>
          <AntSwitch
            value={switchValue ? "off" : "on"}
            defaultChecked={switchValue}
            inputProps={{ "aria-label": "ant design" }}
            onChange={(e) => handleSwitch(e)}
          />
          <Typography>Open</Typography>
        </Stack>
      </div>
      <div className="gameDetails">
        <span className="homeTeam">
          <p>{fixture.HomeTeam}</p>
          {HomeTeamFlag(fixture)}
        </span>
        <span>VS</span>
        <span className="awayTeam">
          {AwayTeamFlag(fixture)}
          <p>{fixture?.AwayTeam}</p>
        </span>
      </div>

      <div className="summary">
        <p>
          Predictions
          <br /> <b>{fixture.predictions.length}</b>
        </p>
        <p>
          Questions
          <br /> <b>12</b>
        </p>
        <p>
          Results
          <br /> <b>3</b>
        </p>
      </div>

      <div className="actions">
        <Button
          className="editBtn"
          onClick={() =>
            navigate("edit", {
              state: fixture,
            })
          }
        >
          <i className="ri-settings-line"></i> Edit
        </Button>
        <Button
          onClick={() =>
            // navigate(`/questionaires/new`, {
            //   state: {
            //     fixtureId: fixture?._id,
            //     awayTeam:fixture?.AwayTeam,
            //     homeTeam:fixture?.HomeTeam
            //   },
            // })
            navigate(`/questionaires/`, {
              state: {
                fixtureId: fixture?._id,
              },
            })
          }
          className="editBtn"
        >
          <i className="ri-message-3-line"></i> Questionaire
        </Button>
        <Button
          onClick={() =>
            navigate(`/questionaires/new`, {
              state: {
                fixtureId: fixture?._id,
                awayTeam: fixture?.AwayTeam,
                homeTeam: fixture?.HomeTeam,
                slug: fixture?.marketplaceSlug,
              },
            })
          }
          className="editBtn"
        >
          <i className="ri-message-3-line"></i> Add Questionaire
        </Button>
        <Button
          className="deleteBtn"
          onClick={() => handleFixtureDelete(fixture._id)}
        >
          <i className="ri-delete-bin-5-line"></i> Delete
        </Button>
      </div>
    </div>
  );
};

export default FixtureCard;
