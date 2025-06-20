type Fundraising = {
    id: string;
    fundraiseId: number;
    title: string;
    description: string;
    targetAmount: number;
    targetDate: number;
    timestamp: number;
}

export const useFetchGetFundraisings = async (): Promise<Fundraising[]> => {
    const data = fetch(process.env.NEXT_PUBLIC_GHOST_INDEXER_URL as string, {
        headers: {
          "X-GHOST-KEY": process.env.NEXT_PUBLIC_GHOST_INDEXER_KEY as string,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query:`{
            fundraisingRegistereds(orderBy:"id", orderDirection:"desc", limit:100) {
              items {
                id
            fundraiseId
            title
            description
            targetAmount
            targetDate
            timestamp
            block
            txHash
              }
            }
          }`
        }),
        method: "POST",
    }).then(async (res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        const items = json.data.fundraisingRegistereds.items;
        return items;
    }).catch((error) => {
        console.log({ error });
        console.error("Error fetching data:", error);
        return [];
    });

    return data;
}