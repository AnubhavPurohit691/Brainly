import { Router } from "express";
import { generatelink } from "../controller/linkcontroller";
import { authmiddleware } from "../middleware/authmiddleware";
const linkrouter = Router()

linkrouter.post("/link",authmiddleware as unknown as any,generatelink as unknown as any)
export default linkrouter