import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import _ from "lodash";
import Table from "./common/table";
import { getChargesBy } from "./services/passesService";

class PassesPerStation extends Form {
  state = {
    data: {
      op_ID: "",
      periodFrom: "2018-01-01",
      periodTo: "2018-12-31",
    },
    outputData: {},
    errors: {},
  };

  schema = {
    op_ID: Joi.string().required().label("Op_ID"),
    periodFrom: Joi.date().required().label("PeriodFrom"),
    periodTo: Joi.date().required().label("PeriodTo"),
  };

  doSubmit = async () => {
    const { op_ID, periodFrom, periodTo } = this.state.data;
    const { data: outputData } = await getChargesBy(
      op_ID,
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
            {this.renderInput("op_ID", "Op_ID")}
            {this.renderInput("periodFrom", "PeriodFrom", "date")}
            {this.renderInput("periodTo", "PeriodTo", "date")}
            {this.renderButton("Search")}
          </form>
        </div>
        {!this.state.outputData.PPOList && (
          <p>
            No Data are Available. Select the appropriate filters and press
            Search!
          </p>
        )}
        {this.state.outputData.PPOList && (
          <div>
            <p>
              The charges of {this.state.outputData.op_ID} to the rest of operators 
              {this.state.outputData.PeriodFrom} to{" "}
              {this.state.outputData.PeriodTo} are:
            </p>
            <Table
              data={this.state.outputData.PPOList}
              columns={_.keys(this.state.outputData.PPOList[0])}
              keyLabel="VisitingOperator"
            />
          </div>
        )}
      </div>
    );
  }
}

export default PassesPerStation;
