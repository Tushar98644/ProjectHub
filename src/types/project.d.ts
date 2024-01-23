// treated as a module declaration by the TypeScript compiler when the export keyword is used
// treated as script files whose contents are available in the global scope without any explicit export

export interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    github: string;
    approved: boolean;
    name: string;
    tags: string[];
    createdAt: Date;
    discussion: function;
}
