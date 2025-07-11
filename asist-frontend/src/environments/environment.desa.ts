const $BASE_REST = "https://asistin.onrender.com";
// const $BASE_REST = "http://localhost:3000";

export const environment = {
    production: false,
    baseRest: $BASE_REST,
    firebase: {
      apiKey: "AIzaSyDct7IfhhA4EO3QMkHyRZxLpLtAjeuE2sY",
      authDomain: "asistin-a492d.firebaseapp.com",
      projectId: "asistin-a492d",
      storageBucket: "asistin-a492d.firebasestorage.app",
      messagingSenderId: "617204476716",
      appId: "1:617204476716:web:63bdd95c7af94e23b5da89"
    },
    auth: {
      login: `${$BASE_REST}/auth/login`
    },
    user: {
      get_user_profile: `${$BASE_REST}/user/profile`,
      editar_user_profile: `${$BASE_REST}/user/profile`,
      avatar_user_profile: `${$BASE_REST}/user/avatar-url`
    },
    select: {
      generos: `${$BASE_REST}/select/genders`
    },
    materias: {
      materias_alumnos: `${$BASE_REST}/class-schedule/student`,
      valid_locations: `${$BASE_REST}/valid-locations`, 
      attendance: `${$BASE_REST}/attendance`
    }
}