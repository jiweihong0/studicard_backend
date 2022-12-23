import { Router as expressRouter ,Express} from "express";
import Cardset from "../models/cardset";
import verify_token from "../middleware/verify_token";
import Question from "../models/question";

export default (ctx: { [key: string]: any }, app: Express) => {
    const router= expressRouter();
    const database = ctx.sequelize;

    // 取得所有卡片集
    router.get("/getall", async (req, res) => {
        try {
            await database.sync()
            const cardset = await Cardset.findAll()
            return res.status(200).json(cardset)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )
    

    // 點擊新增卡片集
    router.post("/add",verify_token(),async (req, res) => {
        const cardset_title = req.body.cardset_title
        try {
            await database.sync()
            const cardset = await Cardset.create({
                cardset_title: cardset_title,
                is_available: true,
                create_by: res.locals.decoded.account_id
            })
            return res.status(200).json(cardset)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 點擊刪除卡片集
    router.post("/delete" ,verify_token(), async (req, res) => {
        const cardset_id = req.body.cardset_id
        try {
            await database.sync()

            const create_obj = await Cardset.findOne({
                attributes: ['create_by'],
                where: {
                    cardset_id: cardset_id,
                }
            })

            const create_by = create_obj?.create_by ?? null

            if (res.locals.decoded.account_id !== create_by) {
                return res.status(500).json({ message: "You are not the owner of this cardset or not be created" });
            }
            
            await Cardset.destroy({
                where: {
                    cardset_id: cardset_id 
                }
            })

            await Question.destroy({
                where: {
                    cardset_id: cardset_id
                }
            })

            return res.status(200).json({message:"delete complete"})
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 點擊修改卡片集
    router.post("/update", async (req, res) => {
        const cardset_id = req.body.cardset_id
        const cardset_title = req.body.cardset_title
        try {
            await database.sync()
            const cardset = await Cardset.update({
                cardset_title: cardset_title
            }, {
                where: {
                    cardset_id: cardset_id
                }
            })
            return res.status(200).json({message:"update complete"})
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 取得自己卡片集
    router.get("/getcard/:cardset_id", verify_token(), async (req, res) => {
        const cardset_id = req.params.cardset_id
        console.log(cardset_id)
        try {
            await database.sync()
            const cardset = await Question.findAll({
                where: {
                    cardset_id: cardset_id
                }
            })
            return res.status(200).json(cardset)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )
    


    app.use("/api/cardset", router);
}
