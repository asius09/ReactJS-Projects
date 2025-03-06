const featureFlagsData = {
  enableDarkMode: true,
  showNewNavbar: false,
  enableAdvancedSearch: true,
  displayBetaFeatures: false,
  useNewPaymentGateway: true,
  enableChatBot: false,
  showUserAnalytics: true,
};

function fetchFeatureFlags() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (featureFlagsData) {
        resolve(featureFlagsData);
      } else {
        reject("Failed to fetch feature flags. Please try again.");
      }
    }, 500);
  });
}

export default fetchFeatureFlags;
