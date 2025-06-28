export enum Gender {
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    Otro = 'Otro',
    NoEspecifica = 'NoEspecifica',
}

export const GenderDescriptions = {
    [Gender.Masculino]: { id: 1, description: 'Masculino' },
    [Gender.Femenino]: { id: 2, description: 'Femenino' },
    [Gender.Otro]: { id: 3, description: 'Otro' },
    [Gender.NoEspecifica]: { id: 4, description: 'No especifica' },
};
