import {Router} from "express"
import { createcontent, getcontent } from "../controller/contentcontroller"
import { authmiddleware } from "../middleware/authmiddleware"
const contentrouter = Router()

contentrouter.post("/create",authmiddleware as unknown as any,createcontent as unknown as any)
contentrouter.post("/get",authmiddleware as unknown as any,getcontent as unknown as any)


export default contentrouter