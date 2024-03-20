const getJurySession = async function ({ sessionId, jurySessionRepository, supervisorAccessRepository }) {
  const jurySession = await jurySessionRepository.get({ id: sessionId });
  const hasSupervisorAccess = await supervisorAccessRepository.sessionHasSupervisorAccess({ sessionId });
  return {
    jurySession,
    hasSupervisorAccess,
  };
};

export { getJurySession };
