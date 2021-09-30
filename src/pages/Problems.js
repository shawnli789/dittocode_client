import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import RedirectButton from "../components/buttons/RedirectButton";
import ProblemTable from "../components/tables/ProbelmTable";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

function Problems() {
  return (
    <Fragment>
      <Helmet>
        <title>Problems</title>
        <meta
          name="description"
          content="Track all your past practices" />
      </Helmet>
      <Navbar />
      <div className="main-content">
        <div className="container">
          <Header>
            <div className="col">
              <h6 className="header-pretitle">
                Overview
              </h6>

              <h1 className="header-title">
                Problems
              </h1>
            </div>

            <div className="col-auto">
              <RedirectButton href="/new-problem">New Problem</RedirectButton>
            </div>
          </Header>

          <ProblemTable />

        </div>
      </div>
    </Fragment>
  );
}

export default Problems;


