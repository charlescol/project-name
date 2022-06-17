export const SharedBusinessErrors = {
    DbSaveError: {
        apiErrorCode: 'E_0001_0001',
        errorMessage: `Error when trying to save resource into the DB`,
        reason: 'Internal server error'
    },
    NotFound: {
        apiErrorCode: 'E_0002_0002',
        errorMessage: 'Ressource not found',
        reason: `Provided ressource ids doesn't exist in DB`
    },
    InvalidItem: {
        apiErrorCode: 'E_0003_0003',
        errorMessage: 'Invalid Ressource',
        reason: `Provided ressource is invalid`
    },
}