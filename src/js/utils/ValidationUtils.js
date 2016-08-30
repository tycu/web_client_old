export function validEvent(state) {
  const requiredFields = ['imageUrl', 'imageAttribution', 'politicianId', 'headline', 'summary'];
  var shouldContinue = true,
      key;

  _(requiredFields).forEach(function(value) {
    key = state.event[value];
    if (key[0] === undefined && !Number.isInteger(key)) {
    // if (_.isEmpty(key) || !Number.isInteger(key)) {
      shouldContinue = false
      return false;
    }
  });
  return shouldContinue;
}



function hasDuplicates(a) {
  return _.uniq(a).length !== a.length;
}

export function validPacGroup(state) {
  const supportPacIds = _.map(state.supportPacs, function(v, i) {
    return v.pacId
  });
  const opposePacIds = _.map(state.opposePacs, function(v, i) {
    return v.pacId
  });
  return !hasDuplicates(supportPacIds.concat(opposePacIds))
}

export function validPolitician(state) {
  const requiredFields = ['firstName', 'lastName', 'jobTitle', 'twitterUsername'];
  var shouldContinue = true;

  _(requiredFields).forEach(function(value) {
    if (_.isEmpty(state.politician[value])) {
      shouldContinue = false
      return false;
    }
  });
  return shouldContinue;
}