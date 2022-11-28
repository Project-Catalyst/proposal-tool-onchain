import metadataActionMutation from "./common/metadataAction";

export default function proposalPublishMutation() {
  const action = "proposalPublication";
  const queryToUpdate = ["proposalsPublished"];

  return metadataActionMutation(action, queryToUpdate);
}
