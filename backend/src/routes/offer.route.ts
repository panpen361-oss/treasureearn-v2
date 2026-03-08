import Elysia from "elysia";
import { authGuard } from "../guard/auth.guard";

export const protectedOffer = new Elysia({ prefix: "/offers" })
    .use(authGuard)
    .post("/start", async ({ auth }) => {
        return {
            success: true,
            message: "Offer start triggered (placeholder)",
            userId: auth.userId,
        };
    });
