import { FastifyInstance } from "fastify"
import { z } from 'zod'

import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function answerRoutes (fastify: FastifyInstance) {
    fastify.get('/sidewalks/:sidewalkId/questions/:categoryId/answers', async (request, reply) => {
        const getAnswersParams = z.object({
            sidewalkId: z.string(),
            categoryId: z.string()
        })

        const { sidewalkId, categoryId } = getAnswersParams.parse(request.params)

        const answers = await prisma.answer.findMany({
            where: {
                sidewalkId,
                question: {
                    categoryId
                }
            }
        })

        return reply.code(200).send({ answers })
    })

    fastify.post('/sidewalks/:sidewalkId/questions/:categoryId/answers', async (request, reply) => {
        const getAnswersParams = z.object({
            sidewalkId: z.string(),
            categoryId: z.string()
        })

        const getAnswersBody = z.array(z.object({
            questionId: z.string(),
            value: z.string()
        }))
        
        const { sidewalkId, categoryId } = getAnswersParams.parse(request.params)
        const body = getAnswersBody.parse(request.body)

        console.log(body)

        body.map(async ({ questionId, value }) => {
            await prisma.answer.create({
                data: {
                    sidewalkId,
                    questionId,
                    userId: "clbekoomr0000ilvy7l5v88y2",
                    choice: value
                }
            })
        })

        return reply.status(201).send()
    })
}