/* eslint-disable @next/next/no-img-element */
"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Heart,
  Share2,
  Flag,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  useReadGetFundraisingDetail,
  useReadTokenBalance,
  useReadTokenAllowance,
  useReadGetWithdrawals,
  useReadGetDonationHistories,
} from "@/hooks/readContract";
import { useWriteApproveToken, useWriteDonate } from "@/hooks/writeContracts";
import { useToast } from "@/components/ui/toast";
import { formatAddress, formatCurrency, timeAgo } from "@/app/utils";
import { useAccount } from "wagmi";

const donationAmounts = [5, 10, 25, 50, 100, 250];

export default function DonatePage() {
  const params = useParams();
  const { address, isConnected } = useAccount();
  const campaignId = Number.parseInt(params.id as string);
  const { addToast } = useToast();

  const userBalance = useReadTokenBalance(address);
  const userAllowance = useReadTokenAllowance(address);
  const { ApproveToken } = useWriteApproveToken();
  const { Donate } = useWriteDonate();
  const fundraiseDetail = useReadGetFundraisingDetail(campaignId)
  const donationHistories = useReadGetDonationHistories(campaignId)
  const withdrawal = useReadGetWithdrawals(campaignId)
  const isFundraiser = address === fundraiseDetail?.fundraiser
  console.log({ fundraiseDetail })
  const amountLeft = Number(fundraiseDetail?.targetAmount) / 1e6 - Number(fundraiseDetail?.accumulatedAmount) / 1e6

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
  const progressPercentage = fundraiseDetail
    ? Math.round(
      (Number(fundraiseDetail.accumulatedAmount) /
        Number(fundraiseDetail.targetAmount)) *
      100
    )
    : 0;
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

  // EARLY RETURN AFTER ALL HOOKS
  if (!fundraiseDetail) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Kampanye tidak ditemukan
            </h1>
            <Link href="/explore-donation">
              <Button>Kembali ke Jelajahi Donasi</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      <main className="flex-1">
        <section className="w-full py-4 bg-white border-b">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/explore-donation"
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Jelajahi Donasi
              </Link>
            </div>
          </div>
        </section>

        <div className="container px-4 md:px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 relative flex items-center justify-center">
                  <div className="text-6xl opacity-20">📝</div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">
                        {fundraiseDetail?.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>ID: #{Number(fundraiseDetail.id)}</span>
                        {isActive ? (
                          <span className="text-green-600 font-medium">
                            ● Aktif
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            ● Berakhir
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          addToast({
                            type: "success",
                            title: "Link Disalin!",
                            description:
                              "Link kampanye telah disalin ke clipboard",
                            duration: 3000,
                          });
                        }}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Bagikan
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress Kampanye</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Terkumpul</span>
                      <span className="font-bold text-lg">
                        {progressPercentage}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="font-semibold text-lg text-blue-600">
                        {formatCurrency(Number(fundraiseDetail?.accumulatedAmount) / 1e6)}
                      </span>
                      <span>dari {formatCurrency(Number(fundraiseDetail?.targetAmount) / 1e6)}</span>
                    </div >
                  </div >
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {Number(fundraiseDetail?.donorsCount)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Donatur
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">
                        {Math.max(0, daysLeft)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Hari Tersisa
                      </div>
                    </div>
                    <div className="text-center">
                      {/* <<<<<<< Updated upstream
  <div className="text-2xl font-bold text-[#6B46C1]">
    {formatCurrency(
      Math.max(
        0,
        Number(fundraiseDetail?.targetAmount) -
        Number(fundraiseDetail?.accumulatedAmount)
      )
    )} */}
                      <div className="text-2xl font-bold text-purple-600">
                        {amountLeft > 0 ? formatCurrency(amountLeft) : 0}
                        {/* >>>>>>> Stashed changes */}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Dibutuhkan
                      </div>
                    </div>
                  </div >
                </CardContent >
              </Card >

              <Tabs defaultValue="story" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="story">Cerita</TabsTrigger>
                  <TabsTrigger value="updates">Update</TabsTrigger>
                  <TabsTrigger value="donors">Donatur</TabsTrigger>
                </TabsList>
                <TabsContent value="story" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tentang Kampanye Ini</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className="text-muted-foreground mb-4">
                          {fundraiseDetail?.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="updates" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Update Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Belum ada update untuk kampanye ini.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="donors" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Donatur Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {donationHistories.length > 0 ? donationHistories.map((el, idx) =>
                        <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg">
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40`}
                            />
                            <AvatarFallback>D{idx + 1}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">
                              <a
                                href={`https://testnet.monadexplorer.com/address/${fundraiseDetail?.fundraiser}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {formatAddress(el.donor)}
                              </a>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {timeAgo(Number(el.timestamp))}
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
              </Tabs>
            </div >

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Penggalang Dana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <a
                        href={`https://testnet.monadexplorer.com/address/${fundraiseDetail?.fundraiser}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 underline"
                      >
                        {formatAddress(fundraiseDetail.fundraiser)}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isConnected && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">
                      Saldo Anda
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {userBalance
                        ? formatCurrency(Number(userBalance) / 1e6)
                        : "0 DON"}
                    </div>
                    {/* <div className="text-sm text-blue-600 mt-2">
                      Allowance:{" "}
                      {userAllowance
                        ? formatCurrency(Number(userAllowance))
                        : "0 DON"}
                    </div> */}
                  </CardContent>
                </Card>
              )}

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

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Keamanan Terjamin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Dana disimpan di smart contract</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Transparansi penuh di blockchain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Pencairan sesuai milestone</span>
                  </div>
                </CardContent>
              </Card>
            </div >
          </div >
        </div >
      </main >
      <Footer />
    </div >
  );
}
