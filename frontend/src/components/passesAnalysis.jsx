import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import _ from "lodash";
import Table from "./common/table";
import { getPassesAnalysis } from "./services/passesService";

class PassesAnalysis extends Form {
  state = {
    data: {
      op1_ID: "",
      op2_ID: "",
      periodFrom: "2018-01-01",
      periodTo: "2018-12-31",
    },
    outputData: {},
    errors: {},
  };

  schema = {
    op1_ID: Joi.string().required().label("Operator1"),
    op2_ID: Joi.string().required().label("Operator2"),
    periodFrom: Joi.date().required().label("PeriodFrom"),
    periodTo: Joi.date().required().label("PeriodTo"),
  };

  doSubmit = async () => {
    const { op1_ID, op2_ID, periodFrom, periodTo } = this.state.data;
    const { data: outputData } = await getPassesAnalysis(
      op1_ID,
      op2_ID,
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
        <h1>Passes Analysis </h1>
        <div className="searchform">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("op1_ID", "Operator1")}
            {this.renderInput("op2_ID", "Operator2")}
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
              There were {this.state.outputData.NumberOfPasses} passes recorded
              with a {this.state.outputData.op2_ID} vehicle tag from a station
              operated by {this.state.outputData.op1_ID}
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

export default PassesAnalysis;
