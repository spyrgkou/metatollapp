import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import _ from "lodash";
import Table from "./common/table";
import { getPassesPerStation } from "./services/passesService";

class PassesPerStation extends Form {
  state = {
    data: {
      station: "",
      periodFrom: "2018-01-01",
      periodTo: "2018-12-31",
    },
    outputData: {},
    errors: {},
  };

  schema = {
    station: Joi.string().required().label("Station"),
    periodFrom: Joi.date().required().label("PeriodFrom"),
    periodTo: Joi.date().required().label("PeriodTo"),
  };

  doSubmit = async () => {
    const { station, periodFrom, periodTo } = this.state.data;
    const { data: outputData } = await getPassesPerStation(
      station,
      periodFrom.replaceAll("-", ""),
      periodTo.replaceAll("-", "")
    );
    if (!outputData) {
      alert("No data with those parameters were found!");
      this.setState({ outputData: {} });
    } else {
      this.setState({ outputData });
    }
  };

  render() {
    return (
      <div>
        <h1>Passes Per Station </h1>
        <div className="searchform">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("station", "Station")}
            {this.renderInput("periodFrom", "PeriodFrom", "date")}
            {this.renderInput("periodTo", "PeriodTo", "date")}
            {this.renderButton("Search")}
          </form>
        </div>
        {!this.state.outputData.PassesList && (
          <p>
            No Data are Available. Select the appropriate filters and press
            Search!
          </p>
        )}
        {this.state.outputData.PassesList && (
          <div>
            <p>
              The Station {this.state.outputData.Station} of the Operator{" "}
              {this.state.outputData.StationOperator} recorded{" "}
              {this.state.outputData.NumberOfPasses} passes from{" "}
              {this.state.outputData.PeriodFrom} to{" "}
              {this.state.outputData.PeriodTo}.
            </p>
            <Table
              data={this.state.outputData.PassesList}
              columns={_.keys(this.state.outputData.PassesList[0])}
              keyLabel="PassIndex"
            />
          </div>
        )}
      </div>
    );
  }
}

export default PassesPerStation;
