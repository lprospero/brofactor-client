export interface IPlayer {
    _id?: string,
    name: string,
    email: string,
    password: string,
    avatar: string,
    awards: [{
        sponsor: string,
        award: string,
        dateCreated: Date,
        note: string
    }]
}