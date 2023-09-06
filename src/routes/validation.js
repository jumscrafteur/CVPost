import { z } from "zod"

export const elementSchema = z.object({
    text: z.string(),
    layout: z.union([
        z.literal("text"),
        z.literal("list"),
        z.literal("slider"),
        z.literal("md")
    ]),
    subText: z.union([z.string(), z.array(z.string())])
})

export const sectionSchema = z.object({
    title: z.string(),
    layout: z.union([z.literal("list"), z.literal("grid"), z.literal("empty")]),
    elements: z.array(elementSchema)
})

export const pageDataSchema = z.object({
    layout: z.union([z.literal("PHMB"), z.literal("PMB")]),
    mainColor: z.string(),
    textColor: z.string(),
    misc: z.object({
        contact: z.object({
            phone: z.string(),
            adresse: z.string(),
            mail: z.string(),
            github: z.string()
        }),
        qualities: z.array(z.string()),
        other: z.array(z.string())
    }),
    header: z.object({
        title: z.string(),
        subTitle: z.string(),
        paragraph: z.string()
    }),
    sections: z.array(sectionSchema)
})

export const CVSchema = z.object({
    pages: z.array(pageDataSchema),
    signature: z.string()
})
