import db from '@/lib/db'
export const getCardPostByCompletePostId = async ({completePostId}) => {
    try {
        const cardPost = await db.cardPost.findUnique({
            where: {
                completePostId: completePostId
            }
        })
        return cardPost
    } catch
    {
        return null;
    }
}