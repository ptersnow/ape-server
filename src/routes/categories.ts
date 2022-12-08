import { FastifyInstance } from "fastify"
import { z } from 'zod'

import { prisma } from "../lib/prisma"

export async function categoryRoutes (fastify: FastifyInstance) {
    fastify.get('/sidewalks/:sidewalkId/categories', async (request, reply) => {

        const getCategoriesParams = z.object({
            sidewalkId: z.string()
        })

        const { sidewalkId } = getCategoriesParams.parse(request.params)

        const categories = await prisma.category.findMany({
            include: {
                questions: {
                    include: {
                        choices: true,
                        answers: {
                            where: {
                                sidewalkId,
                                userId: "clbekoomr0000ilvy7l5v88y2"
                            }
                        }
                    }
                }
            }
        })

        return reply.code(200).send({ categories })
    })
}