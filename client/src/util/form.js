export function getSubmitButtonText(noun, id, loading) {
  const verbs = [['Create', 'Creating'], ['Save', 'Saving']];
  const verb = verbs[Number(Boolean(id))][Number(loading)];
  return `${verb} ${noun}${loading ? '...' : ''}`;
}
