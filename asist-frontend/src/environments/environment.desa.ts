const $BASE_REST = "https://asistin.onrender.com";

export const environment = {
    production: false,
    baseRest: $BASE_REST,
    auth: {
      login: `${$BASE_REST}/auth/login`
    }
}