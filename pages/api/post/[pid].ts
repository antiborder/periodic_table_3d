import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { pid },
  } = req

  if (typeof pid !== "string") {
    res.status(400).end("Invalid request")
    return
  }

  res.end(`Post: ${pid}`)
}
export default handler
