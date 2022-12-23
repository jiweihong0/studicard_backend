import { Router as expressRouter ,Express} from "express";
import verify_token from "../middleware/verify_token";
import Class from "../models/class";


export default (ctx: { [key: string]: any }, app: Express) => {
    const router= expressRouter();
    const database = ctx.sequelize;

    // 取得所有班級
    router.get("/getall", async (req, res) => {
        try {
            await database.sync()
            const classes = await Class.findAll()
            return res.status(200).json(classes)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 點擊新增班級
    router.post("/add", async (req, res) => {
        const class_title = req.body.class_title
        try {
            await database.sync()
            const classes = await Class.create({
                class_title: class_title
            })
            return res.status(200).json(classes)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 點擊刪除班級
    router.post("/delete", async (req, res) => {
        const class_id = req.body.class_id
        try {
            await database.sync()
            const classes = await Class.destroy({
                where: {
                    class_id: class_id
                }
            })
            return res.status(200).json(classes)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    
    app.use("/api/class", router);
}