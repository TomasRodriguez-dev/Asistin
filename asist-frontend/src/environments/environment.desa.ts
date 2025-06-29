const $BASE_REST = "https://asistin.onrender.com";

export const environment = {
    production: false,
    baseRest: $BASE_REST,
    auth: {
      login: `${$BASE_REST}/auth/login`
    },
    user: {
      get_user_profile: `${$BASE_REST}/user/profile`,
      editar_user_profile: `${$BASE_REST}/user/profile`,
      avatar_user_profile: `${$BASE_REST}/user/avatar`
    },
    select: {
      generos: `${$BASE_REST}/select/genders`
    }
}