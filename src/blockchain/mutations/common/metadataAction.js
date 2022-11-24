import metadataMutation from "./metadata";

export default function metadataActionMutation(action, queryToUpdate = null) {
  return {
    action,
    queryToUpdate,
    ...metadataMutation({ mutationKey: action }),
  };
}
