import { Router } from "express";
import { gettags } from "../controller/tagcontroller";
import { authmiddleware } from "../middleware/authmiddleware";
const tagrouter=Router()
tagrouter.get("/",authmiddleware as unknown as any ,gettags as unknown as any)
export default tagrouter