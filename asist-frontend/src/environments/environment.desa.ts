const $BASE_REST = "http://localhost:3000";

export const environment = {
    production: false,
    baseRest: $BASE_REST,
    auth: {
      login: `${$BASE_REST}/auth/login`
    }
}