import {Router} from "express"
import { createcontent, deletecontent, getcontent } from "../controller/contentcontroller"
import { authmiddleware } from "../middleware/authmiddleware"
const contentrouter = Router()

contentrouter.post("/create",authmiddleware ,createcontent )
contentrouter.post("/get",authmiddleware ,getcontent )
contentrouter.post("/delete",authmiddleware ,deletecontent )


export default contentrouter