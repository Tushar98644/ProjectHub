import { Project } from "@/models";

export const createProject = async (req: Request) => {
    const body = await req.json();
    const { email, title, description, image, github, tags } = body;

    if (!title || !description || !image || !github || !email)
        return Response.json(
            { message: "Missing required fields" },
            { status: 400 }
        );

    const approved = false;
    try {
        const NewProject = await Project.create({
            title,
            description,
            image,
            github,
            email,
            tags,
            approved,
        });
        console.log(`The project recieved is ${NewProject}`);
        return Response.json(
            { message: "Project created successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return Response.json(
            { err: "Unable to create project" },
            { status: 500 }
        );
    }
};

export const getProjects = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        console.log(`The email recieved is ${email}`);

        let projects;
        if (email) {
            projects = await Project.find({ email }).sort({ createdAt: -1 });
        } else {
            projects = await Project.find({ approved: true }).sort({
                createdAt: -1,
            });
        }

        return projects;
    } catch (err) {
        console.log(err);
        return Response.json(
            { err: "Error in fetching projects" },
            { status: 400 }
        );
    }
};
