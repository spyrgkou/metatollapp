import http from "./httpService";

const apiEndpoint = "http://localhost:9103/interoperability/api/"

export async function getPassesPerStation(station, date_from, date_to){
    return http.get(apiEndpoint+"passesperstation/"+station+"/"+date_from+"/"+date_to);
}

export async function getPassesAnalysis(op1_ID, op2_ID, date_from, date_to){
    return http.get(apiEndpoint+"passesanalysis/"+op1_ID+"/"+op2_ID+"/"+date_from+"/"+date_to);
}

export async function getPassesCost(op1_ID, op2_ID, date_from, date_to){
    return http.get(apiEndpoint+"passescost/"+op1_ID+"/"+op2_ID+"/"+date_from+"/"+date_to);
}


export async function getChargesBy(op_ID, date_from, date_to){
    return http.get(apiEndpoint+"chargesby/"+op_ID+"/"+date_from+"/"+date_to);
}