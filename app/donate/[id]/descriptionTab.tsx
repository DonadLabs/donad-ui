2
/* eslint-disable @next/next/no-img-element */
// "use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";

type DonorsTabProps = {
    description: string
}

export default function DescriptionTab({ description }: DonorsTabProps) {
    return (
        <>
            <TabsContent value="story" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Tentang Kampanye Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <p className="text-muted-foreground mb-4">
                                {description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    )
}

