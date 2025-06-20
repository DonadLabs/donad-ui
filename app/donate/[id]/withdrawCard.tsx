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
    ArrowDownLeft,
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
import { useWriteApproveToken, useWriteDonate, useWriteWithdraw } from "@/hooks/writeContracts";
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

export default function WithdrawCard({ fundraiseDetail }: DonationCardProps) {
    const params = useParams();
    const { address, isConnected } = useAccount();
    const campaignId = Number.parseInt(params.id as string);
    const { addToast } = useToast();

    const userBalance = useReadTokenBalance(address);
    const userAllowance = useReadTokenAllowance(address);
    const { ApproveToken } = useWriteApproveToken();
    const { Withdraw } = useWriteWithdraw()
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [remarks, setRemarks] = useState("");
    const [to, setTo] = useState("");
    const [isApproving, setIsApproving] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const remainingToWithdraw = Number(fundraiseDetail.accumulatedAmount - fundraiseDetail.totalWithdrawAmount) / 1e6

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
    const finalAmount = selectedAmount || Number(customAmount) || 0;
    const finalAmountBigInt = BigInt(finalAmount * 1e6);
    const needsApproval =
        finalAmount > 0 &&
        (userAllowance ? userAllowance < finalAmountBigInt : true);
    const availableToWithdraw =
        finalAmount > 0 && (finalAmount <= remainingToWithdraw);

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

    const handleWithdraw = async () => {
        if (!isConnected || finalAmount === 0) return;
        setIsWithdrawing(true);
        setShowError(false);

        try {
            addToast({
                type: "info",
                title: "Memproses Penarikan",
                description: "Sedang menarik dana menuju address tujuan anda...",
                duration: 3000,
            });

            // await Donate(campaignId, finalAmountBigInt);
            await Withdraw(campaignId, finalAmountBigInt, remarks, to);


            // Success notification with celebration
            addToast({
                type: "success",
                title: "🎉 Penarikan Berhasil!",
                description: `Anda telah menarik dana sebesar ${formatCurrency(
                    finalAmount
                )} untuk "${remarks}".`,
                duration: 8000,
            });

            setShowSuccess(true);
            setSelectedAmount(null);
            setCustomAmount("");
            setErrorMessage("");
        } catch (error: unknown) {
            const err = error as { cause?: { cause?: { shortMessage?: string } } };
            const errorMsg = err?.cause?.cause?.shortMessage || "Donation failed";

            addToast({
                type: "error",
                title: "❌ Penarikan Gagal",
                description:
                    errorMsg === "User rejected the request."
                        ? "Transaksi dibatalkan oleh pengguna"
                        : errorMsg,
                duration: 5000,
            });

            setErrorMessage(errorMsg);
            setShowError(true);
        } finally {
            setIsWithdrawing(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Tarik Dana
                    </CardTitle>
                    <CardDescription>
                        Total dana yang tersedia untuk penarikan: {formatCurrency(remainingToWithdraw)}
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
                        <div className="space-y-2">
                            <Label htmlFor="custom-amount">
                                Jumlah penarikan dana:
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
                                disabled={isActive}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="custom-amount">
                                Tujuan penarikan:
                            </Label>
                            <Input
                                id="custom-amount"
                                type="text"
                                placeholder="Masukkan tujuan penarikan.."
                                value={remarks}
                                onChange={(e) => {
                                    setRemarks(e.target.value);
                                }}
                                disabled={isActive}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="custom-amount">
                                Wallet address tujuan:
                            </Label>
                            <Input
                                id="custom-amount"
                                type="text"
                                placeholder="Masukkan alamat wallet"
                                value={to}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                }}
                                disabled={isActive}
                            />
                        </div>
                    </div>

                    {finalAmount > 0 &&
                        isConnected &&
                        userBalance !== undefined && (
                            <div
                                className={`p-4 rounded-lg border ${availableToWithdraw
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Dana tersedia untuk penarikan:</span>
                                    <span
                                        className={`text-lg font-bold ${availableToWithdraw
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {availableToWithdraw ? "✓" : "✗"}
                                    </span>
                                </div>
                                {!availableToWithdraw && (
                                    <p className="text-sm text-red-600 mt-1">
                                        Dana tidak tersedia. Tersisa dana sebesar{" "}
                                        {formatCurrency(remainingToWithdraw)}{" "}
                                        untuk penarikan
                                    </p>
                                )}
                            </div>
                        )
                    }

                    {finalAmount > 0 && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Total Penarikan:</span>
                                <span className="text-xl font-bold text-[#6B46C1]">
                                    {formatCurrency(finalAmount)}
                                </span>
                            </div>
                        </div>
                    )}
                    {
                        isConnected &&
                        finalAmount > 0 &&
                        remarks &&
                        to &&
                        availableToWithdraw && (
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
                                        onClick={handleWithdraw}
                                        disabled={isWithdrawing}
                                    >
                                        {isWithdrawing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Menarik dana...
                                            </>
                                        ) : (
                                            <>
                                                <ArrowDownLeft className="w-5 h-5 mr-2" />
                                                Tarik {formatCurrency(finalAmount)}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        )
                    }
                </CardContent >
            </Card >
        </>
    )
}

