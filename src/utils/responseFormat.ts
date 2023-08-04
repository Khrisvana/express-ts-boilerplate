export default function (detail: Record<string, any>[] | Record<string, any>, message: string|null = null, meta: Record<string, any> | null = null) {
    return {
        message,
        detail,
        meta
    }
}