import { Router as expressRouter ,Express} from "express";
import Question from "../models/question";
import verify_token from "../middleware/verify_token";

export default (ctx: { [key: string]: any }, app: Express) => {
    const router = expressRouter();
    const database = ctx.sequelize;

    // 取得所有問題
    router.get("/getall", async (req, res) => {
        try {
            await database.sync()
            const question = await Question.findAll()
            return res.status(200).json(question)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 點擊新增問題
    router.post("/add", verify_token(),async (req, res) => {
        const question_title = req.body.question_title
        const answer = req.body.answer
        const cardset_id = req.body.cardset_id
        try {
            await database.sync()
            const question = await Question.create({
                question_title: question_title,
                answer: answer,
                cardset_id: cardset_id,
                question_url: "https://www.google.com"
            })
            return res.status(200).json(question)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 點擊刪除問題
    router.post("/delete", async (req, res) => {
        const question_id = req.body.question_id
        try {
            await database.sync()
            await Question.destroy({
                where: {
                    question_id: question_id
                }
            })
            return res.status(200).json({message:"delete success"})
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )

    // 點擊修改問題
    router.post("/update", async (req, res) => {
        const question_id = req.body.question_id
        const question_title = req.body.question_title
        const answer = req.body.answer
        const cardset_id = req.body.cardset_id
        try {
            await database.sync()
            await Question.update({
                question_title: question_title,
                answer: answer,
                cardset_id: cardset_id,
                question_url: "https://www.google.com"
            },{
                where: {
                    question_id: question_id
                }
            })
            return res.status(200).json({message:"update success"})
        } catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
            res.status(500).json({ message: "Some Error happend..." });
        }
    }
    )
    
    
    app.use("/api/question", router);
}