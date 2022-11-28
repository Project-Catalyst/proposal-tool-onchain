import metadataActionMutation from "./common/metadataAction";

export default function proposalWithdrawalMutation() {
  const action = "proposalWithdrawal";
  const queryToUpdate = ["proposalsWithdrawn"];

  return metadataActionMutation(action, queryToUpdate);
}
