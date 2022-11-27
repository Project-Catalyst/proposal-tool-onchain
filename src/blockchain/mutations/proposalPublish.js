import metadataActionMutation from "./common/metadataAction";

export default function proposalPublishMutation() {
  const action = "proposalPublication";
  const queryToUpdate = ["publishedProposals"];

  return metadataActionMutation(action, queryToUpdate);
}
