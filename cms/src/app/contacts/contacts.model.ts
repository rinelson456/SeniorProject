export class Contacts {
    constructor(public name: string, public email: string, public imagePath: string, public id: string, public phone: string, public group: Contacts[]){
    }
}