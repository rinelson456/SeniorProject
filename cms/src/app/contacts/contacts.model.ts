export class Contacts {
    constructor(public name: string, public email: string, public imagePath: string, public id: number, public phone: string, public group: Contacts[]){
    }
}