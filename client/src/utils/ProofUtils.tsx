var base64 = require("base-64");

export const getProofFromBase64 = (data: any) => {
  const decoded = base64.decode(data);
  var json = JSON.parse(decoded);
  return json.requested_proof.revealed_attrs;
};
