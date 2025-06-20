2
/* eslint-disable @next/next/no-img-element */
// "use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Shield,
    Heart,
    CheckCircle,
    AlertTriangle,
    Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    useReadTokenBalance,
    useReadTokenAllowance,
} from "@/hooks/readContract";
import { useWriteApproveToken, useWriteDonate } from "@/hooks/writeContracts";
import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/app/utils";
import { useAccount } from "wagmi";


type Campaign = {
    id: bigint
    title: string
    description: string
    location: string
    category: string
    verified: boolean
    fundraiser: string
    accumulatedAmount: bigint
    targetAmount: bigint
    targetDate: bigint
    totalWithdrawAmount: bigint
    donorsCount: bigint
}


type DonationCardProps = {
    fundraiseDetail: Campaign
}

const donationAmounts = [5, 10, 25, 50, 100, 250];


export default function DonateCard({ fundraiseDetail }: DonationCardProps) {
    const params = useParams();
    const { address, isConnected } = useAccount();
    const campaignId = Number.parseInt(params.id as string);
    const { addToast } = useToast();

    const userBalance = useReadTokenBalance(address);
    const userAllowance = useReadTokenAllowance(address);
    const { ApproveToken } = useWriteApproveToken();
    const { Donate } = useWriteDonate();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [isApproving, setIsApproving] = useState(false);
    const [isDonating, setIsDonating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect MUST be before early returns
    useEffect(() => {
        if (showSuccess || showError) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setShowError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess, showError]);

    // Calculations
    const now = Math.floor(Date.now() / 1000);
    const daysLeft = (Math.ceil((Number(fundraiseDetail?.targetDate) - now) / (60 * 60 * 24)) > 0 ? Math.ceil((Number(fundraiseDetail?.targetDate) - now) / (60 * 60 * 24)) : 0)
    const isActive = daysLeft > 0;
    const finalAmount = selectedAmount || Number.parseInt(customAmount) || 0;
    const finalAmountBigInt = BigInt(finalAmount * 1e6);
    const needsApproval =
        finalAmount > 0 &&
        (userAllowance ? userAllowance < finalAmountBigInt : true);
    const hasSufficientBalance =
        finalAmount > 0 && (userBalance ? userBalance >= finalAmountBigInt : false);

    // Event handlers
    const handleApprove = async () => {
        if (!isConnected || finalAmount === 0) return;
        setIsApproving(true);
        setShowError(false);

        try {
            addToast({
                type: "info",
                title: "Persetujuan Token",
                description: "Sedang memproses persetujuan token...",
                duration: 3000,
            });

            await ApproveToken(finalAmountBigInt);

            // Success notification
            addToast({
                type: "success",
                title: "✅ Token Disetujui!",
                description: `Berhasil menyetujui ${formatCurrency(
                    finalAmount
                )}. Sekarang Anda bisa melakukan donasi.`,
                duration: 5000,
            });

            setShowSuccess(true);
            setErrorMessage("");
        } catch (error: unknown) {
            const err = error as { cause?: { cause?: { shortMessage?: string } } };
            const errorMsg = err?.cause?.cause?.shortMessage || "Approval failed";

            addToast({
                type: "error",
                title: "❌ Persetujuan Gagal",
                description:
                    errorMsg === "User rejected the request."
                        ? "Transaksi dibatalkan oleh pengguna"
                        : errorMsg,
                duration: 5000,
            });

            setErrorMessage(errorMsg);
            setShowError(true);
        } finally {
            setIsApproving(false);
        }
    };

    const handleDonate = async () => {
        if (!isConnected || finalAmount === 0) return;
        setIsDonating(true);
        setShowError(false);

        try {
            addToast({
                type: "info",
                title: "Memproses Donasi",
                description: "Sedang mengirim donasi Anda...",
                duration: 3000,
            });

            await Donate(campaignId, finalAmountBigInt);

            // Success notification with celebration
            addToast({
                type: "success",
                title: "🎉 Donasi Berhasil!",
                description: `Terima kasih! Anda telah mendonasikan ${formatCurrency(
                    finalAmount
                )} untuk kampanye "${fundraiseDetail?.title}".`,
                duration: 8000,
            });

            // Additional success toast for impact
            setTimeout(() => {
                addToast({
                    type: "info",
                    title: "💝 Dampak Donasi Anda",
                    description:
                        "Donasi Anda akan membantu mencapai target kampanye ini. Pantau terus perkembangannya!",
                    duration: 6000,
                });
            }, 1000);

            setShowSuccess(true);
            setSelectedAmount(null);
            setCustomAmount("");
            setErrorMessage("");
        } catch (error: unknown) {
            const err = error as { cause?: { cause?: { shortMessage?: string } } };
            const errorMsg = err?.cause?.cause?.shortMessage || "Donation failed";

            addToast({
                type: "error",
                title: "❌ Donasi Gagal",
                description:
                    errorMsg === "User rejected the request."
                        ? "Transaksi dibatalkan oleh pengguna"
                        : errorMsg,
                duration: 5000,
            });

            setErrorMessage(errorMsg);
            setShowError(true);
        } finally {
            setIsDonating(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Berdonasi Sekarang
                    </CardTitle>
                    <CardDescription>
                        Pilih jumlah donasi dan lakukan transaksi
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!isConnected && (
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                Silakan hubungkan wallet Anda untuk melakukan donasi.
                            </AlertDescription>
                        </Alert>
                    )}
                    {!isActive && (
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                Kampanye ini sudah berakhir dan tidak menerima donasi
                                lagi.
                            </AlertDescription>
                        </Alert>
                    )}
                    {showSuccess && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-700">
                                Transaksi berhasil! Terima kasih atas kontribusi Anda.
                            </AlertDescription>
                        </Alert>
                    )}
                    {showError && (
                        <Alert className="border-red-200 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-700">
                                {errorMessage}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-3">
                        <Label>Pilih Jumlah Donasi</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {donationAmounts.map((amount) => (
                                <Button
                                    key={amount}
                                    variant={
                                        selectedAmount === amount ? "default" : "outline"
                                    }
                                    className="h-12"
                                    onClick={() => {
                                        setSelectedAmount(amount);
                                        setCustomAmount("");
                                    }}
                                    disabled={!isConnected || !isActive}
                                >
                                    {formatCurrency(amount)}
                                </Button>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="custom-amount">
                                Atau masukkan jumlah lain
                            </Label>
                            <Input
                                id="custom-amount"
                                type="number"
                                placeholder="Masukkan jumlah"
                                value={customAmount}
                                onChange={(e) => {
                                    setCustomAmount(e.target.value);
                                    setSelectedAmount(null);
                                }}
                                disabled={!isConnected || !isActive}
                            />
                        </div>
                    </div>

                    {finalAmount > 0 &&
                        isConnected &&
                        userBalance !== undefined && (
                            <div
                                className={`p-4 rounded-lg border ${hasSufficientBalance
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Saldo mencukupi:</span>
                                    <span
                                        className={`text-lg font-bold ${hasSufficientBalance
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {hasSufficientBalance ? "✓" : "✗"}
                                    </span>
                                </div>
                                {!hasSufficientBalance && (
                                    <p className="text-sm text-red-600 mt-1">
                                        Saldo tidak mencukupi. Anda perlu{" "}
                                        {formatCurrency(finalAmount - Number(userBalance))}{" "}
                                        DON lagi.
                                    </p>
                                )}
                            </div>
                        )
                    }

                    {finalAmount > 0 && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Total Donasi:</span>
                                <span className="text-xl font-bold text-[#6B46C1]">
                                    {formatCurrency(finalAmount)}
                                </span>
                            </div>
                        </div>
                    )}
                    {
                        isConnected &&
                        isActive &&
                        finalAmount > 0 &&
                        hasSufficientBalance && (
                            <div className="space-y-3">
                                {needsApproval && (
                                    <Button
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 h-12 text-lg"
                                        onClick={handleApprove}
                                        disabled={isApproving}
                                    >
                                        {isApproving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Menyetujui...
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="w-5 h-5 mr-2" />
                                                Setujui Token ({formatCurrency(finalAmount)})
                                            </>
                                        )}
                                    </Button>
                                )}
                                {!needsApproval && (
                                    <Button
                                        className="w-full bg-gradient-to-r from-[#6B46C1] to-purple-800 hover:from-purple-700 hover:to-purple-900 h-12 text-lg"
                                        onClick={handleDonate}
                                        disabled={isDonating}
                                    >
                                        {isDonating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Mendonasi...
                                            </>
                                        ) : (
                                            <>
                                                <Heart className="w-5 h-5 mr-2" />
                                                Donasi {formatCurrency(finalAmount)}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        )
                    }

                    <p className="text-xs text-center text-muted-foreground">
                        Dengan berdonasi, Anda menyetujui syarat dan ketentuan
                        platform
                    </p>
                </CardContent >
            </Card >
        </>
    )
}

