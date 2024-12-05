export interface Profile {
    id: number;
    username: string;
    pref_name?: string;
    email: string;
    restrictions: {
        halal: boolean;
        vegan: boolean;
        vegetarian: boolean;
    }
    loggedIn: boolean;
};
