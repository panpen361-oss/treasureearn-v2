import Elysia from "elysia";

export const publicPostback = new Elysia({ prefix: "/postback" })
    .get("/:provider", ({ params }) => {
        return {
            success: true,
            message: `Postback received for ${params.provider} (placeholder)`,
        };
    })
    .post("/:provider", ({ params }) => {
        return {
            success: true,
            message: `Postback received for ${params.provider} (placeholder)`,
        };
    });
