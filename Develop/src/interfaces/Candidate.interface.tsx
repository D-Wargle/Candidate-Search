// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    id: number;
    name: string;
    username: string;
    location: string;
    avatar: string;
    email: string;
    htmlURL: string;
    company: string;
    bio: string;
}
export default Candidate;
