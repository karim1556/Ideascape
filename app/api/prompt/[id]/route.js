import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const DELETE = async (request, { params }) => {
    try {
        console.log("Connecting to DB...");
        await connectToDB();
        console.log("Connected to DB");

        // Check if the prompt ID is valid
        if (!params.id) {
            console.error("No prompt ID provided");
            return new Response("Prompt ID is required", { status: 400 });
        }

        // Check if the prompt exists
        const prompt = await Prompt.findById(params.id);
        if (!prompt) {
            console.log("Prompt not found");
            return new Response("Prompt not found", { status: 404 });
        }

        // Find the prompt by ID and delete it
        await Prompt.findByIdAndDelete(params.id);
        console.log("Prompt deleted successfully");

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Error deleting prompt: " + error.message, { status: 500 });
    }
};
