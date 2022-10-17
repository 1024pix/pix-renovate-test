function getErrorDetails(response, customMessage) {
  let errorDetails;

  if (typeof response.data === 'string') {
    errorDetails = response.data.length > 0 ? response.data : 'Pas de détails disponibles';
  }

  if (typeof response.data === 'object') {
    errorDetails = response.data.error_description
      ? { errorDescription: response.data.error_description, errorType: response.data.error }
      : JSON.stringify(response.data);
  }

  const dataToLog = {
    customMessage,
    errorDetails,
  };

  return dataToLog;
}

module.exports = {
  getErrorDetails,
};
