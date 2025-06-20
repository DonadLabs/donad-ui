2
/* eslint-disable @next/next/no-img-element */
// "use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatAddress, formatCurrency, timeAgo } from "@/app/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type Withdrawal = {
    fundraiseId: BigInt,
    amount: BigInt,
    remarks: string;
    withdrawalAddress: string,
    timestamp: BigInt
}

type DonorsTabProps = {
    withdrawals: Withdrawal[]
}



export default function WithdrawalsTab({ withdrawals }: DonorsTabProps) {
    return (
        <>
            <TabsContent value="updates" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Update Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {withdrawals.length > 0 ? [...withdrawals].reverse().map((el, idx) =>
                            <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg">
                                <Avatar>
                                    <AvatarImage
                                        src={`/placeholder.svg?height=40&width=40`}
                                    />
                                    <AvatarFallback>W{idx + 1}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="font-medium">
                                        <a
                                            href={`https://testnet.monadexplorer.com/address/${el.withdrawalAddress}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {formatAddress(el.withdrawalAddress)}
                                        </a>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {timeAgo(Number(el.timestamp))}
                                    </div>
                                    <div className="text-base">
                                        {el.remarks}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-blue-600">
                                        {formatCurrency(Number(el.amount) / 1e6)}
                                    </div>
                                </div>
                            </div>
                        ) : <p className="text-muted-foreground">
                            Belum ada update untuk kampanye ini.
                        </p>
                        }
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    )
}

