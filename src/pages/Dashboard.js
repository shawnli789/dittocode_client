import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import RedirectButton from "../components/buttons/RedirectButton";
import { Fragment, useEffect, useState, useMemo } from 'react';
import SummaryCard from "../components/cards/SummaryCard";
import useAxiosInstance from "../hooks/use-axios-instance";
import TableCard from "../components/cards/TableCard";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import LineChart from "../components/charts/LineChart";
import {
  getDailyPracticesNumber,
  getProblemNumbersByDifficulty,
  getProblemNumbersByTag,
  getTagObjectsByTag,
  getAcedProblemsNumber,
  getTotalPracticeHours,
  getCompletedRate,
  getDailyRecommendation,
  getTotalDaysFromFirstPractice
} from "../utils/helper";

function Dashboard(props) {
  const {getProblems} = useAxiosInstance();
  const [problemsLatestPractices, setProblemsLatestPractices] = useState([]);
  const [problemsMap, setProblemsMap] = useState({});
  const [allPractices, setAllPractices] = useState([]);
  const [dailyPracticesNumberData, setDailyPracticesNumberData] = useState({});
  const [difficultyData, setDifficultyData] = useState({});
  const [tagsData, setTagsData] = useState({});
  const [acedProblemsNumberData, setAcedProblemsNumberData] = useState({});
  useEffect(() => {
    getProblems()
      .then(function ([problemsLatestPractices, problemsMap, allPractices]) {
        setProblemsLatestPractices(problemsLatestPractices);
        setProblemsMap(problemsMap);
        setAllPractices(allPractices);
      }).catch(function (err) {
        alert(err)
      });
  }, [getProblems]);

  const totalProblemsIcon = <span className="h2 fe fe-edit-3 text-muted mb-0"></span>
  const totalPracticeHoursIcon = <span className="h2 fe fe-clock text-muted mb-0"></span>
  const successRateIcon = <span className="h2 fe fe-trending-up text-muted mb-0"></span>


  const totalProblems = problemsMap.size;
  const totalPracticeHours = getTotalPracticeHours(allPractices);
  const completedRate = getCompletedRate(allPractices);
  const dailyRecommendation = getDailyRecommendation(problemsLatestPractices)

  const dailyPracticesNumber = useMemo(() => getDailyPracticesNumber(allPractices, 12), [allPractices]);
  const difficulty = useMemo(() => getProblemNumbersByDifficulty(problemsLatestPractices), [problemsLatestPractices]);
  const tags = useMemo(() => getProblemNumbersByTag(getTagObjectsByTag(problemsLatestPractices), 7), [problemsLatestPractices]);
  const acedProblemsNumberRecent = useMemo(() => getAcedProblemsNumber(allPractices, problemsMap, 12), [allPractices, problemsMap]);
  const totalDaysFromFirstPractice = useMemo(() => getTotalDaysFromFirstPractice(allPractices), [allPractices]);
  const acedProblemsNumberAll = useMemo(() => getAcedProblemsNumber(allPractices, problemsMap, totalDaysFromFirstPractice), [allPractices, problemsMap, totalDaysFromFirstPractice]); 
  
  // const difficultyPalettes1 = ["#e7ecef", "#274c77", "#6096ba"]
  // const difficultyPalettes2 = ["#a9ddd6", "#7a8b99", "#91adc2"]
  //const difficultyPalettes3 = useMemo(() => ["#70d6ff", "#ff70a6", "#ff9770"], []);
  // const difficultyPalettes4 = ["#2f4858", "#33658a", "#86bbd8"]  
  const difficultyPalettes3 = useMemo(() => ["#cdeac0", "#ffac81 ", "#6d72c3"], []);
  
  // const tagsPalettes1 = ["#ffead0", "#f76f8e", "#96616b", "#37505c", "#113537", "#0fa3b1", "#2e6171"]
  // const tagsPalettes2 = ["#373F51", "#008dd5", "#dfbbb1", "#ea9094", "#ed858d", "#f07a85", "#f56476"]
  // const tagsPalettes3 = ["#3f84e5", "#f0e2e7", "#b20d30", "#c17817", "#3f784c", "#87f1ff", "#260c1a"]
  const tagsPalettes4 = useMemo(() => ["#ffac81", "#ff928b", "#fec3a6", "#efe9ae", "#cdeac0", "#628395", "#6d72c3"], []);

    
  useEffect(() => {
    setDailyPracticesNumberData({
      labels: dailyPracticesNumber.labels, 
      datasets: [
        {
          data: dailyPracticesNumber.values,
        }
      ]
    });

    setDifficultyData({
      labels: difficulty.labels, 
      datasets: [
        {
          data: difficulty.values,
          backgroundColor: difficultyPalettes3,
        }
      ]
    });

    setTagsData({
      labels: tags.labels, 
      datasets: [
        {
          data: tags.values,
          backgroundColor: tagsPalettes4,
        }
      ]
    });

    setAcedProblemsNumberData({
      labels: acedProblemsNumberRecent.labels, 
      datasets: [
        {
          labels: acedProblemsNumberRecent.labels, 
          data: acedProblemsNumberRecent.values,
          borderColor: "#0275d8"
        },
        {
          labels: acedProblemsNumberAll.labels, 
          data: acedProblemsNumberAll.values,
          borderColor: "#0275d8",
          hidden: true,
        }
      ]
    });
  }, [dailyPracticesNumber,
     difficulty, 
     tags, 
     acedProblemsNumberRecent, 
     acedProblemsNumberAll,
     difficultyPalettes3,
     tagsPalettes4
    ])



  const acedProblemsChartId = 'acedProblems'
  const acedProblemsChartTabs =
    <ul className="nav nav-tabs nav-tabs-sm card-header-tabs">
      <li className="nav-item" data-toggle="chart" data-target={"#" + acedProblemsChartId} data-trigger="click" data-action="toggle" data-dataset="0">
        <button className="nav-link active" data-bs-toggle="tab">
          Recent
        </button>
      </li>
      <li className="nav-item" data-toggle="chart" data-target={"#" + acedProblemsChartId} data-trigger="click" data-action="toggle" data-dataset="1">
        <button className="nav-link" data-bs-toggle="tab">
          All
        </button>
      </li>
    </ul>

  return (
    <Fragment>
      <Navbar />
      <div className="main-content">
        <div className="container">
          <Header>
            <div className="col">
              <h6 className="header-pretitle">
                Overview
              </h6>

              <h1 className="header-title">
                Dashboard
              </h1>
            </div>

            <div className="col-auto">
              <RedirectButton href="/new-problem">New Problem</RedirectButton>
            </div>
          </Header>

          <div className="row">
            <div className="col-12 col-sm-6 col-md">
              <SummaryCard
                title='Total Problems'
                data={totalProblems}
                icon={totalProblemsIcon} />
            </div>
            <div className="col-12 col-sm-6 col-md">
              <SummaryCard
                title='Total Practice Hours'
                data={totalPracticeHours}
                icon={totalPracticeHoursIcon} />
            </div>
            <div className="col-12 col-sm-6 col-md">
              <SummaryCard
                title='Success Rate'
                data={completedRate}
                icon={successRateIcon} />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <TableCard
                title='Daily Recommendation'
                data={dailyRecommendation}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-xl-8">
              <BarChart
                title='Recent Practices'
                data={dailyPracticesNumberData} />
            </div>
            <div className="col-12 col-xl-4">
              <PieChart
                title='Difficulty'
                data={difficultyData}
                dataTarget="#difficulty"
                legendId="difficulty"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-xl-4">
              <PieChart
                title='Tags'
                data={tagsData}
                dataTarget="#tags"
                legendId="tags"
              />
            </div>
            <div className="col-12 col-xl-8">
              <LineChart
                title='Aced Problems'
                data={acedProblemsNumberData}
                tabs={acedProblemsChartTabs}
                id={acedProblemsChartId}
              />
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default Dashboard;