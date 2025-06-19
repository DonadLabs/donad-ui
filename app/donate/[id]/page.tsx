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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  Heart,
  Share2,
  Flag,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useParams } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useReadGetDonationHistories, useReadGetFundraisingDetail } from "@/hooks/readContract";
import { formatAddress, formatCurrency, timeAgo } from "@/app/utils";

const donationAmounts = [50000, 100000, 250000, 500000, 1000000, 2500000];

export default function DonatePage() {
  const params = useParams();
  const campaignId = Number.parseInt(params.id as string);
  const fundraiseDetail = useReadGetFundraisingDetail(campaignId)
  const donationHistories = useReadGetDonationHistories(campaignId)
  console.log({ donationHistories })
  const now = Math.floor(Date.now() / 1000)
  const daysLeft = Math.ceil((Number(fundraiseDetail?.targetDate) - now) / (60 * 60 * 24))

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!fundraiseDetail) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
      </div>
    );
  }

  const progressPercentage = Math.round(
    (Number(fundraiseDetail?.accumulatedAmount) / Number(fundraiseDetail?.targetAmount)) * 100
  );
  const finalAmount = selectedAmount || Number.parseInt(customAmount) || 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />

      <main className="flex-1">
        {/* Breadcrumb */}
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
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Header */}
              <Card>
                <div className="aspect-video bg-gray-100 relative">
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">
                        {fundraiseDetail?.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
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

              {/* Progress Section */}
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
                        {formatCurrency(Number(fundraiseDetail?.accumulatedAmount))}
                      </span>
                      <span>dari {formatCurrency(Number(fundraiseDetail?.targetAmount))}</span>
                    </div>
                  </div>

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
                        {daysLeft}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Hari Tersisa
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(Number(fundraiseDetail?.targetAmount) - Number(fundraiseDetail?.accumulatedAmount))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Dibutuhkan
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Content */}
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
                  {/* {campaign.updates.map((update, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {update.title}
                          </CardTitle>
                          <span className="text-sm text-muted-foreground">
                            {new Date(update.date).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {update.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))} */}
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Milestone Pencairan Dana</CardTitle>
                      <CardDescription>
                        Dana akan dicairkan secara bertahap sesuai dengan
                        milestone yang telah ditetapkan
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* {campaign.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 border rounded-lg"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              milestone.completed
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {milestone.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              milestone.percentage + "%"
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">
                              {milestone.percentage}% - {milestone.description}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {milestone.completed
                                ? "Selesai"
                                : "Menunggu target tercapai"}
                            </div>
                          </div>
                        </div>
                      ))} */}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="donors" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Donatur Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {donationHistories.map((el, idx) =>
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
                              {Number(el.amount)} DON
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Donation Sidebar */}
            <div className="space-y-6">
              {/* Fundraiser Info */}
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
                      >
                        {formatAddress(fundraiseDetail.fundraiser)}
                      </a>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donation Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Berdonasi Sekarang
                  </CardTitle>
                  <CardDescription>
                    Pilih jumlah donasi dan metode pembayaran
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Amount Selection */}
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
                      />
                    </div>
                  </div>

                  {/* Total */}
                  {finalAmount > 0 && (
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Donasi:</span>
                        <span className="text-xl font-bold text-purple-600">{formatCurrency(finalAmount)}</span>
                      </div>
                    </div>
                  )}

                  {/* Donate Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-blue-700 hover:to-teal-700 h-12 text-lg"
                    disabled={!finalAmount || !paymentMethod}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Donasi {finalAmount > 0 ? formatCurrency(finalAmount) : ""}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Dengan berdonasi, Anda menyetujui syarat dan ketentuan
                    platform
                  </p>
                </CardContent>
              </Card>

              {/* Security Info */}
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
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </div >
  );
}