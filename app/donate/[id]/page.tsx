/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Shield,
  Share2,
  Flag,
  ArrowLeft,
  CheckCircle,
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
  useReadGetDonationHistories,
  useReadGetWithdrawals,
} from "@/hooks/readContract";
import { useToast } from "@/components/ui/toast";
import { formatAddress, formatCurrency, timeAgo } from "@/app/utils";
import { useAccount } from "wagmi";
import DonateCard from "./donateCard";
import DonorsTab from "./donorsTab";
import WithdrawalsTab from "./withdrawalsTab";
import DescriptionTab from "./descriptionTab";

export default function DonatePage() {
  const params = useParams();
  const { address, isConnected } = useAccount();
  const campaignId = Number.parseInt(params.id as string);
  const { addToast } = useToast();

  const userBalance = useReadTokenBalance(address);
  const fundraiseDetail = useReadGetFundraisingDetail(campaignId)
  const donationHistories = useReadGetDonationHistories(campaignId)
  const withdrawals = useReadGetWithdrawals(campaignId)
  const amountLeft = Number(fundraiseDetail?.targetAmount) / 1e6 - Number(fundraiseDetail?.accumulatedAmount) / 1e6
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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
                      <div className="text-2xl font-bold text-purple-600">
                        {amountLeft > 0 ? formatCurrency(amountLeft) : 0}
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
                <DescriptionTab description={fundraiseDetail.description} />
                <WithdrawalsTab withdrawals={withdrawals} />
                <DonorsTab donationHistories={donationHistories} />
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
                  </CardContent>
                </Card>
              )}
              <DonateCard fundraiseDetail={fundraiseDetail} />

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
