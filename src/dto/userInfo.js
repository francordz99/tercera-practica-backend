export class userInfoDto {
    constructor(userInfo) {
        this.nombre = userInfo.nombre,
            this.apellido = userInfo.apellido,
            this.email = userInfo.email,
            this.celular = userInfo.celular,
            this.edad = userInfo.edad
    }
};
