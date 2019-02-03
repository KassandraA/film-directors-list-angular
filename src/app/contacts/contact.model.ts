export class Film {
    public filmTitle: string;
    public year: number;

    constructor(filmTitle: string, year: number) {
        this.filmTitle = filmTitle;
        this.year = year;
    }
}

export class Contact {
    public id: number;
    public firstName: string;
    public lastName: string;
    public occupation: string;
    public dateOfBirth: string;
    public dateOfDeath: string;
    public imagePath: string;
    public countryOfLiving: string;
    public films: Film[];

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        occupation: string,
        dateOfBirth: string,
        dateOfDeath: string,
        imagePath: string,
        countryOfLiving: string,
        films: Film[]
        ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.occupation = occupation;
            this.dateOfBirth = dateOfBirth;
            this.dateOfDeath = dateOfDeath;
            this.imagePath = imagePath;
            this.countryOfLiving = countryOfLiving;
            this.films = films;
        }
}


