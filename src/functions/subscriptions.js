export function formatAndSortSubscriptions(
  userSubscriptions,
  globalSubscriptions
) {
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  // Add logo to user subscription objects
  const formattedUserSubscriptions = userSubscriptions.map((userSub) => {
    const globalSub = globalSubscriptions.find(
      (globalSub) => globalSub.id === userSub.subscription_id
    );
    return {
      ...userSub,
      logo: globalSub ? globalSub.logo : "",
      subscription_end_date: formatDate(userSub.subscription_end_date),
    };
  });

  // Sort user subscriptions by nearest end date
  formattedUserSubscriptions.sort((a, b) => {
    const dateA = new Date(a.subscription_end_date);
    const dateB = new Date(b.subscription_end_date);
    return dateA - dateB;
  });

  return formattedUserSubscriptions;
}
